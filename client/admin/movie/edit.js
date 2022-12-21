const params = (new URL(document.location)).searchParams;
const id = params.get("id");

async function editMovie() {
    const toast = new bootstrap.Toast(document.getElementById('toast'), { autohide: false })
    toast.show()

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
