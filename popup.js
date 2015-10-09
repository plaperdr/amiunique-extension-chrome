var background = chrome.extension.getBackgroundPage();

document.addEventListener('DOMContentLoaded', function() {

    Array.prototype.forEach.call(document.getElementsByTagName('*'), function (el) {
        if (el.hasAttribute('data-i18n') ){
            el.innerHTML = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
        }
    });

    $('#date').text(background.lastSent);
    $('#nbEvol').text(background.nbEvol);

    if(background.changesToSee){
        $('#changes').show();
    }

    //Adding click events for buttons
    $('#viewChanges').click(function() {
        chrome.tabs.create({ url: "https://amiunique.org/timeline/"+background.uuid+"#"+background.nbEvol });

        chrome.runtime.sendMessage({
            from: 'popup',
            subject: 'changesToSee',
            changesToSee: false
        });

        $('#changes').hide();

    });

    $('#discardChanges').click(function() {
        chrome.runtime.sendMessage({
            from: 'popup',
            subject: 'changesToSee',
            changesToSee: false
        });

        $('#changes').hide();

    });

    $('#viewFP').click(function() {
        chrome.tabs.create({ url: "https://amiunique.org/timeline/"+background.uuid+"#fp" });
    });

    $('#viewTimeline').click(function() {
        chrome.tabs.create({ url: "https://amiunique.org/timeline/"+background.uuid });
    });

});



