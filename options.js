var background = chrome.extension.getBackgroundPage();

// Saves options to chrome.storage.sync.
function save_options() {
    var userChoice = document.querySelector('input[name="notif"]:checked').value;

    // Update changes in background page
    background.updateOptions(userChoice);

    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
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

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);