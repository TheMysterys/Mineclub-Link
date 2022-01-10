const {
	settingsUpdater,
	getSettingsFileVersion,
} = require("./utils/settingsUpdater");
let settings;

// Check that settings file is up to date
try {
	settings = require("./settings");
	if (settings.settingsFileVersion != getSettingsFileVersion()) {
		return settingsUpdater();
	}
} catch (err) {
	return settingsUpdater();
}

const mineflayer = require("mineflayer");

const { messageCreator } = require("./utils/message");
const { sendWebhook } = require("./utils/webhook");
const { startStatus } = require("./utils/discordStatus");
const { username } = require("./settings");
const { isEveryonePing } = require("./utils/checks");

// Core settings checks
if (!settings.username) {
	console.log("Username required!");
	return;
}
if (!settings.password && settings.authType != "microsoft") {
	console.log("Password required!");
	return;
}
if (!settings.authType) {
	console.log("AuthType required!");
	return;
}
if (!settings.webhookURL) {
	console.log("Webhook URL required!");
	return;
}

const OPTIONS = {
	host: "play.mineclub.com",
	username: settings.username,
	password: settings.password,
	auth: settings.authType,
	version: settings.version,
	brand: "Mineclub-Link", // Please don't change ♥
};

const BOT = mineflayer.createBot(OPTIONS);
bindEvents(BOT);

// Webhook Settings
const webhookInfo = {
	UUID: "",
	USERNAME: "",
};

// Session Stats Tracking
const stats = {
	// Core stats (Can't be removed from disconnect message)
	startTime: 0,
	endTime: 0,
	// Tokens
	tokenMessages: 0,
	tokenTimesEarnt: 0,
	totalTokensEarnt: 0,
	season: "",
	// Gems
	activityGems: 0,
	marketGems: 0,
	totalGems: 0,

	// Configurable stats (Can be hidden from disconnect screen in the settings file)
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

function bindEvents(BOT) {
	// Detect Join
	BOT.once("spawn", async () => {
		// Set stats to 0 and set start time
		stats.startTime = Date.now();
		resetStats();
		// State that bot has connected
		console.log("Connected!");
		// Load resource pack and set webhook info
		BOT.acceptResourcePack();
		webhookInfo.UUID = BOT.player.uuid;
		webhookInfo.USERNAME = BOT.username;
		// Manage Discord status (Currently Broken)
		if (settings.discordStatus == true) {
			startStatus(BOT.username, stats.startTime);
		}
		await sendWebhook("join", { webhookInfo });
	});

	// Detect System Messages
	BOT.on("messagestr", async (message, messagePosition) => {
		if (messagePosition == "system") {
			// Token earning detection
			if (
				message.match(/[\W]* You won ([0-9]) (\w*) Token[s]?!/g) != null
			) {
				const AMOUNT = Number.parseInt(message.replace(/[^0-9]+/, ""));
				const SEASON = message.replace(
					/[\W]* You won ([0-9]) (\w*) Token[s]?!/g,
					"$2"
				);
				if (SEASON != stats.season) {
					stats.season = SEASON;
				}
				stats.totalTokensEarnt += AMOUNT;
				stats.tokenTimesEarnt++;
				if (settings.tokenAlerts.active == true) {
					const MSG = messageCreator("token", {
						amount: AMOUNT,
						season: SEASON,
						stats,
					});
					await sendWebhook("token", { msg: MSG, webhookInfo });
					if (settings.logToConsole == true) {
						console.log(`Collected ${AMOUNT} ${SEASON} tokens!`);
					}
				}
			}
			// Token message detection
			if (message.includes("鳠")) {
				stats.tokenMessages++;
			}
			// Gem message detection
			if (message.includes("阵")) {
				stats.activityGems += 50;
				stats.totalGems += 50;
				if (settings.gemAlerts.active == true) {
					const MSG = messageCreator("gems", { stats });
					await sendWebhook("gems", { msg: MSG, webhookInfo });
					if (settings.logToConsole == true) {
						console.log("Earnt 50 gems!");
					}
				}
			}
		}
		if (messagePosition == "chat") {
			// DM Detection
			if (
				message.match(/[\W]+(\w+) -> ME: ([\w\W]+)/g) &&
				settings.dmAlerts == true
			) {
				const MSG = messageCreator("message", {
					message: message.replace(
						/[\W]+(\w+) -> ME: ([\w\W]+)/g,
						"$2"
					),
				});
				const USERNAME = message.replace(
					/[\W]+(\w+) -> ME: ([\w\W]+)/g,
					"$1"
				);
				await sendWebhook("dm", {
					msg: MSG,
					username: USERNAME,
					webhookInfo,
				});
				if (settings.logToConsole == true) {
					console.log(`${USERNAME} -> ME: ${MSG}`);
				}
			}
			// Market sold detection
			if (message.includes("這")) {
				const BUYER_REGEX = RegExp(
					/[\W]+Purchase made by: [\W]+([\w]+)/g
				);
				const BUYER_RESULT = BUYER_REGEX.exec(message);
				const amount = Number.parseInt(message.replace(/[^0-9]+/, ""));
				const buyer = BUYER_RESULT[1];
				stats.marketGems += amount;
				stats.totalGems += amount;
				if (settings.marketAlerts.sellAlert == true) {
					const MSG = messageCreator("marketSold", {
						amount,
						buyer,
						stats,
					});
					await sendWebhook("marketSold", { msg: MSG, webhookInfo });
					if (settings.logToConsole == true) {
						console.log(
							`${username} brought your item for ${amount}`
						);
					}
				}
			}
			// Market outbid detection
			if (
				message.match(
					/[\W]\[(?:Market|Housing)] You have been outbid by \W+(\w+) ([\d,]+)/
				)
			) {
				const USERNAME = message.replace(
					/[\W]\[(?:Market|Housing)] You have been outbid by \W+(\w+) ([\d,]+)/,
					"$1"
				);
				const AMOUNT = Number.parseInt(message.replace(/[^0-9]+/, ""));
				const outbidSettings = settings.marketAlerts.outbidAlert;
				if (outbidSettings.active == true) {
					const MSG = messageCreator("marketOutbid", {
						amount: AMOUNT,
						username: USERNAME,
					});
					if (
						outbidSettings.ping == true &&
						outbidSettings.pingUserID
					) {
						await sendWebhook("marketOutbid", {
							msg: MSG,
							ping: `<@${outbidSettings.pingUserID}>`,
							webhookInfo,
						});
					} else {
						await sendWebhook("marketOutbid", {
							msg: MSG,
							webhookInfo,
						});
					}
					if (settings.logToConsole == true) {
						console.log(
							`Outbid by: ${USERNAME}. New price ${AMOUNT}`
						);
					}
				}
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
			(message.includes(BOT.username) &&
				settings.mentionAlerts.personal == true) ||
			(isEveryonePing(message) &&
				settings.mentionAlerts.everyone == true)
		) {
			const MSG = messageCreator("message", { message });
			await sendWebhook("mention", { msg: MSG, username, webhookInfo });
			if (settings.logToConsole == true) {
				console.log(`${username}: ${message}`);
			}
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
	BOT.on("kicked", async (reason, loggedIn) => {
		if (loggedIn) {
			stats.endTime = Date.now();
			const MSG = messageCreator("exit", { stats });
			await sendWebhook("kick", { webhookInfo, reason, msg: MSG });
		}
		console.log(JSON.parse(reason).text);
		process.exit();
	});

	// Detect error with client
	BOT.on("error", async (error) => {
		if (error.code == "ECONNREFUSED") {
			return console.log("Could not connect!");
		}
		if (error.code == "ECONNRESET") {
			// Auto reconnect
			const BOT = mineflayer.createBot(OPTIONS);
			bindEvents(BOT);
		} else {
			stats.endTime = Date.now();
			const MSG = messageCreator("exit", { stats });
			await sendWebhook("crash", { webhookInfo, msg: MSG });
			console.error(error);
			process.exit();
		}
	});

	// Detect disconnecting from the server
	BOT.on("end", async () => {
		stats.endTime = Date.now();
		const MSG = messageCreator("exit", { stats });
		await sendWebhook("disconnect", { webhookInfo, msg: MSG });
		console.log("Disconnected from server");
		// Auto reconnect
		const BOT = mineflayer.createBot(OPTIONS);
		bindEvents(BOT);
	});

	// Detect program stop
	process.on("SIGINT", () => shutdown());
	process.on("SIGTERM", () => shutdown());

	async function shutdown(){
		stats.endTime = Date.now();
		const MSG = messageCreator("exit", { stats });
		await sendWebhook("disconnect", { webhookInfo, msg: MSG });
		console.log("Disconnected from server");
		process.exit();
	}
}
