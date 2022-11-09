const params = (new URL(document.location)).searchParams;
const id = params.get("id");

function ratingToStar(rating) {
    if (rating == 1) return "⭐"
    if (rating == 2) return "⭐⭐"
    if (rating == 3) return "⭐⭐⭐"
    if (rating == 4) return "⭐⭐⭐⭐"
    if (rating == 5) return "⭐⭐⭐⭐⭐"
}

function starToRating(star) {
    if (star == "⭐") return 1
    if (star == "⭐⭐") return 2
    if (star == "⭐⭐⭐") return 3
    if (star == "⭐⭐⭐⭐") return 4
    if (star == "⭐⭐⭐⭐⭐") return 5
}

function loadMovieDetailsPage(id) {
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
                    <h4 id="movieTitle" class=""><b>${object['title']}</b></h4>
                    <h5 class="">${object['director']}</h5>
                    <h4 id="titleRating" class="mb-3">${object['rating']} ⭐</h4>
                    <div class="input-group justify-content-center">
                        <span class="input-group-text border border-dark bg-white">Rp ${object['price'].toLocaleString()}</span>
                        <button type="button" onclick="" class="btn btn-white border border-dark">Buy Now</button>
                    </div>
                </div>
                <div class="offset-md-1 col-md-8">
                    <p class="fs-5 mb-1"><b>Synopsis</b></p>
                    <hr class="mt-0" />
                    <p class="fs-6 mb-1">${object['synopsis']}</p>
                    <p class="fs-5 mb-1 mt-2"><b>Trailer</b></p>
                    <hr class="mt-0" />
                    <div class="row justify-content-center">
                        <div class="col-auto ratio ratio-16x9" style="width:95%">
                            <iframe src="${object['trailer']}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById("movieDetails").innerHTML = movieDetails;
            if (object['rating'] == null) {
                document.getElementById("titleRating").innerHTML = `<span class="text-muted fs-6">Not yet rated<span>`
            }
        }
    }
}

function loadMovieRatings(id) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/rating/" + id);
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let ratingData = '';
            const objects = JSON.parse(this.responseText);
            console.log(objects)
            for (let object of objects) {
                ratingData += `
                    <div class="col-12 mx-1 mb-1">
                        <div class="row mb-1 mb-1">
                            <span class="col-6 fs-5 text-start">${object['username']}</span>
                            <span class="col-6 fs-5 text-end">${object['rating']} ⭐&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </div>
                        <p>${object['review']}</p>
                    </div>
                    <hr />
                `;
            }
            document.getElementById("ratingRow").insertAdjacentHTML('beforeend', ratingData);
        }
    }
}

function loadMyRating(id) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/rating/" + id + "/user");
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const [object] = JSON.parse(this.responseText);
            console.log(object)
            const myRating = `
            <div id="myRating" class="col-12 mx-1 mb-1">

                <div class="row mb-1">
                    <span class="col-6 fs-5 text-start">${object['username']}</span>
                    <span id="ratingData" class="col-6 fs-5 text-end">
                        ${object['rating']} ⭐
                        <button id="popover" type="button" class="btn btn-white border border-white p-0" data-bs-toggle="popover" data-bs-html="true" data-bs-placement="right" 
                        data-bs-content="
                            <div class='row px-2 text-center py-0'>
                                <span style='cursor: pointer' class='my-1' onclick='loadEditRatingForm(${id})'>Edit</span>
                                <hr class='my-1' />
                                <span style='cursor: pointer' class='my-1' onclick='deleteRating()'>Delete</span>
                            </div>
                        ">
                                <img class="d-flex justify-content-center" src="/resources/icons/three-dots-vertical.svg" alt="Menu">
                            </button>
                        </button>
                    </span>
                </div>
                <p id="reviewData" >${object['review']}</p>

            </div>
            <hr id="myRatingSeparator" />
            `;
            document.getElementById("ratingForm").style.display = 'none';
            document.getElementById("ratingRow").insertAdjacentHTML('afterbegin', myRating);
            
            const popover = new bootstrap.Popover(document.getElementById("popover"), { trigger: 'focus' });
        }
    }
}

function loadEditRatingForm(id) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/rating/" + id + "/user");
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const [object] = JSON.parse(this.responseText);
            console.log(object)
            const ratingForm = `
                <form class="row justify-content-center px-5 mt-3 mb-4" action="javascript:void(0)" onsubmit="editRating()">
                    <h1 id="rating" class="text-center mb-4">${ratingToStar(object['rating'])}</h1>
                    <textarea id="review" class="border border-dark form-control text-center w-75 py-4-half mb-3" maxlength="300" placeholder="Write your review here..." required>${object['review']}</textarea>
                    <button class="border border-dark btn btn-white w-75" type="submit">Submit</button>
                </form>
            `;
            document.getElementById("myRating").style.display = 'none';
            document.getElementById("myRatingSeparator").style.display = 'none';
            document.getElementById("ratingForm").style.display = 'block';
            document.getElementById("ratingForm").innerHTML = ratingForm;
        }
    }
}

function addRating() {
	const star = document.getElementById("rating").innerHTML;
    const rating = starToRating(star);
	const review = document.getElementById("review").value;

	const req = new XMLHttpRequest();
	req.open("POST", "http://localhost:2800/rating/" + id);
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({ 
		"rating": rating, 
		"review": review
	}));

	req.onreadystatechange = function() {
		console.log(this.readyState, this.status)
        if (this.readyState == 4 && this.status == 200) {
			alert("Rating added successfully");
			location.reload();
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

function editRating() {
    const star = document.getElementById("rating").innerHTML;
    const rating = starToRating(star);
	const review = document.getElementById("review").value;
		
	const req = new XMLHttpRequest();
	req.open("PUT", "http://localhost:2800/rating/" + id);
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({ 
		"rating": rating, 
		"review": review
	}));

    req.onreadystatechange = function() {
        console.log(this.readyState, this.status)
        if (this.readyState == 4 && this.status == 200) {
			alert("Rating edited successfully");
			location.reload();
		}
        else if (this.readyState == 4 && this.status == 403) {
			alert("You have to log in first!");
			return location.href = '/auth/login.html';
        }
	}
}

function deleteRating() {
    const req = new XMLHttpRequest();
	req.open("DELETE", "http://localhost:2800/rating/" + id);
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send();

    req.onreadystatechange = function() {
        console.log(this.readyState, this.status)
        if (this.readyState == 2 && this.status == 200) {
			alert("Rating deleted successfully");
            location.reload();
		}
        else if (this.readyState == 4 && this.status == 403) {
			alert("You have to log in first!");
			return location.href = '/auth/login.html';
        }
	}
}

function inputRatingStar() {
    
}

loadMovieDetailsPage(id);

loadMovieRatings(id);

if (getCookie('token') != null) {
    loadMyRating(id);
}

// if (isEmptyOrWhitespace(document.getElementById("ratingRow").innerHTML)) {
//     document.getElementById("ratingRow").innerHTML = `
//         <div class="row mt-2 d-flex justify-content-center">
//             <span class="col-12 fs-6 text-center text-muted">No reviews yet...</span>
//         </div>
//     `
// }
