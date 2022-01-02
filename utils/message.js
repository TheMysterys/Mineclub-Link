const config = require("../config");
const formatDuration = require("format-duration");
const { tokenList, emojiList, emojiConvert, gemEmoji } = require("./emojis");

function messageCreator(type, args) {
	let msg;
	if (type == "tokens") {
		msg = `Collected ${args.amount} ${args.season} ${
			args.amount > 1 ? "tokens" : "token"
		}. ${tokenList[args.season]}`;
		if (config.tokenAlerts.showTotal) {
			msg =
				msg +
				`Session Total: ${args.stats.totalTokensEarnt.toLocaleString()} ${
					tokenList[args.season]
				}`;
		}
	} else if (type == "gems") {
		msg = `Earnt 50 gems ${emojiList["100Gems"]}`;
		if (config.gemAlerts.showTotal) {
			msg =
				msg +
				`Session Total: ${args.stats.totalGems.toLocaleString()} ${
					gemEmoji[args.totalGems]
				}`;
		}
	} else if (type == "message") {
		msg = args.message;
		for (let i of msg.match(/[\W]/g)) {
			if (emojiConvert(i)) {
				msg = msg.replace(i, emojiConvert(i));
			}
		}
		return msg;
	} else if (type == "exit") {
		let ratio = (
			args.stats.tokenTimesEarnt / args.stats.tokenMessages
		).toFixed(3);
		if (isNaN(ratio)) {
			ratio = 0;
		}
		msg = [
			`Session Time: ${formatDuration(
				args.stats.endTime - args.stats.startTime
			)}`,
			`Tokens Ratio: \`${args.stats.tokenTimesEarnt} : ${args.stats.tokenMessages}\` (${ratio})`,
			`Tokens Earnt: ${args.stats.totalTokensEarnt.toLocaleString()} ${
				args.season ? args.season : ""
			}`,
			`Total Gems Earnt: ${args.stats.totalGems.toLocaleString()} ${gemEmoji(
				args.stats.totalGems
			)}`,
		].join("\n");
		if (config.stats.goodnights) {
			msg =
				msg +
				`\nGoodbyes Sent: ${args.stats.goodnights.toLocaleString()}`;
		}
	}
	return msg;
}

module.exports = { messageCreator };