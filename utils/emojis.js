const tokenList = {
	"christmas": "<a:christmastoken:916392876475289661>",
	"halloween": "<a:halloween_token_big:893946799872688168>",
	"fall": "<a:falltoken_gif:883785431538364467>",
	"spring": "", // Spring event doesn't have an emoji on the discord 
	// Might use the summer token if they don't add one by Spring
	"summer": "<a:summer_token_gif:876204768270364712>",
	"autumn": "<:autumntoken:883775113168834581>", // Only one that isn't a gif ...
	"winter": "<a:wintertoken_gif:906586240592265216>"
}

const emojiList = {
	// Gem emotes
	"gem100": "<:Gem_100:837390660952653844>",
	"gem1k": "<:Gem_1k:837390660968513607>",
	"gem10k": "<:Gem_10k:837390660705320993>",
	"gem100k": "<:Gem_100k:837390660926570608>",
	"gemmil": "<:Gem_1m:837390661094211644>",
	
	// Emojis from Discord server for conversion
	// Ahhhhhh (This will take some time and I think some don't exist. Might have to create a asset server)


}

/**
 * 
 * @param {String} input The character used by Mineclub resource pack
 * @returns {String} Discord emoji
 */
function emojiConvert(input){
	return emojiList[input]
}


function gemEmoji(amount){
	if (amount < 1000){
		return emojiList["gem100"]
	}else if (amount < 10000){
		return emojiList["gem1k"]
	}else if (amount < 100000){
		return emojiList["gem10k"]
	}else if (amount < 1000000){
		return emojiList["gem100k"]
	}else {
		return emojiList["gemmil"]
	}
}

module.exports = { tokenList, emojiList, emojiConvert, gemEmoji }