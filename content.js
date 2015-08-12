//AmIUnique content.js

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if(request.from == "background") {

            //Adding the UUID in the loaded iframe
            fp = document.getElementById("fp");
            fp.setAttribute("uuid", request.uuid);

            setTimeout(function () {
                numb = fp.getAttribute("nbEvol");

                chrome.runtime.sendMessage({
                    from: 'content',
                    subject: 'nbEvol',
                    nbEvol: numb
                });

            }, 5000);
        }

    }
);