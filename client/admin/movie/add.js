function addMovie() {
	const title = document.getElementById("title").value;
	const director = document.getElementById("director").value;
	const synopsis = document.getElementById("synopsis").value;
	const price = document.getElementById("price").value;
	const poster = document.getElementById("poster").value;
	const trailer = document.getElementById("trailer").value;
	const movie = document.getElementById("movie").value;
	
	const req = new XMLHttpRequest();
	req.open("POST", "http://localhost:2800/movie/");
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({ 
		"title": title, 
		"director": director, 
		"synopsis": synopsis, 
		"price": price, 
		"poster": poster, 
		"trailer": trailer, 
		"movie": movie
	}));
	console.log(req)
	
	req.onreadystatechange = function() {
		console.log(this.readyState, this.status)
        if (this.readyState == 2 && this.status == 200) {
			alert("Data added successfully");
			return location.href = 'file:///C:/Users/piete/Documents/Projects/cpp401/client/admin/movie/index.html';
		}
	}
}
