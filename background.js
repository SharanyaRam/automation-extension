//This is the background code 
var ports = [];
chrome.runtime.onConnect.addListener(function(port) {		
    if (port.name !== "devtools") return;
    ports.push(port);
    // Remove port when destroyed (eg when devtools instance is closed)
    port.onDisconnect.addListener(function() {
        var i = ports.indexOf(port);
        if (i !== -1) ports.splice(i, 1);
    });
    
    chrome.windows.getCurrent(function(win){
        chrome.tabs.getAllInWindow(win.id, function(tabs) {  
            tabs.forEach(function(tab) {             
              //Post tab info to port only if the page is viddigo or mraid.     
              if(tab.active && tab.selected && tab.highlighted && (tab.status === "complete") && ((tab.title === "Viddigo") || (tab.title === "Device Simulator"))) {                                    
                ports.forEach(function(port) { 
                  port.postMessage(tab);
                });                  
              }                  
            });
        });
    });      
});   