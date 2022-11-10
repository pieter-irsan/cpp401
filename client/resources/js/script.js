const myDefaultAllowList = bootstrap.Tooltip.Default.allowList
myDefaultAllowList.span = ['style', 'onclick']

function isEmptyOrWhitespace(str){
    return str == null || str.replace(/\s/g, '').length < 1
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

if (getCookie('token') != null) {
    // Change 'Register' button to 'My Movies' button
    document.getElementById("registerButton").href = "/user/movie.html";
    document.getElementById("registerButton").innerHTML = `
        <span class="btn btn-white border border-dark">My Movies</span>
    `;

    // Change 'Login' button to 'Logout' button
    document.getElementById("loginButton").removeAttribute('href');
    document.getElementById("loginButton").setAttribute("onclick", "logoutUser()");
    document.getElementById("loginButton").innerHTML = `
        <span class="btn btn-white border border-dark">Logout</span>
    `;
}