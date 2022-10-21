const params = (new URL(document.location)).searchParams;
const keyword = params.get("keyword");

function loadTransactionSearchTable(keyword) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/transaction/search?keyword=" + keyword);
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
            document.getElementById("transactionSearchTable").innerHTML = tableRow;
        }
    }
}

function searchTransaction() {
    location.href = '/admin/transaction/search.html?keyword=' + document.getElementById("searchKeyword").value;
}

function loadTotalRevenue() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/transaction/total");
    req.send();
    req.onreadystatechange = function() {
        console.log(this.responseText);
        if (this.readyState == 4 && this.status == 200) {
            const [objects] = JSON.parse(this.responseText);
            document.getElementById("totalRevenueInfo").textContent = 'Total Revenue: Rp ' + objects['sum'];
        }
    };
}

loadTransactionSearchTable(keyword);
loadTotalRevenue()
