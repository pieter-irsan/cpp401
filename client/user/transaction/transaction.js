const params = (new URL(document.location)).searchParams;
const id = params.get("id");

function loadTransactionDetailsPage(id) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/detail/" + id);
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const [object] = JSON.parse(this.responseText);
            console.log(object)

            document.getElementById("title").innerHTML = `${object['title']}`;
            document.getElementById("price").innerHTML = `${object['price']}`;
            document.getElementById("poster").setAttribute('src', object['poster']);
        }
    }
}

function addTransaction() {
	const title = document.getElementById("title").innerHTML;
    const price = document.getElementById("price").innerHTML;

	const req = new XMLHttpRequest();
	req.open("POST", "http://localhost:2800/transaction");
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({ 
		"title": title, 
		"price": price
	}));

	req.onreadystatechange = function() {
		console.log(this.readyState, this.status)
        if (this.readyState == 4 && this.status == 200) {
			alert("Transaction successful");
			return location.href = '/app/index.html';
		}
        else if (this.readyState == 4 && this.status == 403) {
			alert("You have to log in first!");
			return location.href = '/auth/login.html';
        }
        else if (this.readyState == 4 && this.status == 500) {
            alert("Something went wrong!");
            location.reload();
        }
	}
}

loadTransactionDetailsPage(id);
