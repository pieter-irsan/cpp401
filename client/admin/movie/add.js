function addMovie() {
	// const title = document.getElementById("title").value;
	// const director = document.getElementById("director").value;
	// const synopsis = document.getElementById("synopsis").value;
	// const price = document.getElementById("price").value;
	// const poster = document.getElementById("poster").value;
	// const trailer = document.getElementById("trailer").value;
	// const movie = document.getElementById("movie").value;
	
	// const req = new XMLHttpRequest();
	// req.open("POST", "http://localhost:2800/movie/");
	// req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	// req.send(JSON.stringify({ 
	// 	"title": title, 
	// 	"director": director, 
	// 	"synopsis": synopsis, 
	// 	"price": price, 
	// 	"poster": poster, 
	// 	"trailer": trailer, 
	// 	"movie": movie
	// }));
	
	// req.onreadystatechange = function() {
	// 	console.log(this.readyState, this.status)
    //     if (this.readyState == 4 && this.status == 200) {
	// 		alert("Data added successfully");
	// 		return location.href = '/admin/movie/index.html';
	// 	}
	// }

	const poster = document.getElementById('poster').files[0];
    const movie = document.getElementById('movie').files[0];

    const formData = new FormData(addForm);
    formData.set("title", document.getElementById("title").value);
    formData.set("director", document.getElementById("director").value);
    formData.set("synopsis", document.getElementById("synopsis").value);
    formData.set("price", document.getElementById("price").value);
    formData.set("trailer", document.getElementById("trailer").value);
    if (poster) formData.set("poster", poster, transformToFilename(title));
	else formData.set("poster", null);
    if (movie) formData.set("movie", movie, transformToFilename(title));
	else formData.set("movie", null);

	fetch("http://localhost:2800/movie/", {
        method: "POST",
        body: formData 
		// JSON.stringify({ 
		// 	"title": title, 
		// 	"director": director, 
		// 	"synopsis": synopsis, 
		// 	"price": price, 
		// 	"poster": poster, 
		// 	"trailer": trailer, 
		// 	"movie": movie
		// })
    })
    .then((response) => {
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        console.log(response)
		console.log(response.status)
        response.json()
		console.log(response)
		console.log(response.status)
    })
    .then((data) => {
        console.log(data)
        alert("Data added successfully");
		return location.href = '/admin/movie/index.html';
    })
    .catch((error) => {
        console.log(error)
        // console.log(error.message)
        alert("Error - Check the console for more information");
        location.reload();
    })
}
