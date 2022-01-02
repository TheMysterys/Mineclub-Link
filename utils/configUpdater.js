const fs = require("fs");

const EXAMPLE_CONFIG = require("../example-config");
const CONFIG_PATH = "./config.js";

async function configUpdater() {
	try {
		if (fs.existsSync(CONFIG_PATH)) {
			const CURRENT_CONFIG = require("../config");

			if (CURRENT_CONFIG.configVersion == EXAMPLE_CONFIG.configVersion) {
				return;
			}

			console.log("### New Update to config file. Updating it! ###");

			// Cycle through options
			for (let option in EXAMPLE_CONFIG) {
				if (option != "configVersion") {
					if (CURRENT_CONFIG[option]) {
						EXAMPLE_CONFIG[option] = CURRENT_CONFIG[option];
					}
				}
			}

			// Format JSON (and remove "" around var names)
			let json = JSON.stringify(EXAMPLE_CONFIG, null, "\t");
			json = json.replace(/"([^"]+)":/g, "$1:");
			json = json.replace(/\n/g,"\r\n");
			
			// Write the updated file
			await fs.writeFileSync(
				"./config.js",
				`module.exports = ${json};`,
				function (err) {
					if (err) return console.log(err);
				}
			);
		} else {
			console.log("### No Config file found. Creating it! ###");

			fs.copyFile("./example-config.js", "./config.js", function (err) {
				if (err) return console.log(err);
			});
		}
	} catch (err) {
		console.log(err);
	}
}

module.exports = { configUpdater };