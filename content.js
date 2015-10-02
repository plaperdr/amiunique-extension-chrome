//AmIUnique content.js

chrome.runtime.sendMessage({
        from: 'content',
        subject: 'amiID'
    },
    function(response){
        document.getElementById("menuTimeline").href = "/timeline/"+response.data;
    }
);