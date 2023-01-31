function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
chrome.storage.local.clear(function() {
  console.log('Local storage cleared');
});
chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        if (request.type === "search") {
            console.log(request.keyword);
            console.log(request.asin);
            console.log(request.randomMin);
            console.log(request.randomMax);
            let asin=request.asin;
            let keyword=request.keyword;
            let randomMin=request.randomMin;
            let randomMax=request.randomMax;

            
            
             await new Promise (resolve=>{chrome.tabs.create({ url: "https://www.amazon.de/" },async tab=>{
              await sleep(5000);
              console.log(tab);
              console.log(tab.id);
              chrome.tabs.sendMessage(tab.id, {type: "search",keyword: keyword ,asin:asin,randomMin:randomMin,randomMax:randomMax});
              setTimeout(resolve, 5000);
              
            
        });
    })
            
           
        }
    });

