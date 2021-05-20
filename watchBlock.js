// add pull watch for block and put the block ref ID into a specified page based on page name

// old video: https://www.loom.com/share/b1936a272e3b4031b3d5a167631cc1a0


function addPullWatchAtBlock(blockID,pageName){

  var blockString = '[:block/uid "' + blockID + '"]'; 

  console.log(blockString);

  pageID = getPageIDFromPageName(pageName);

  console.log(pageID);

  var result = roamAlphaAPI
  .data
  .addPullWatch("[{:block/_refs [:block/string :block/uid]}]", 
                blockString, function a(before, after)
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
            {"parent-uid": pageID, 
            "order": 0}, 
            "block": 
            {"string": '((' + newBlockRef + '))'}})
});

  console.log(result);
}



function getPageIDFromPageName(pageName){
  var pageID = window.roamAlphaAPI.q(`
  [:find ?pageID
  :in $ ?pageName
  :where
    [?p :node/title ?pageName]
    [?p :block/uid ?pageID]
]`, pageName);

  return pageID[0][0];
}



