class Auth {
	constructor() {
        document.querySelector('body').style.display = 'none';
		const token = sessionStorage.getItem('token');
		this.validateToken(token);
	}

	validateToken(token) {
        // POST jwt.verify

		if (token != 1) {
			window.location.replace('/');
		} else {
            document.querySelector('body').style.display = 'block';
		}
	}

	logOut() {
		sessionStorage.removeItem('token');
		window.location.replace('/');
	}
}
