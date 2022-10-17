function loginAdmin() {
	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	const req = new XMLHttpRequest();
	req.open("POST", "http://localhost:2800/admin/login");
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({ 
		"username": username, 
		"password": password
	}));

	req.onreadystatechange = function() {
		console.log(this.readyState, this.status)
        if (this.readyState == 4 && this.status == 200) {
            // const [response] = JSON.parse(this.responseText);
            // const token = response['title']
			// localStorage.setItem('token', token);
			window.setTimeout(() => window.location.href = 'file:///C:/Users/piete/Documents/Projects/cpp401/client/admin/index.html', 1000);
			// return location.href = 'file:///C:/Users/piete/Documents/Projects/cpp401/client/admin/index.html';
		} else if (this.readyState == 4 && this.status == 401) {
			alert("Incorrect username/password!");
			location.reload();
        } else if (this.readyState == 4 && this.status == 500) {
			alert("500 — Internal Server Error");
			location.reload();
		}
    }
}
