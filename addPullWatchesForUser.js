function addPullWatchesForUser(displayName,pageName){
	
	// get an array of blockUIDs
	blockUIDs = findAllBlocksFromUser(displayName);

	// iterate over the array to add pull watches for each block
	for (var i = blockUIDs.length - 1; i >= 0; i--) {
		var pw = addPullWatchAtBlock(blockUIDs[i],pageName);
	}

}

function removePullWatchesForUser(displayName,pageName){
	
	// get an array of blockUIDs
	blockUIDs = findAllBlocksFromUser(displayName);

	// iterate over the array to add pull watches for each block
	for (var i = blockUIDs.length - 1; i >= 0; i--) {
		var pw = removePullWatchAtBlock(blockUIDs[i],pageName);
	}

}