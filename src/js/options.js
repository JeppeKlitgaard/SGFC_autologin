function save_options () {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var auto_login = document.getElementById("auto-login").checked;
    var reload_empty_page = document.getElementById("reload-empty-page").checked;

    var last_updated_ext_version = chrome.runtime.getManifest().version;

    chrome.storage.sync.set({
        username: username,
        password: password,
        auto_login: auto_login,
        reload_empty_page: reload_empty_page,
        last_updated_ext_version: last_updated_ext_version
    }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('save-button-text');
    var status_icon = document.getElementById('save-button-icon')
    status.textContent = 'Gemt';
    $("#save-button-icon").show();
    setTimeout(function() {
        status.textContent = 'Gem';
        $("#save-button-icon").hide();

    }, 2500);
  });
}

function restore_options () {
    //load currently stored options configuration
    chrome.storage.sync.get({
        username: '',
        password: '',
        auto_login: true,
        reload_empty_page: true
    }, function(items) {
        document.getElementById("username").value = items.username;
        document.getElementById("password").value = items.password;

        document.getElementById("auto-login").checked = items.auto_login;
        document.getElementById("reload-empty-page").checked = items.reload_empty_page;
    });
}

//bind events to dom elements
document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save-button').addEventListener('click', save_options);