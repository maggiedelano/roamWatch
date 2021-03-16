// add pull watch for block and put the block ref ID into a specified page based on page id

// right now the block uid and page uid need to be hardcoded, but easy to take it from here...
// video: https://www.loom.com/share/b1936a272e3b4031b3d5a167631cc1a0
roamAlphaAPI
  .data
  .addPullWatch("[{:block/_refs [:block/string :block/uid]}]", 
                '[:block/uid "BLOCK"]', function a(before, after)
                 {if(before === null){ // check for null / first reference
				           newBlockRef = after[":block/_refs"][0][":block/uid"];
                 }
                  else { 
                   beforeUIDs = before[":block/_refs"].map(x => x[":block/uid"]);
                   afterUIDs = after[":block/_refs"].map(x => x[":block/uid"]);
                   newBlockRef = afterUIDs.filter(x => !beforeUIDs.includes(x));
                  }
  
                  window
  						.roamAlphaAPI
  						.createBlock(
						{"location": 
						{"parent-uid": "PAGE", 
		 				"order": 0}, 
	 					"block": 
						{"string": '((' + newBlockRef + '))'}})
})
