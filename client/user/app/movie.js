const params = (new URL(document.location)).searchParams;
const id = params.get("id");

function editMovie() {
    const title = document.getElementById("title").value;
	const director = document.getElementById("director").value;
	const synopsis = document.getElementById("synopsis").value;
	const price = document.getElementById("price").value;
	const poster = document.getElementById("poster").value;
	const trailer = document.getElementById("trailer").value;
	const movie = document.getElementById("movie").value;
		
	const req = new XMLHttpRequest();
	req.open("PUT", "http://localhost:2800/movie/" + id);
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({ 
		"title": title, 
		"director": director, 
		"synopsis": synopsis, 
		"price": price, 
		"poster": poster, 
		"trailer": trailer, 
		"movie": movie
	}));

    req.onreadystatechange = function() {
        console.log(this.readyState, this.status)
        if (this.readyState == 4 && this.status == 200) {
			alert("Data updated successfully");
			location.href = '/admin/movie/index.html';
		}
	}
}

function loadEditForm(id) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/detail/" + id);
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const [object] = JSON.parse(this.responseText);
            console.log(object)
            const movieDetails = `
                <div class="col-md-3 text-center">
                    <img src="${object['poster']}" style="width:95%" />
                    <h4 class=""><b>${object['title']}</b></h4>
                    <h5 class="">${object['director']}</h5>
                    <h4 class="mb-3">5.0 ⭐</h4>
                    <div class="input-group justify-content-center">
                        <span class="input-group-text border border-dark bg-white">Rp ${object['price'].toLocaleString()}</span>
                        <button type="submit" class="btn btn-white border border-dark">Buy Now</button>
                    </div>
                </div>
                <div class="offset-md-1 col-md-8">
                    <p class="fs-5 mb-1"><b>Synopsis</b></p>
                    <p class="fs-6 mb-1">${object['synopsis']}</p>
                    <p class="fs-5 mb-1 mt-2"><b>Trailer</b></p>
                    <div class="row justify-content-center">
                        <div class="col-auto ratio ratio-16x9" style="width:95%"> <!-- ; height:275px; -->
                            <iframe src="${object['trailer']}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            `
            document.getElementById("movieDetails").innerHTML = movieDetails;
        }
    }
}

loadEditForm(id);
