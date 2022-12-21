function loadPurchasedMovies() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/purchased");
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let movieCard = ''; 
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                movieCard += `
                    <div class="col-3">
                        <div class="card shadow-sm" style="cursor: pointer" onclick="location.href='/user/watch.html?id=${object['id']}'">
                            <div class="card-body text-center">
                                    <img src="/media/poster/${object['poster']}" style="height:275px;" class="card-img-top w-100 py-1" />
                                <h6 class="card-title mb-0 mt-1 text-truncate">${object['title']}</h5>
                                <span class="card-subtitle text-muted fs-7">Rp ${object['price'].toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
            document.getElementById("cardRows").innerHTML = movieCard;
        }
        else if (this.readyState == 4 && this.status == 403) {
			alert("You have to log in first!");
			return location.href = '/auth/login.html';
        }
    }
}

loadPurchasedMovies();
