function addPullWatchAtBlock(blockID,pageName){

  var blockString = '[:block/uid "' + blockID + '"]'; 

  pageID = getPageIDFromPageName(pageName);

  var result = roamAlphaAPI
  .data
  .addPullWatch("[{:block/_refs [:block/string :block/uid]}]", 
                blockString, function a(before, after)
                 {
                  if(before === null){ // check for null / first reference
                   newBlockRef = after[":block/_refs"][0][":block/uid"];
                 }
                  else { 
                   beforeUIDs = before[":block/_refs"].map(x => x[":block/uid"]);
                   afterUIDs = after[":block/_refs"].map(x => x[":block/uid"]);
                   newBlockRef = afterUIDs.filter(x => !beforeUIDs.includes(x));
                  }

            if (newBlockRef.length > 0){
              window
            .roamAlphaAPI
            .createBlock(
            {"location": 
            {"parent-uid": pageID, 
            "order": 0}, 
            "block": 
            {"string": '((' + newBlockRef + '))'}})
            }           
});

  return result;
}

function removePullWatchAtBlock(blockID,pageName){

  var blockString = '[:block/uid "' + blockID + '"]'; 

  pageID = getPageIDFromPageName(pageName);

  var result = roamAlphaAPI
  .data
  .removePullWatch("[{:block/_refs [:block/string :block/uid]}]", 
                blockString);

  return result;
}


function getPageIDFromPageName(pageName){
  var pageID = window.roamAlphaAPI.q(`
  [:find ?pageID
  :in $ ?pageName
  :where
    [?p :node/title ?pageName]
    [?p :block/uid ?pageID]
]`, pageName);
  
  if (pageID.length > 0)
    return pageID[0][0];

  else return [];
}



