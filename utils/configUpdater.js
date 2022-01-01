const fs = require("fs");
const path = require("path");

const EXAMPLE_CONFIG = require("../example-config");
const CONFIG_PATH = "./config.js";

function configUpdater() {
	try {
		if (fs.existsSync(path.resolve(CONFIG_PATH))) {
			const CURRENT_CONFIG = require("../config");

			if (CURRENT_CONFIG.configVersion == EXAMPLE_CONFIG.configVersion) {
				return;
			}

			console.log("### New Update to config file. Updating it! ###");

			// Cycle through options
			for (option in EXAMPLE_CONFIG) {
				if (option != "configVersion") {
					if (CURRENT_CONFIG[option]) {
						EXAMPLE_CONFIG[option] = CURRENT_CONFIG[option];
					}
				}
			}

			// Format JSON (and remove "" around var names)
			let json = JSON.stringify(EXAMPLE_CONFIG, null, 2);
			json = json.replace(/"([^"]+)":/g, "$1:");

			fs.writeFile(
				path.resolve("./config.js"),
				`module.exports = ${json}`,
				function (err) {
					if (err) return console.log(err);
					process.exit();
				}
			);
		} else {
			console.log("### No Config file found. Creating it! ###");

			fs.copyFile(path.resolve("./example-config.js"), path.resolve("./config.js"), function (err) {
				if (err) return console.log(err);
				process.exit();
			});
		}
	} catch (err) {
		console.log(err)
	}
}


module.exports = { configUpdater }