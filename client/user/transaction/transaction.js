const params = (new URL(document.location)).searchParams;
const id = params.get("id");

function loadTransactionDetailsPage(id) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/detail/" + id);
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const [object] = JSON.parse(this.responseText);

            document.getElementById("title").innerHTML = `${object['title']}`;
            document.getElementById("price").innerHTML = `Rp <span id="priceAmount">${object['price'].toLocaleString()}</span>`;
            document.getElementById("poster").setAttribute('src', `/media/poster/${object['poster']}`);
        }
    }
}

function addTransaction() {
	const title = document.getElementById("title").innerHTML;
    const price = document.getElementById("priceAmount").innerHTML;

	const req = new XMLHttpRequest();
	req.open("POST", "http://localhost:2800/transaction/");
    req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify({ 
		"title": title, 
		"price": price
	}));

	req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
			alert("Transaction successful! Your movie will be available on the My Movies page");
			return location.href = '/app/index.html';
		}
        else if (this.readyState == 4 && this.status == 403) {
			alert("You have to log in first!");
			return location.href = '/auth/login.html';
        }
        else if (this.readyState == 4 && this.status == 500) {
            alert("500 — Internal Server Error");
            location.reload();
        }
	}
}

loadTransactionDetailsPage(id);
