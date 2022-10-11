function loadTable() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/");
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let tableRow = ''; 
            const objects = JSON.parse(this.responseText);                                                                      console.log(this.responseText)
            for (let object of objects) {
                tableRow += `
                    <tr>
                        <td class="cell-pt">${object['title']}</td>
                        <td class="cell-pt">${object['director']}</td>
                        <td class="cell-pt text-start">${object['synopsis']}</td>
                        <td class="cell-pt">Rp ${object['price'].toLocaleString()}</td>
                        <td><img style="width:150px; height:auto;" src="${object['poster']}"></td>
                        <td class="container position-relative">
                            <div class="col position-absolute top-50 start-50 translate-middle">
                                <button class="btn btn-white border border-dark w-10 h-10 my-2" onclick="loadEditForm(${object['id']})">
                                    <img src="../../../resources/icons/pencil-square.svg" alt="Edit">
                                </button>
                                <button class="btn btn-white border border-dark w-10 h-10 my-2" onclick="deleteMovie(${object['id']})">
                                    <img src="../../../resources/icons/trash.svg" alt="Delete">
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }
            document.getElementById("tableData").innerHTML = tableRow;
        }
    };
}

function loadEditForm(id) {
    location.href = 'file:///C:/Users/piete/Documents/Projects/cpp401/client/admin/movie/edit.html?id=' + id;

    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/" + id);
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
                        <input id="title" value="${movie['title']}" class="form-control border border-dark" required>
                    </div>
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Poster</label>
                        <input id="poster" value="${movie['poster']}" class="form-control border border-dark" required>
                        <!-- <input id="poster" value="${movie['poster']}" class="form-control border border-dark" type="file" required> -->
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Director</label>
                        <input id="director" value="${movie['director']}" class="form-control border border-dark" required>
                    </div>
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Trailer</label>
                        <input id="trailer" value="${movie['trailer']}" class="form-control border border-dark" required>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Synopsis</label>
                        <textarea id="synopsis" class="form-control border border-dark" required>${movie['synopsis']}</textarea>
                    </div>
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Movie</label>
                        <input id="movie" value="${movie['movie']}" class="form-control border border-dark" required>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-3 mx-5 my-2">
                        <label class="control-label">Price (Rp)</label>
                        <input id="price" value="${movie['price']}" class="form-control border border-dark" type="number" min="0" required>
                    </div>
                    <div class="col-3 mx-5 my-2">
                    </div>
                </div>

                <div class="row justify-content-center mt-5">
                    <button class="col-1 btn btn-white border border-dark mx-3" onclick="location.href='file:///C:/Users/piete/Documents/Projects/cpp401/client/admin/movie/index.html'">Back</button>
                    <button class="col-1 btn btn-white border border-dark mx-3" type="submit">Save</button>
                </div>
            `
            document.getElementById("form").innerHTML = formData;
        }
    };
}

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

loadTable();

// Alternative format
// tableRow += '<tr>'; 
// tableRow += '<td class="cell-pt">' + object['title'] + '</td>';
// tableRow += '<td class="cell-pt">' + object['director'] + '</td>';
// tableRow += '<td class="cell-pt" class="text-start">' + object['synopsis'] + '</td>';
// tableRow += '<td class="cell-pt">Rp ' + object['price'] + '</td>';
// tableRow += '<td><img style="width:150px; height:auto;" src="' + object['poster'] + '"></td>';
// tableRow += '<td class="container position-relative">';
// tableRow += '<div class="col position-absolute top-50 start-50 translate-middle">';
// tableRow += '<button class="btn btn-white border border-dark w-10 h-10 my-2" onclick="showUserEditBox(' + object['id'] + ')">'; 
// tableRow += '<img src="../../../icons/pencil-square.svg" alt="Edit">';
// tableRow += '</button>';
// tableRow += '<button class="btn btn-white border border-dark w-10 h-10 my-2" onclick="userDelete(' + object['id'] + ')">';
// tableRow += '<img src="../../../icons/trash.svg" alt="Delete">';
// tableRow += '</button>';
// tableRow += '</div>';
// tableRow += '</td>';
// tableRow += '</tr>';
