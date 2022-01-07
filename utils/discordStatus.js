const client = new (require("easy-presence").EasyPresence)(
	"928762340961304597"
);

function startStatus(username) {
	setInterval(() => {
		client.setActivity({
			details: "Username:",
			state: username,
			assets: {
				large_image: "mineclub-logo"
			},
			buttons: [
				{
					label: "Get Mineclub Link!",
					url: "https://mineclub.mysterybots.com",
				},
			],
			timestamps: { start: new Date() },
		});
	}, 1000);
}

module.exports = { startStatus };
