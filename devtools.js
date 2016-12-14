var matchedKeyword;
var port = chrome.runtime.connect({name: 'devtools'});
port.onMessage.addListener(function(msg) {  
      
  //chrome.devtools.inspectedWindow.tabId gives you the ID of the tab where devtools is open 
  if(msg.id == chrome.devtools.inspectedWindow.tabId) {    
                 
    chrome.devtools.network.onRequestFinished.addListener(function(req) {
      
        //Check Request URL (which includes image URLs)
        url = req.request.url;
        matchedKeyword = checkForKeywords(url);
        if(matchedKeyword !== '') chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(matchedKeyword+' keyword(s) found in URL '+url) + ');');      

        //Check cookies
        cookies = JSON.stringify(req.request.cookies);
        matchedKeyword = checkForKeywords(cookies);
        if(matchedKeyword !== '') chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(matchedKeyword+' keyword(s) found in cookies '+cookies) + ');');
        
        //Check html, css and javascript from response
        type = req.response.content.mimeType;    
        if(['text/css','application/javascript','text/javascript','text/html'].indexOf(type) +1){
          //Get the response 
           req.getContent(function(body){
             matchedKeyword = checkForKeywords(body);
             if(matchedKeyword !== '') 
              chrome.devtools.inspectedWindow.eval('console.log(' + JSON.stringify(matchedKeyword+' keyword(s) found in type ' + type +' in response of '+req.request.url) + ');');
           });      
        }            
    });
  }
  
  //Function to check the 11 keywords(case insensitive) in the data that is passed.
  function checkForKeywords(data){    
    var match = data.match(/mobitrans|mobileacademy|mobile academy|vip games|vipgames|mozook|ringtones|babelbay|thuraya|media city|b2t/gi);  
    if(match !== null ) match = match.join("`").toLowerCase().split("`")
    var uniqMatch = [ ...new Set(match) ];
    return uniqMatch.toString();
  }
  
});