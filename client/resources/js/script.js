const myDefaultAllowList = bootstrap.Tooltip.Default.allowList
myDefaultAllowList.span = ['style', 'onclick']

function isEmptyOrWhitespace(str) {
    return str == null || str.replace(/\s/g, '').length < 1
}

function transformToFilename(string) {
    if (typeof string == 'string') {
        return string.trim()
            .replaceAll(' ','-')
            .replace(/[^a-z0-9-]/gi, '')
            .replace(/-+/gi,'-')
            .toLowerCase();
    }
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

if (getCookie('token') != null) {
    registerBtn = document.getElementById("registerButton");
    loginBtn = document.getElementById("loginButton");

    if (registerBtn && loginBtn) {
        // Change 'Register' button to 'My Movies' button
        document.getElementById("registerButton").setAttribute("onclick", "location.href='/user/movie.html'");
        document.getElementById("registerButton").innerHTML = 'My Movies';

        // Change 'Login' button to 'Logout' button
        document.getElementById("loginButton").setAttribute("onclick", "logoutUser()");
        document.getElementById("loginButton").innerHTML = 'Logout';
        document.getElementById("loginButton").className = 'btn btn-white border border-dark bg-danger text-white mx-2';
    }
}
