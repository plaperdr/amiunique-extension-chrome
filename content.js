//AmIUnique content.js

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        //Adding the UUID in the loaded iframe
        fp = document.getElementById("fp");
        fp.setAttribute("uuid", request.uuid);
        
    }
);