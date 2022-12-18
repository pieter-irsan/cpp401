function loadMovieTable() {
    fetch("http://localhost:2800/movie/", {
        method: "GET"
    })
    .then((response) => {
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        
        response.json()
        .then((data) => {
            let tableRow = "";
            for (let item of data) {
                tableRow += `
                    <tr>
                        <td class="cell-pt">${item.title}</td>
                        <td class="cell-pt">${item.director}</td>
                        <td class="cell-pt text-start">${item.synopsis}</td>
                        <td class="cell-pt">Rp ${item.price.toLocaleString()}</td>
                        <td><img style="width:150px; height:auto;" src="/media/poster/${item.poster}"></td>
                        <td class="container position-relative">
                            <div class="col position-absolute top-50 start-50 translate-middle">
                                <button class="btn btn-white border border-dark theme-edit w-10 h-10 my-2" onclick="location.href='/admin/movie/edit.html?id=${item.id}'">
                                    <img src="/resources/icons/pencil-square.svg" alt="Edit">
                                </button>
                                <button class="btn btn-white border border-dark theme-delete w-10 h-10 my-2" onclick="deleteMovie(${item.id})">
                                    <img src="/resources/icons/trash.svg" alt="Delete">
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }
            document.getElementById("movieTable").innerHTML = tableRow;
        })
    })
    .catch((error) => {
        alert("500 — Internal Server Error");
        location.reload();
    })
}

loadMovieTable();
