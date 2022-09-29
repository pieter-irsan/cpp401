function loadTable() {
    const req = new XMLHttpRequest();
    req.open("GET", "");
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let tableRow = ''; 
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                tableRow += `
                    <tr>
                        <td class="cell-pt">${object['title']}</td>
                        <td class="cell-pt">${object['director']}</td>
                        <td class="cell-pt text-start">${object['synopsis']}</td>
                        <td class="cell-pt">Rp ${object['price']}</td>
                        <td><img style="width:150px; height:auto;" src="${object['poster']}"></td>
                        <td class="container position-relative">
                            <div class="col position-absolute top-50 start-50 translate-middle">
                                <button class="btn btn-white border border-dark w-10 h-10 my-2" onclick="showUserEditBox(${object['id']})">
                                    <img src="../../../resources/icons/pencil-square.svg" alt="Edit">
                                </button>
                                <button class="btn btn-white border border-dark w-10 h-10 my-2" onclick="userDelete(${object['id']})">
                                    <img src="../../../resources/icons/trash.svg" alt="Delete">
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }
            document.getElementById("table").innerHTML = tableRow;
        }
    };
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
