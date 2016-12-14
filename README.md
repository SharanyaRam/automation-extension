### Chrome extension for backend checks for Mobile Direct Pages

This is a Google Chrome extension to automate the process of backend checks for Mobile Direct pages (html5 and mraid).

It checks for the list of 11 keywords (mobitrans, mobileacademy, mobile academy, vip games, vipgames, mozook, ringtones, babelbay, thuraya, media city, b2t) in each of the following:

1. CSS
2. Image info
3. Requests and Responses
4. Cookies

Steps to install and use the extension:

1. Download this repository.
2. Go to the extensions page in Google Chrome or type chrome://extensions/ in the address bar
3. Click on 'Load unpacked extension'
4. Select the repository that you just downloaded.
5. You will see the extension added on top and make sure 'Enabled' is checked.
5. Check "Allow in incognito". (If you will be testing the pages on incognito mode as well)
6. Open a Mobile direct page and open Devtools (Right click --> Inspect). 
7. You will see logs on the console if there are any of the 11 keywords in the page.
8. To test a mraid, 
	* Make sure the tag has setTimeout() because the extension reads the requests and validates them while the requests are being made. 
	* Once you click on Render, open devtools of the mraid (Right Click --> Inspect).
	* You will see logs on the console if there are any of the 11 keywords in the page.
9. To add/remove keywords:
 	* Open devtools.js file in the source code of the extension and add/remove keywords in the line below.	
```javascript
var match = data.match(/mobitrans|mobileacademy|mobile academy|vip games|vipgames|mozook|ringtones|babelbay|thuraya|media city|b2t/gi);
```

 *  Navigate to extensions page (chrome://extensions/) and click on "Reload" option of the extension. We reload the extension because we modified the source code. 
 * Close and re-open devtools of the page that you were testing for the changes to reflect.


#### References used to create this extension:

 * [Devtools Extension](https://developer.chrome.com/extensions/devtools)
 * [Chrome Runtime API](https://developer.chrome.com/extensions/runtime)
 * [Chrome Windows API](https://developer.chrome.com/extensions/windows)
 * [Chrome Tabs API](https://developer.chrome.com/extensions/windows)
