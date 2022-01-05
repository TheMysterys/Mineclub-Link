const config = require("../config");
const formatDuration = require("format-duration");
const { tokenList, emojiList, emojiConvert, gemEmoji } = require("./emojis");

function messageCreator(type, args) {
	let msg;
	if (type == "token") {
		msg = `Collected ${args.amount} ${args.season} ${
			args.amount > 1
				? "tokens"
				: "token"
		}. ${tokenList[args.season]}\n`;
		if (config.tokenAlerts.showTotal) {
			msg +=
				`Session Total: ${args.stats.totalTokensEarnt.toLocaleString()} ${
					tokenList[args.season]
				}`;
		}
	} else if (type == "gems") {
		msg = `Earnt 50 gems ${emojiList.gem100}\n`;
		if (config.gemAlerts.showTotal) {
			msg +=
				`Session Total: ${args.stats.totalGems.toLocaleString()} ${
					gemEmoji[args.totalGems]
				}`;
		}
	} else if (type == "message") {
		msg = args.message;
		if(msg.match(/[\W]/g)){
			for (const emoji of msg.match(/[\W]/g)) {
				if (emojiConvert(emoji)) {
					msg = msg.replace(emoji, emojiConvert(emoji));
				}
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
			`Session Time: ${formatDuration(args.stats.endTime - args.stats.startTime)}`,
			`Tokens Ratio: \`${args.stats.tokenTimesEarnt} : ${args.stats.tokenMessages}\` (${ratio})`,
			`Tokens Earnt: ${args.stats.totalTokensEarnt.toLocaleString()} ${
				args.stats.season
					? tokenList[args.stats.season]
					: ""
			}`,
			`Total Gems Earnt: ${args.stats.totalGems.toLocaleString()} ${gemEmoji(args.stats.totalGems)}`,
		].join("\n");
		if (config.stats.goodnights) {
			msg +=
				`\nGoodbyes Sent: ${args.stats.goodnights.toLocaleString()}`;
		}
	}
	return msg;
}

module.exports = { messageCreator };