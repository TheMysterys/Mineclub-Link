

function isEveryonePing(message){
	// Check if message includes @everyone
	if (!message.includes("@everyone")){
		return false;
	}
	// Check that message was sent my admin or higher
	if (message.includes("忧匀愃慎惋")){
		return true;
	}else if(message.includes("愃忧惋忧悈怡愤")){
		return true;
	}else if (message.includes("愭肄惋怡愤")){
		return true;
	}else{
		return false;
	}
}

module.exports = { isEveryonePing };