const params = (new URL(document.location)).searchParams;
const keyword = params.get("keyword");

function loadSearchTable(keyword) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/search?keyword=" + keyword);
    req.send();
    req.onreadystatechange = function() {
        (this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            let tableRow = ''; 
            const objects = JSON.parse(this.responseText);
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
                                <button class="btn btn-white border border-dark w-10 h-10 my-2" onclick="location.href='file:///C:/Users/piete/Documents/Projects/cpp401/client/admin/movie/edit.html?id=${object['id']}'">
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
            document.getElementById("tableSearchData").innerHTML = tableRow;
        }
    }
}

function searchMovie() {
    location.href = 'file:///C:/Users/piete/Documents/Projects/cpp401/client/admin/movie/search.html?keyword=' + document.getElementById("searchKeyword").value;
}

loadSearchTable(keyword);
