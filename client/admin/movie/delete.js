function deleteMovie(id) {
    const req = new XMLHttpRequest();
	req.open("DELETE", "http://localhost:2800/movie/" + id);
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send();

    req.onreadystatechange = function() {
        console.log(this.readyState, this.status)
        if (this.readyState == 2 && this.status == 200) {
			alert("Data deleted successfully");
            location.reload();
		}
	}
}
