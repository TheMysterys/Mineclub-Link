const c = require("centra");

const WEBHOOK_URL = require("../settings").webhookURL;

async function sendWebhook(type, args) {
	if (type == "token") {
		await c(WEBHOOK_URL, "POST")
			.body({
				username: `Mineclub Link [${args.webhookInfo.USERNAME}]`,
				avatar_url: `https://crafatar.com/renders/head/${args.webhookInfo.UUID}?overlay`,
				embeds: [
					{
						title: "Tokens Earnt",
						color: 0x42db11,
						description:
							args.msg,
					},
				],
			})
			.send();
		return;
	}
	if (type == "gems") {
		await c(WEBHOOK_URL, "POST")
			.body({
				username: `Mineclub Link [${args.webhookInfo.USERNAME}]`,
				avatar_url: `https://crafatar.com/renders/head/${args.webhookInfo.UUID}?overlay`,
				embeds: [
					{
						title: "Gems Earnt",
						color: 0x00ccff,
						description:
							args.msg + "<:Gem_100:837390660952653844> ",
					},
				],
			})
			.send();
		return;
	}
	if (type == "mention") {
		await c(WEBHOOK_URL, "POST")
			.body({
				username: `Mineclub Link [${args.webhookInfo.USERNAME}]`,
				avatar_url: `https://crafatar.com/renders/head/${args.webhookInfo.UUID}?overlay`,
				embeds: [
					{
						author: {
							name: args.username,
						},
						title: "Chat Mention",
						color: 0xd6d6d6,
						description: args.msg,
					},
				],
			})
			.send();
		return;
	}
	if (type == "dm") {
		await c(WEBHOOK_URL, "POST")
			.body({
				username: `Mineclub Link [${args.webhookInfo.USERNAME}]`,
				avatar_url: `https://crafatar.com/renders/head/${args.webhookInfo.UUID}?overlay`,
				embeds: [
					{
						author: {
							name: args.username,
						},
						title: "DM",
						color: 0x6f6f6f,
						description: args.msg,
					},
				],
			})
			.send();
		return;
	}
	if (type == "join") {
		await c(WEBHOOK_URL, "POST")
			.body({
				username: `Mineclub Link [${args.webhookInfo.USERNAME}]`,
				avatar_url: `https://crafatar.com/renders/head/${args.webhookInfo.UUID}?overlay`,
				embeds: [
					{
						title: "Connected to Mineclub",
						color: 0x0033ff,
					},
				],
			})
			.send();
		return;
	}
	if (type == "kick") {
		let ratio = args.tokenTimesEarnt / args.tokenMessages;
		if (Number.isNaN(ratio)) {
			ratio = 0;
		}
		await c(WEBHOOK_URL, "POST")
			.body({
				username: `Mineclub Link [${args.webhookInfo.USERNAME}]`,
				avatar_url: `https://crafatar.com/renders/head/${args.webhookInfo.UUID}?overlay`,
				embeds: [
					{
						title: "Kicked from Mineclub",
						color: 0xff0000,
						description: [
							`Kick reason: ${args.reason}`,
							args.msg
						].join("\n"),
					},
				],
			})
			.send();
		return;
	}
	if (type == "disconnect") {
		let ratio = args.tokenTimesEarnt / args.tokenMessages;
		if (Number.isNaN(ratio)) {
			ratio = 0;
		}
		await c(WEBHOOK_URL, "POST")
			.body({
				username: `Mineclub Link [${args.webhookInfo.USERNAME}]`,
				avatar_url: `https://crafatar.com/renders/head/${args.webhookInfo.UUID}?overlay`,
				embeds: [
					{
						title: "Disconnected from Mineclub",
						color: 0xff7a00,
						description: args.msg,
					},
				],
			})
			.send();
		return;
	}
	if (type == "crash") {
		let ratio = (args.tokenTimesEarnt / args.tokenMessages).toFixed(4);
		if (Number.isNaN(ratio)) {
			ratio = 0;
		}
		await c(WEBHOOK_URL, "POST")
			.body({
				username: `Mineclub Link [${args.webhookInfo.USERNAME}]`,
				avatar_url: `https://crafatar.com/renders/head/${args.webhookInfo.UUID}?overlay`,
				embeds: [
					{
						title: "Crash",
						color: 0xff0000,
						description: [
							"Check console for more information",
							args.msg
						].join("\n"),
					},
				],
			})
			.send();
		return;
	}
}

module.exports = { sendWebhook };