module.exports = {
	webhookURL: "", 
	authType: "microsoft", // microsoft or mojang
	username: "",
	password: "",
	version: "1.17.1", // Leave blank for auto select

	gemAlerts: {
		active: true, // Send the alert
		showTotal: true, // Display total for session in message
	},

	tokenAlerts: {
		active: true, // Send the alert
		showTotal: true, // Display total for session in message
	},

	mentionAlerts: {
		everyone: true, // Send for @everyone mentions
		personal: true, // Send for username mentions
	},

	dmAlerts: {
		active: true, // Send the alert
	},

	// Stats are bits of information tracked and then displayed on the disconnect screen
	// These stats are tracked even if set to false. You're just changing their visibility
	stats: {
		goodnights: true, // Display how many times people said something related to goodnight
		// This list will expand in time with future updates
	},
};
