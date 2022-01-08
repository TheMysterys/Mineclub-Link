const { Client } = require("discord-rpc");
let client = new Client({
	transport: "ipc",
});

async function updateStatus(username, startTime) {
	return client.request("SET_ACTIVITY", {
		pid: process.pid,
		activity: {
			details: "Username:",
			state: username,
			assets: {
				large_image: "mineclub-link",
			},
			buttons: [
				{
					label: "Get Mineclub Link!",
					url: "https://mineclub.mysterybots.com",
				},
			],
			timestamps: {
				start: startTime,
			},
		},
	});
}

function startStatus(username, startTime) {
	client = new Client({
		transport: "ipc",
	});
	client.on("ready", async () => {
		setInterval(async () => {
			await updateStatus(username, startTime);
		}, 5000);
	});
	client.login({ clientId: "928762340961304597" });
}

process.on("unhandledRejection", (err) => {
	if (err.message === "Could not connect") {
		console.log(
			"### Unable to start Discord Status. Make sure Discord is open for this to run (Mineclub Link will continue to run, but Discord status has been disabled) ###"
		);
		return;
	}
});

module.exports = { startStatus };
