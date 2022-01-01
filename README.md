# Mineclub Link
Mineclub link is a AFK bot that links into a Discord webhook to provide you with information while it AFKs on Mineclub for you. 


## How to configure
To configure the bot rename `example-config.js` to `config.js`. The main settings you will need to change are
- `username`: Change this to your email (or username if on a legacy account)
- `password`: Account password. (Your password is never shared with me or any other people)
- `authType`: This needs to be either "microsoft" or "mojang" depending on whether you have migrated your account or not
- `webhookURL`: A url to a webhook in your Discord where you want logs to be sent. 

## Running the bot
To run the bot you need to have [nodejs](https://nodejs.org) installed. 
1. Run `npm i` to install dependencies
2. Run `npm run start` or `node main.js` to run the program


## Contributing
Please feel free to contribute to the bot by making pull requests.