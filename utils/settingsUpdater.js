const fs = require("fs");

const SETTINGS_PATH = "./settings.js";
const SETTINGS_EXPLAINED_MESSAGE =
	"Check https://github.com/TheMysterys/Mineclub-Link/wiki/Settings-Explained to learn about each setting";

const DEFAULT_SETTINGS = {
	settingsFileVersion: "0.3",
	webhookURL: "",
	authType: "microsoft",
	username: "",
	password: "",
	version: "1.17.1",
	discordStatus: true,
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
		showTotal: true,
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

			if (
				CURRENT_SETTINGS.settingsFileVersion ==
				DEFAULT_SETTINGS.settingsFileVersion
			) {
				return;
			}

			console.log("### New Update to settings file. Updating it! ###");
			console.log(`### ${SETTINGS_EXPLAINED_MESSAGE} ###`);

			// Cycle through options
			for (const option in DEFAULT_SETTINGS) {
				if (typeof(DEFAULT_SETTINGS[option]) == "object" && CURRENT_SETTINGS[option]){
					for (const subOption in DEFAULT_SETTINGS[option]){
						if (typeof(DEFAULT_SETTINGS[option][subOption]) == "object" && CURRENT_SETTINGS[option][subOption]){
							for (const subSubOption in DEFAULT_SETTINGS[option][subOption]){
								if (subSubOption in CURRENT_SETTINGS[option][subOption]){
									DEFAULT_SETTINGS[option][subOption][subSubOption] = CURRENT_SETTINGS[option][subOption][subSubOption];
								}
							}
						}else {
							if (subOption in CURRENT_SETTINGS[option]){
								DEFAULT_SETTINGS[option][subOption] = CURRENT_SETTINGS[option][subOption];
							}
						}
					}
				}
				else if (
					option != "settingsFileVersion" &&
					option in CURRENT_SETTINGS
				) {
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
				`// ### ${SETTINGS_EXPLAINED_MESSAGE} ###\r\nmodule.exports = ${json};`,
				function (err) {
					if (err) {
						return console.log(err);
					}
				}
			);
		} else {
			console.log("### No settings file found. Creating it! ###");
			console.log(`### ${SETTINGS_EXPLAINED_MESSAGE} ###`);

			// Format JSON (and remove "" around var names)
			let json = JSON.stringify(DEFAULT_SETTINGS, null, "\t");
			json = json.replace(/"([^"]+)":/g, "$1:");
			json = json.replace(/\n/g, "\r\n");

			// Write the updated file
			fs.writeFile(
				"./settings.js",
				`// ### ${SETTINGS_EXPLAINED_MESSAGE} ###\r\nmodule.exports = ${json};`,
				function (err) {
					if (err) {
						return console.log(err);
					}
				}
			);
		}
	} catch (err) {
		console.log(err);
	}
}

function getSettingsFileVersion() {
	return DEFAULT_SETTINGS.settingsFileVersion;
}

module.exports = { settingsUpdater, getSettingsFileVersion };