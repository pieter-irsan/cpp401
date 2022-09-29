function userCreate() {
	const title = document.getElementById("title").value;
	const director = document.getElementById("poster").value;
	const synopsis = document.getElementById("synopsis").value;
	const price = document.getElementById("price").value;
	const poster = document.getElementById("poster").value;
	const trailer = document.getElementById("trailer").value;
	const movie = document.getElementById("movie").value;
		
	const req = new XMLHttpRequest();
	req.open("POST", "");
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({ 
		"title": title, 
		"director": director, 
		"synposis": synopsis, 
		"price": price, 
		"poster": poster, 
		"trailer": trailer, 
		"movie": movie
	}));
	req.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			// const objects = JSON.parse(this.responseText);
			// Swal.fire(objects['message']);
			// loadTable();
		}
	};
}
