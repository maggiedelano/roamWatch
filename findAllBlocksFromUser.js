function findAllBlocksFromUser(userID){
	var blocks = window.roamAlphaAPI.q(`
  [:find ?blocks
  :in $ ?userID
  :where
    [?blocks :create/user ?userID]
]`, userID);

	return blocks;
}