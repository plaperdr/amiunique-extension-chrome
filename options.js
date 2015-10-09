var background = chrome.extension.getBackgroundPage();

// Saves options to chrome.storage.sync.
function save_options() {
    var userChoice = document.querySelector('input[name="notif"]:checked').value;

    // Update changes in background page
    background.updateOptions(userChoice);

    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    //status.textContent = 'Options saved.';
    status.textContent = chrome.i18n.getMessage("optionsSaved");
    setTimeout(function() {
        status.textContent = '';
    }, 750);
}

// Restores radio state using the preferences
// stored in the background page
function restore_options() {
    document.getElementById(background.notifications+"Not").checked = true;
    document.getElementById("amiID").textContent = background.uuid;
}

//Translate options page
function translate(){
    Array.prototype.forEach.call(document.getElementsByTagName('*'), function (el) {
        if (el.hasAttribute('data-i18n') ){
            el.innerHTML = chrome.i18n.getMessage(el.getAttribute('data-i18n'));
        }
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.addEventListener('DOMContentLoaded', translate);
document.getElementById('save').addEventListener('click', save_options);