const params = (new URL(document.location)).searchParams;
const keyword = params.get("keyword");

function loadTransactionSearchTable(keyword) {
    fetch("http://localhost:2800/transaction/search?keyword=" + keyword)
    .then((response) => {
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        
        response.json()
        .then((data) => {
            let tableRow = "";
            for (let item of data) {
                tableRow += `
                    <tr> 
                        <td class="py-3">${item.id}</td>
                        <td class="py-3">${item.username}</td>
                        <td class="py-3">${item.title}</td>
                        <td class="py-3">Rp ${item.price.toLocaleString()}</td>
                        <td class="py-3">${item.timestamp.toLocaleString()}</td>
                    </tr>
                `;
            }
            document.getElementById("transactionSearchTable").innerHTML = tableRow;
        })
    })
    .catch((error) => {
        alert("500 — Internal Server Error");
        location.reload();
    })
}

function loadTotalRevenue() {
    fetch("http://localhost:2800/transaction/total/")
    .then((response) => {
		if (!response.ok) return response.text().then(text => { throw new Error(text) })
        
        response.json()
        .then((data) => {
            document.getElementById("totalRevenueInfo").textContent = `Total Revenue: Rp ${data[0].sum.toLocaleString()}`;
        })
    })
    .catch((error) => {
        alert("500 — Internal Server Error");
        location.reload();
    })
}

function searchTransaction() {
    location.href = '/admin/transaction/search.html?keyword=' + document.getElementById("searchKeyword").value;
}

if (keyword) document.getElementById("searchKeyword").value = keyword;

loadTransactionSearchTable(keyword);
loadTotalRevenue();
