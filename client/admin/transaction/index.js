function loadTransactionTable() {
    fetch("http://localhost:2800/transaction/")
    .then((response) => {
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        
        response.json()
        .then((data) => {
            let tableRow = "";
            let dateTime = ""
            for (let item of data) {
                dateTime = new Date(item.timestamp)
                tableRow += `
                    <tr> 
                        <td class="py-3">${item.id}</td>
                        <td class="py-3">${item.username}</td>
                        <td class="py-3">${item.title}</td>
                        <td class="py-3">Rp ${item.price.toLocaleString()}</td>
                        <td class="py-3">${dateTime.toLocaleString()}</td>
                    </tr>
                `;
            }
            document.getElementById("transactionTable").innerHTML = tableRow;
        })
    })
    .catch((error) => {
        alert("500 — Internal Server Error");
        location.reload();
    })
}

loadTransactionTable();
