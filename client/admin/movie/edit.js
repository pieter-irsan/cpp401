const params = (new URL(document.location)).searchParams;
const id = params.get("id");

async function editMovie() {
    const poster = document.getElementById('poster').files[0];
    const movie = document.getElementById('movie').files[0];
    const formData = new FormData(editForm);

    formData.set("title", document.getElementById("title").value);
    formData.set("director", document.getElementById("director").value);
    formData.set("synopsis", document.getElementById("synopsis").value);
    formData.set("price", document.getElementById("price").value);
    formData.set("trailer", document.getElementById("trailer").value);
    if (poster) formData.set("poster", poster, transformToFilename(title));
    if (movie) formData.set("movie", movie, transformToFilename(title));

    fetch("http://localhost:2800/movie/" + id, {
        method: "PUT",
        body: formData
    })
    .then((response) => {
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        
        alert("Data updated successfully");
        return location.href = '/admin/movie/index.html';
    })
    .catch((error) => {
        alert("500 — Internal Server Error");
        location.reload();
    })
}

function loadEditForm() {
    fetch("http://localhost:2800/movie/detail/" + id, {
        method: "GET"
    })
    .then((response) => {
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        
        response.json()
        .then((data) => {
            document.getElementById("title").value = `${data[0].title}`;
            document.getElementById("director").value = `${data[0].director}`;
            document.getElementById("trailer").value = `${data[0].trailer}`;
            document.getElementById("synopsis").innerHTML = `${data[0].synopsis}`;
            document.getElementById("price").value = `${data[0].price}`;
            if (data[0].poster) {
                document.getElementById("poster").style.display = "none";
                document.getElementById("posterExist").style.display = "flex";
            }
            if (data[0].movie) {
                document.getElementById("movie").style.display = "none";
                document.getElementById("movieExist").style.display = "flex";
            }
        })
    })
    .catch((error) => {
        alert("500 — Internal Server Error");
        location.reload();
    })
}

function loadUploadButton(type) {
    if (type == "poster") {
        document.getElementById("poster").style.display = "block";
        document.getElementById("posterExist").style.display = "none";
    }
    if (type == "movie") {
        document.getElementById("movie").style.display = "block";
        document.getElementById("movieExist").style.display = "none";
    }
}

loadEditForm();


/*

const params = (new URL(document.location)).searchParams;
const id = params.get("id");

// document.getElementById('editForm').action = "/movie/" + id;

async function editMovie() {
    // const poster = document.getElementById('poster').files[0];
    // const movie = document.getElementById('movie').files[0];

    let formData = new FormData(editForm);
    formData.set("title", document.getElementById("title").value);
    formData.set("director", document.getElementById("director").value);
    formData.set("synopsis", document.getElementById("synopsis").value);
    formData.set("price", document.getElementById("price").value);
    formData.set("trailer", document.getElementById("trailer").value);
    // if (poster) formData.set("poster", poster, transformToFilename(title));
    // if (movie) formData.set("movie", movie, transformToFilename(title));
    
    // console.log(document.getElementById('poster').files[0])
    // console.log(document.getElementById('movie').files[0])

    fetch("http://localhost:2800/movie/" + id, {
        method: "PUT",
        body: formData
    })
    .then((response) => {
		console.log(response)
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        response.json()
    })
    .then((data) => {
        console.log(data)
        alert("Data updated successfully");
		return location.href = '/admin/movie/index.html';
    })
    .catch((error) => {
        console.log(error)
        alert("500 — Internal Server Error");
        location.reload();
    })

    // const title = document.getElementById("title").value;
	// const director = document.getElementById("director").value;
	// const synopsis = document.getElementById("synopsis").value;
	// const price = document.getElementById("price").value;
	// const poster = document.getElementById("poster").value;
	// const trailer = document.getElementById("trailer").value;
	// const movie = document.getElementById("movie").value;
		
	// const req = new XMLHttpRequest();
	// req.open("PUT", "http://localhost:2800/movie/" + id);
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
    //     console.log(this.readyState, this.status)
    //     if (this.readyState == 4 && this.status == 200) {
	// 		alert("Data updated successfully");
	// 		location.href = '/admin/movie/index.html';
	// 	}
	// }
}

function editMovieFile() {
    const poster = document.getElementById('poster').files[0];
    const movie = document.getElementById('movie').files[0];

    let formData = new FormData(editForm);
    // formData.set("title", document.getElementById("title").value);
    // formData.set("director", document.getElementById("director").value);
    // formData.set("synopsis", document.getElementById("synopsis").value);
    // formData.set("price", document.getElementById("price").value);
    // formData.set("trailer", document.getElementById("trailer").value);
    if (poster) formData.set("poster", poster, transformToFilename(title));
    if (movie) formData.set("movie", movie, transformToFilename(title));

    fetch("http://localhost:2800/movie/file/" + id, {
        method: "PUT",
        body: formData
    })
    .then((response) => {
		console.log(response)
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        response.json()
    })
    .then((data) => {
        console.log(data)
        alert("File updated successfully");
    })
    .catch((error) => {
        console.log(error)
        alert("Failed to update file");
    })
}

function loadEditForm() {
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
                        <input id="poster" type="file" class="form-control border border-dark" accept="image/jpeg">
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
                        <input id="movie" type="file" class="form-control border border-dark" accept="video/mp4">
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
                    <button class="col-1 btn btn-white border border-dark mx-3" type="button" onclick="location.href='/admin/movie/index.html'">Back</button>
                    <button class="col-1 btn btn-white border border-dark mx-3" type="submit">Save</button>
                </div>
            `
            document.getElementById("editForm").innerHTML = formData;
        }
    }
}

loadEditForm();


*/