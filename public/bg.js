/*global chrome*/
var toggle = false;
var status = 'off';
var the_tab_id = '';
console.log("MY EXTENSION CONSOLE LOG! BG.JS");

function set_status() {
    toggle = !toggle;
    status = 'off';
    if(toggle) { status = 'on'; }
}

function toggle_extension(tab){
    let myDiv = document.getElementById("mydiv")
    console.log(myDiv)
    // Set icon
    chrome.browserAction.setIcon({ path: 'icons/icon-'+status+'.png', tabId:tab.id });
    // Pass variable & execute script
    chrome.tabs.executeScript({ code: 'var extension_status = "'+status+'"' });
    if(!document.getElementById("mydiv")){
        chrome.tabs.executeScript({ file: 'content/content.js' });
            // Set the tab id
         the_tab_id = tab.id;
    }

}


function my_listener(tabId, changeInfo, tab) {
    // If updated tab matches this one
    if (changeInfo.status === "complete" && tabId === the_tab_id && status === 'on') {
        toggle_extension(tab);
    }
}

chrome.browserAction.onClicked.addListener(function(tab) {
    set_status();
    toggle_extension(tab);
});

chrome.tabs.onUpdated.addListener(my_listener);




// chrome.browserAction.onClicked.addListener(function(tab) { 
//     chrome.tabs.executeScript({
//                   file: 'content/content.js'
//                 });

// });

// chrome.runtime.onMessage.addListener(
//     function(message, callback) {
//       if (message === "runContentScript"){
//         chrome.tabs.executeScript({
//           file: 'content/content.js'
//         });
//       }
//    });