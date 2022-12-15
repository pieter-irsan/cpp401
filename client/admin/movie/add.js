function addMovie() {
	const poster = document.getElementById('poster').files[0];
    const movie = document.getElementById('movie').files[0];
	const formData = new FormData(addForm);
    
	formData.set("title", document.getElementById("title").value);
    formData.set("director", document.getElementById("director").value);
    formData.set("synopsis", document.getElementById("synopsis").value);
    formData.set("price", document.getElementById("price").value);
    formData.set("trailer", document.getElementById("trailer").value);
    if (poster) formData.set("poster", poster, transformToFilename(title));
    if (movie) formData.set("movie", movie, transformToFilename(title));


	fetch("http://localhost:2800/movie/", {
        method: "POST",
        body: formData
    })
    .then((response) => {
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        response.json()
    
        alert("Data added successfully");
		return location.href = '/admin/movie/index.html';
    })
    .catch((error) => {
		console.log(error)
        alert("500 — Internal Server Error");
        location.reload();
    })
}
