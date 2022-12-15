function deleteMovie(id) {
	fetch("http://localhost:2800/movie/" + id, {
        method: "DELETE"
	})
	.then((response) => {
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
		
		alert("Data deleted successfully");
		location.reload();
	})
	.catch((error) => {
		alert("500 — Internal Server Error");
		location.reload();
	})
}
