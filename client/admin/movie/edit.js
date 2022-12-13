const params = (new URL(document.location)).searchParams;
const id = params.get("id");

async function editMovie() {
    const poster = document.getElementById('poster').files[0];
    const movie = document.getElementById('movie').files[0];

    let formData = new FormData(editForm);
    formData.set("title", document.getElementById("title").value);
    formData.set("director", document.getElementById("director").value);
    formData.set("synopsis", document.getElementById("synopsis").value);
    formData.set("price", document.getElementById("price").value);
    formData.set("trailer", document.getElementById("trailer").value);
    if (poster) formData.set("poster", poster, transformToFilename(title));
    if (movie) formData.set("movie", movie, transformToFilename(title));

    console.log(document.getElementById('poster').files[0])
    console.log(document.getElementById('movie').files[0])

    
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
        alert("Error - Check the console for more information");
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

function loadEditForm() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/detail/" + id);
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const [object] = JSON.parse(this.responseText);
            console.log(object)

            document.getElementById("title").value = `${object['title']}`;
            document.getElementById("posterFile").innerHTML = `<img style="width:150px; height:auto;" src="/media/poster/${object['poster']}">`
            document.getElementById("director").value = `${object['director']}`;
            document.getElementById("trailer").value = `${object['trailer']}`;
            document.getElementById("synopsis").innerHTML = `${object['synopsis']}`;
            document.getElementById("movieFile").innerHTML = `<video type="video/mp4" src="/media/movie/${object['movie']}" style="height: 15rem" controls controlsList="nodownload"></video>`;
            document.getElementById("price").value = `${object['price']}`;

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
            // document.getElementById("editForm").innerHTML = formData;
        }
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
        alert("Error - Check the console for more information");
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