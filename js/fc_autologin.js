$(document).ready(function(){
    /*
    var check_empty_page = true;
    // Sometimes Puls fails to load, for whatever reason.
    // If that's the case, reload the page.
    if (document.body.innerHTML.length === 0 && check_empty_page) { // Body is empty!
        window.location.reload(true) // reload, don't look for cache.
    } */
    // load settings
    chrome.storage.sync.get({
        username: "",
        password: "",
        auto_login: false,
        reload_empty_page: false
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
            var login_form = document.getElementById("loginForm");
            var username = document.getElementById("userid");
            var password = document.getElementById("password")

            username.value = settings.username;
            password.value = settings.password;

            login_form.submit()
        }

        if (page === "other") {
            // do nothing
        }

        if (page === "error") {
            // do nothing
        }
    });
});