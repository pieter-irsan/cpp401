const params = (new URL(document.location)).searchParams;
const id = params.get("id");

function loadMovieStreamingPage(id) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/detail/" + id);
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const [object] = JSON.parse(this.responseText);

            document.getElementById("title").innerHTML = object['title']
            document.getElementById("videoPlayer").setAttribute('src', `/media/movie/${object['movie']}`);
        }
    }
}

loadMovieStreamingPage(id)
