function showUserEditBox(id) {
    console.log(id);
    const req = new XMLHttpRequest();
    req.open("GET", "" + id);
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let formData = '';
            const objects = JSON.parse(this.responseText);
            const movie = objects['movie'];
            console.log(movie);
            formData = `
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Title</label>
                        <input id="title" value="${movie['title']}" class="form-control border border-dark">
                    </div>
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Poster</label>
                        <input id="poster" value="${movie['poster']}" class="form-control border border-dark" type="file">
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Director</label>
                        <input id="director" ${movie['directory']} class="form-control border border-dark">
                    </div>
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Trailer</label>
                        <input id="trailer" ${movie['trailer']} class="form-control border border-dark">
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Synopsis</label>
                        <textarea id="synopsis" ${movie['synopsis']} class="form-control border border-dark"></textarea>
                    </div>
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Movie</label>
                        <input id="movie" ${movie['movie']} class="form-control border border-dark" type="file">
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Price</label>
                        <input id="price" ${movie['price']} class="form-control border border-dark">
                    </div>
                    <div class="col-3 mx-5 my-2">
                    </div>
                </div>
            `
            document.getElementById("table").innerHTML = tableRow;
        }
    };
}

function movieEdit() {
    const title = document.getElementById("title").value;
	const director = document.getElementById("poster").value;
	const synopsis = document.getElementById("synopsis").value;
	const price = document.getElementById("price").value;
	const poster = document.getElementById("poster").value;
	const trailer = document.getElementById("trailer").value;
	const movie = document.getElementById("movie").value;
		
	const req = new XMLHttpRequest();
	req.open("PUT", "");
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