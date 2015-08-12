//AmIUnique background.js

console.log("AmIUnique extension");

var iframe;

//Extension variables
var uuid;
var nbEvol;
var lastSent;
var changesToSee;

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

            chrome.runtime.sendMessage({
                from: "background",
                uuid: uuid
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

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        console.log(request);

        if (request.from == "content") {
            var newEvol = parseInt(request.nbEvol);

            //If the fingerprint has changed
            //We indicate it in the browser action
            if (newEvol > nbEvol) {
                chrome.browserAction.setBadgeText({text:"!"});
                nbEvol = newEvol;
                changesToSee = true;
                chrome.storage.local.set({'nbEvol': nbEvol, 'changesToSee':true});
            }

            //We update the time the last FP was sent
            lastSent = new Date();
            chrome.storage.local.set({'lastSent': lastSent});

        } else if (request.from == "popup"){

            //If the user has clicked on the "View changes" button
            //We reset the text the badge of the browser action
            chrome.browserAction.setBadgeText({text:""});
            changesToSee = false;
            chrome.storage.local.set({'changesToSee':false});

        }
    }
);


//Get the unique ID in Chrome storage
//If not present, generate it
chrome.storage.local.get(function(items) {
    uuid = items.uuid;
    nbEvol = items.nbEvol;
    changesToSee = items.changesToSee;
    lastSent = items.lastSent;
    if(uuid === undefined) {
        uuid = generateUUID();
        chrome.storage.local.set({'uuid': uuid});
    }
    if(nbEvol === undefined){
        nbEvol = 0;
        changesToSee = false;
        lastSent = new Date();
        chrome.storage.local.set({'nbEvol':nbEvol, 'changesToSee':changesToSee, 'lastSent': lastSent});
    }
    if(changesToSee) chrome.browserAction.setBadgeText({text:"!"});
});

//Start the main application loop when the background document is ready
document.addEventListener("DOMContentLoaded", function(event) {
    startLoop();
});

