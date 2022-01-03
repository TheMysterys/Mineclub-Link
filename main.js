const { configUpdater } = require("./utils/configUpdater");
var config;

// Check that config is up to date
try {
	config = require("./config");
	const EXAMPLE_CONFIG = require("./example-config");
	if (config.configVersion != EXAMPLE_CONFIG.configVersion) {
		return configUpdater();
	}
} catch (err) {
	return configUpdater();
}

const mineflayer = require("mineflayer");

const { messageCreator } = require("./utils/message");
const { sendWebhook } = require("./utils/webhook");

// Core config checks
if (!config.username) {
	console.log("Username required!");
	return;
}
if (!config.password) {
	console.log("Password required!");
	return;
}
if (!config.authType) {
	console.log("AuthType required!");
	return;
}
if (!config.webhookURL) {
	console.log("Webhook URL required!");
	return;
}

const OPTIONS = {
	host: "play.mineclub.com",
	username: config.username,
	password: config.password,
	auth: config.authType,
	version: config.version,
	brand: "Mineclub-Link", // Please don't change ♥
};
const BOT = mineflayer.createBot(OPTIONS);

// Webhook Settings
var webhookInfo = {
	UUID: "",
	USERNAME: "",
};

// Session Stats Tracking
var stats = {
	// Core stats (Can't be removed from disconnect message)
	startTime: 0,
	endTime: 0,
	tokenMessages: 0,
	tokenTimesEarnt: 0,
	totalTokensEarnt: 0,
	totalGems: 0,
	season: "",

	// Configurable stats (Can be hidden from disconnect screen)
	goodnights: 0,
};

// Clears stats on join
function resetStats() {
	stats.season = "";
	stats.totalGems = 0;
	stats.totalTokensEarnt = 0;
	stats.tokenTimesEarnt = 0;
	stats.tokenMessages = 0;
	stats.endTime = 0;
}

// Detect Join
BOT.once("spawn", async () => {
	stats.startTime = Date.now();
	resetStats();
	console.log("Connected!");
	BOT.acceptResourcePack();
	webhookInfo.UUID = BOT.player.uuid;
	webhookInfo.USERNAME = BOT.username;
	await sendWebhook("join", { webhookInfo });
});

// Detect System Messages
BOT.on("messagestr", async (message, messagePosition) => {
	if (messagePosition == "system") {
		// Token earning detection
		if (message.match(/[\W]* You won ([0-9]) (\w*) Token[s]?!/g) != null) {
			let amount = Number.parseInt(message.replace(/[^0-9]+/, ""));
			let season = message.replace(
				/[\W]* You won ([0-9]) (\w*) Token[s]?!/g,
				"$2"
			);
			if (season != stats.season) {
				stats.season = season;
			}
			stats.totalTokensEarnt += amount;
			stats.tokenTimesEarnt++;
			if (config.tokenAlerts.active) {
				let msg = messageCreator("token", { amount, season });
				await sendWebhook("token", { msg, webhookInfo });
			}
		}
		// Token message detection
		if (message.includes("鳠")) {
			stats.tokenMessages++;
		}
		// Gem message detection
		if (message.includes("阵")) {
			stats.totalGems += 50;
			if (config.gemAlerts.active) {
				let msg = messageCreator("gems", { stats });
				await sendWebhook("gems", { msg, webhookInfo });
			}
		}
	}
	// DM Detection
	if (messagePosition == "chat") {
		if (
			message.match(/[\W]+(\w+) -> ME: ([\w\W]+)/g) &&
			config.dmAlerts.active
		) {
			let msg = messageCreator(
				"message",
				message.replace(/[\W]+(\w+) -> ME: ([\w\W]+)/g, "$2")
			);
			let username = message.replace(
				/[\W]+(\w+) -> ME: ([\w\W]+)/g,
				"$1"
			);
			await sendWebhook("dm", { msg, username, webhookInfo });
		}
	}
});

// Detect Chat Messages
BOT.on("chat", async (username, message) => {
	if (username == BOT.username) {
		return;
	}
	// Mention detection
	if (
		(message.includes(BOT.username) && config.mentionAlerts.personal) ||
		(message.includes("@everyone") && config.mentionAlerts.everyone)
	) {
		let msg = messageCreator("message", { message });
		await sendWebhook("mention", { msg, username, webhookInfo });
	}
	// Goodnight detection
	if (
		message.match(/\bgoodnight\b/g) ||
		message.match(/\bnight\b/g) ||
		message.match(/\bnini\b/g) ||
		message.match(/\bgn\b/g)
	) {
		stats.goodnights++;
	}
});

// Close login window on join or close discord link window
BOT.on("windowOpen", async (window) => {
	if (window.title.includes("庳")) {
		BOT.closeWindow(window.id);
	} else if (window.title.includes("a")) {
		BOT.closeWindow(window.id);
	}
});

// Detect being kicked from the server
var kicked = false;
BOT.on("kicked", async (reason, loggedIn) => {
	if (loggedIn) {
		stats.endTime = Date.now();
		let msg = messageCreator("exit", { stats });
		await sendWebhook("kick", { webhookInfo, reason, msg });
	}
	console.log(JSON.parse(reason).text);
	kicked = true;
});

// Detect disconnecting from the server
BOT.on("end", async () => {
	if (kicked) {
		return;
	}
	stats.endTime = Date.now();
	let msg = messageCreator("exit", { stats });
	await sendWebhook("disconnect", { webhookInfo, msg });
	console.log("Disconnected from server");
});

// Detect error with client
BOT.on("error", async (error) => {
	if (error.code == "ECONNREFUSED") {
		console.log("Could not connect!");
	} else {
		stats.endTime = Date.now();
		let msg = messageCreator("exit", { stats });
		await sendWebhook("crash", { webhookInfo, msg });
		console.error(error);
	}
});

// Detect program stop
process.on("SIGINT", async function () {
	stats.endTime = Date.now();
	let msg = messageCreator("exit", { stats });
	await sendWebhook("disconnect", { webhookInfo, msg });
	console.log("Disconnected from server");
	process.exit();
});
