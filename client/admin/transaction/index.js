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
                        <td class="py-3">${object['id']}</td>
                        <td class="py-3">${object['username']}</td>
                        <td class="py-3">${object['title']}</td>
                        <td class="py-3">Rp ${object['price']}</td>
                        <td class="py-3">Convert to human format: ${object['timestamp']}</td>
                    </tr>
                `;
            }
            document.getElementById("table").innerHTML = tableRow;
        }
    };
}

loadTable();
