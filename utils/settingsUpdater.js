const fs = require("fs");

const SETTINGS_PATH = "./settings.js";

const DEFAULT_SETTINGS = {
	settingsFileVersion: "0.1",
	webhookURL: "",
	authType: "microsoft",
	username: "",
	password: "",
	version: "1.17.1",
	logToConsole: false,
	tokenAlerts: {
		active: true,
		showTotal: true,
	},
	gemAlerts: {
		active: true,
		showTotal: true,
	},
	marketAlerts: {
		sellAlert: true,
		outbidAlerts: {
			active: true,
			ping: true,
			pingUserID: "",
		},
	},
	mentionAlerts: {
		everyone: true,
		personal: true,
	},
	dmAlerts: true,
	stats: {
		goodnights: true,
	},
};


function settingsUpdater() {
	try {
		if (fs.existsSync(SETTINGS_PATH)) {
			const CURRENT_SETTINGS = require("../settings");

			if (CURRENT_SETTINGS.settingsFileVersion == DEFAULT_SETTINGS.settingsFileVersion) {
				return;
			}

			console.log("### New Update to settings file. Updating it! ###");

			// Cycle through options
			for (const option in DEFAULT_SETTINGS) {
				if (option != "settingsFileVersion" && CURRENT_SETTINGS[option]) {
					DEFAULT_SETTINGS[option] = CURRENT_SETTINGS[option];
				}
			}

			// Format JSON (and remove "" around var names)
			let json = JSON.stringify(DEFAULT_SETTINGS, null, "\t");
			json = json.replace(/"([^"]+)":/g, "$1:");
			json = json.replace(/\n/g, "\r\n");

			// Write the updated file
			fs.writeFile(
				"./settings.js",
				`module.exports = ${json};`,
				function(err) {
					if (err) {
						return console.log(err);
					}
				},
			);
		} else {
			console.log("### No settings file found. Creating it! ###");

			// Format JSON (and remove "" around var names)
			let json = JSON.stringify(DEFAULT_SETTINGS, null, "\t");
			json = json.replace(/"([^"]+)":/g, "$1:");
			json = json.replace(/\n/g, "\r\n");

			// Write the updated file
			fs.writeFile(
				"./settings.js",
				`module.exports = ${json};`,
				function(err) {
					if (err) {
						return console.log(err);
					}
				},
			);
		}
	} catch (err) {
		console.log(err);
	}
}

function getSettingsFileVersion(){
	return DEFAULT_SETTINGS.settingsFileVersion;
}

module.exports = { settingsUpdater, getSettingsFileVersion };