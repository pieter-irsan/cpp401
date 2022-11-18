const params = (new URL(document.location)).searchParams;
const id = params.get("id");

function loadMovieStreamingPage(id) {
    const req = new XMLHttpRequest();
    req.open("GET", "http://localhost:2800/movie/detail/" + id);
    req.send();
    req.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const [object] = JSON.parse(this.responseText);
            console.log(object)

            document.getElementById("title").innerHTML = object['title']
            document.getElementById("videoPlayer").setAttribute('src', 'http://127.0.0.1:8887/stock_earth.mp4');
        }
    }
}

loadMovieStreamingPage(id)
