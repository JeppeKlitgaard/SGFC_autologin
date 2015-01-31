$(document).ready(function(){
    // load settings
    chrome.storage.sync.get({
        username: "",
        password: "",
        auto_login: false,
        reload_empty_page: false,
        last_updated_ext_version: "0.0.0"
    }, function(settings) {
        // find out what type of page we're on.
        // login error
        if ($('#fc-login-error').length === 1) {
            var page = "error";
        }

        // login
        else if ($('#loginForm').length === 1) {
            var page = "login";
        }

        // other
        else if ($('#fc-screen').length === 1) {
            var page = "other";
        }

        else {
            var page = "empty";
        }


        // actions
        if (page === "empty" && settings.reload_empty_page) {
            window.location.reload(true) // reload, don't look for cache.
        }

        if (page === "login" && settings.auto_login) {
            // If settings version does not match extension version
            // Open a tab with options.html
            if (chrome.runtime.getManifest().version !== settings.last_updated_ext_version) {
                var url_str = "chrome-extension://" + chrome.runtime.id + "/html/options.html";
                console.log(url_str);
                window.open(url_str);
            }
            else {
                var login_form = document.getElementById("loginForm");
                var username = document.getElementById("userid");
                var password = document.getElementById("password")

                username.value = settings.username;
                password.value = settings.password;

                login_form.submit()
            }
        }

        if (page === "other") {
            // do nothing
        }

        if (page === "error") {
            // do nothing
        }
    });
});