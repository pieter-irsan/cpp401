function loginUser() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	const req = new XMLHttpRequest();
	req.open("POST", "http://localhost:2800/auth/login");
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({ 
		"username": username, 
		"password": password
	}));

	req.onreadystatechange = function() {
		console.log(this.readyState, this.status)
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.responseText);
			document.cookie = `token=${response.token}; max-age=86400; path=/`;
			location.href = '/app/index.html';
		} else if (this.readyState == 4 && this.status == 401) {
			alert("Incorrect username/password!");
			location.reload();
        } else if (this.readyState == 4 && this.status == 500) {
			alert("500 — Internal Server Error");
			location.reload();
		}
    }
}