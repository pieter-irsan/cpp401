function deleteMovie(id) {
    // const req = new XMLHttpRequest();
	// req.open("DELETE", "http://localhost:2800/movie/" + id);
	// req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	// req.send();

    // req.onreadystatechange = function() {
    //     console.log(this.readyState, this.status)
    //     if (this.readyState == 2 && this.status == 200) {
	// 		alert("Data deleted successfully");
    //         location.reload();
	// 	}
	// }

	fetch("http://localhost:2800/movie/" + id, {
        method: "DELETE"
	})
	.then((response) => {
		console.log(response)
		response.json()
		console.log(response)
		if (!response.ok) throw response
	})
	.then((data) => {
		console.log(data)
		alert("Data deleted successfully");
		location.reload();
	})
	.catch((error) => {
		console.log(JSON.stringify(error))
		console.log(error)
		console.log(error.message)
		alert("Error - Check the console for more information");
		location.reload();
	})
}
