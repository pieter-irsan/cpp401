function loadMovies() {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/");
    req.send();
    req.onreadystatechange = function() {
        console.log(this.responseText)
        if (this.readyState == 4 && this.status == 200) {
            let movieCard = ''; 
            const objects = JSON.parse(this.responseText);
            for (let object of objects) {
                movieCard += `
                    <div class="col-3">
                        <div class="card shadow-sm" style="cursor: pointer" onclick="location.href='/app/movie.html?id=${object['id']}'">
                            <div class="card-body text-center">
                                    <img src="${object['poster']}" style="width:auto; height:275px;" class="card-img-top w-100 py-1" />
                                <h6 class="card-title mb-0 mt-1 text-truncate">${object['title']}</h5>
                                <span class="card-subtitle text-muted fs-7">Rp ${object['price'].toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                `;
            }
            document.getElementById("cardRows").innerHTML = movieCard;
        }
    }
}

loadMovies();
