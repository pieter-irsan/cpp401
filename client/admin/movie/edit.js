const params = (new URL(document.location)).searchParams;
const id = params.get("id");

document.getElementById('editForm').action = "/movie/" + id;

function editMovie() {

    // enctype="multipart/form-data"

    const title = document.getElementById("title").value;
	const director = document.getElementById("director").value;
	const synopsis = document.getElementById("synopsis").value;
	const price = document.getElementById("price").value;
	const poster = document.getElementById("poster").value;
	const trailer = document.getElementById("trailer").value;
	const movie = document.getElementById("movie").value;
		
	const req = new XMLHttpRequest();
	req.open("PUT", "http://localhost:2800/movie/" + id);
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

    req.onreadystatechange = function() {
        console.log(this.readyState, this.status)
        if (this.readyState == 4 && this.status == 200) {
			alert("Data updated successfully");
			location.href = '/admin/movie/index.html';
		}
	}
}

function loadEditForm(id) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/detail/" + id);
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const [object] = JSON.parse(this.responseText);
            console.log(object)
            const formData = `
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Title</label>
                        <input id="title" value="${object['title']}" class="form-control border border-dark" required>
                    </div>
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Poster</label>
                        <input id="poster" type="file" class="form-control border border-dark" required>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Director</label>
                        <input id="director" value="${object['director']}" class="form-control border border-dark" required>
                    </div>
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Trailer</label>
                        <input id="trailer" value="${object['trailer']}" class="form-control border border-dark" required>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Synopsis</label>
                        <textarea id="synopsis" class="form-control border border-dark" maxlength="300" required>${object['synopsis']}</textarea>
                    </div>
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Movie</label>
                        <input id="movie" type="file" class="form-control border border-dark" required>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Price (Rp)</label>
                        <input id="price" value="${object['price']}" class="form-control border border-dark" type="number" min="0" required>
                    </div>
                    <div class="col-3 mx-5 my-2">
                    </div>
                </div>

                <div class="row justify-content-center mt-5">
                    <button class="col-1 btn btn-white border border-dark mx-3" onclick="location.href='/admin/movie/index.html'">Back</button>
                    <button class="col-1 btn btn-white border border-dark mx-3" type="submit">Save</button>
                </div>
            `
            document.getElementById("editForm").innerHTML = formData;
        }
    }
}

loadEditForm(id);
