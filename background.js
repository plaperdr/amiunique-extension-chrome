//AmIUnique background.js

console.log("AmIUnique extension");

var iframe;
var uuid;

function generateUUID(){
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function loadIframe(){
    console.log("Loading iframe");
    iframe.src= "https://amiunique.org/extension";
}

function clearIframe() {
    console.log("Clearing iframe");
    iframe.src= "";
}

function registerListener(){
    iframe = window.document.getElementById("amiunique");
    iframe.addEventListener("load", function () {
        if(!iframe.src.startsWith("chrome-extension")) {

            chrome.runtime.sendMessage({uuid: uuid}, function(response) {
            });

            setTimeout(clearIframe,10000);
        }
    });
}

function startLoop(){

    //Register listeners so the UUID is sent
    //to the content script when the iframe
    //is loaded
    registerListener();

    //Send FP on browser startup
    loadIframe();

    //Send the FP every 4 hours to the server
    setInterval(loadIframe,4*60*60*1000);
}

chrome.runtime.onStartup.addListener(function(){
    console.log("On startup");

    chrome.storage.local.get('uuid',function(items) {
        uuid = items.uuid;
        if(uuid === undefined){
            uuid = generateUUID();
            chrome.storage.local.set({'uuid': uuid});
        }
    });

    startLoop();
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
    console.log(request);
});

