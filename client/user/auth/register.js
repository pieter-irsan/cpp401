function registerUser() {
	const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const req = new XMLHttpRequest();
	req.open("POST", "http://localhost:2800/auth/register");
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({ 
		"username": username, 
        "email": email, 
		"password": password
	}));

	req.onreadystatechange = function() {
		console.log(this.readyState, this.status)
        if (this.readyState == 4 && this.status == 200) {
            alert("Successfully registered");
			location.href = '/auth/login.html';
		} else if (this.readyState == 4 && this.status == 409) {
			alert("Username is already taken");
			location.reload();
		} else if (this.readyState == 4 && this.status == 500) {
			alert("500 — Internal Server Error");
			location.reload();
		}
    }
}
