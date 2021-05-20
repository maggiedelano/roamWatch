function findAllBlocksFromUser(displayName){

	userID = getUserIDFromDisplayName(displayName);

	var blocks = window.roamAlphaAPI.q(`
  		[:find ?blockUIDs
  		:in $ ?userID
  			:where
    		[?blocks :create/user ?userID]
    		[?blocks :block/uid ?blockUIDs]
    		(not [?blocks :node/title ?title])
		]`, userID);

	return blocks.map((data, index) => {return data[0]});
}

function getUserIDFromDisplayName(displayName){

	var userID = window.roamAlphaAPI.q(`
	[:find ?userID
  		:in $ ?displayName
  		:where
    		[?userID :user/display-name ?displayName]]
		`,displayName)

	if (userID.length != 0)
		return userID[0][0];
	else
		console.log("No user found with name: " + displayName);
}