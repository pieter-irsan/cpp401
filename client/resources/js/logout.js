function logoutAdmin() {
    document.cookie = `token=; max-age=0; path=/`;
    location.href = 'http://localhost:2800/admin/auth/login.html';
}

function logoutUser() {
    document.cookie = `token=; max-age=0; path=/`;
    location.href = 'http://localhost:2800/auth/login.html';
}
