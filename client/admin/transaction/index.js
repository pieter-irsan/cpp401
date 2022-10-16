function loadTransactionTable() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/transaction/");
    req.send();
    req.onreadystatechange = function() {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            let tableRow = ''; 
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                tableRow += `
                    <tr> 
                        <td class="py-3">${object['id']}</td>
                        <td class="py-3">${object['username']}</td>
                        <td class="py-3">${object['title']}</td>
                        <td class="py-3">Rp ${object['price']}</td>
                        <td class="py-3">${object['timestamp']}</td>
                    </tr>
                `;
            }
            document.getElementById("transactionTable").innerHTML = tableRow;
        }
    };
}

loadTransactionTable();
