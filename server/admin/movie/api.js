const express = require('express');
const api = express.Router();
const multer  = require('multer')
const slugify = require('slugify');
const auth = require('../../admin/auth/auth');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'online_cinema',
    password: '123',
    port: 5432
});

const storage = multer.diskStorage({
    destination: (request, file, setDestination) => {
        console.log(`file: ${JSON.stringify(file)}`)
        if (file.fieldname == 'poster') setDestination(null, 'media/poster/')
        if (file.fieldname == 'movie') setDestination(null, 'media/movie/')
    },
    filename: (request, file, setFilename) => {
        // console.log(`request.body.title: ${JSON.stringify(request.body.title)}`)
        let fileName = slugify(request.body.title, {
            replacement: '-',
            remove: /[<>/\\|?*+~.()'"!:@$^&]/g,
            lower: true
        })
        if (file.mimetype == 'image/jpeg') fileName += '-poster.jpg';
        if (file.mimetype == 'video/mp4') fileName += '-movie.mp4';
        console.log(`fileName: ${fileName}`)
        setFilename(null, fileName)
    }
})
const upload = multer({ storage: storage })
// const fieldName = [{ name: 'poster' }, { name: 'movie' }]

api.get('/', function(_, response) {
    pool.query('select * from movie order by id desc', (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.get('/detail/:id', function(request, response) {
    const id = parseInt(request.params.id);
    pool.query('select *, (select avg(rating)::numeric(1) as rating from rating where title = movie.title) from movie where id = $1', [id], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.post('/', function(request, response) {
    const { title, director, synopsis, price, poster, trailer, movie } = request.body;
    pool.query('insert into movie (title, director, synopsis, price, poster, trailer, movie) values ($1, $2, $3, $4, $5, $6, $7)', [title, director, synopsis, price, poster, trailer, movie], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});
// .fields(fieldName)
api.put('/:id', upload.any(), function(request, response) {
    const id = parseInt(request.params.id);
    let { title, director, synopsis, price, trailer, poster, movie } = request.body;
    console.log(`request.header: ${JSON.stringify(request.headers)}`)
    console.log(`request.body: ${JSON.stringify(request.body)}`)
    console.log(`request.files: ${JSON.stringify(request.files)}`)
    console.log(`Object.keys(request.files).length: ${Object.keys(request.files).length}`)
    if (Object.keys(request.files).length > 0) {
        // poster = request.files.poster[0].filename;
        // movie = request.files['movie'][0].filename;
        poster = request.files[0].filename
        movie = request.files[1].filename
        console.log(`request.files[0].filename: ${JSON.stringify(request.files[0].filename)}`)
        console.log(`request.files[1].filename: ${JSON.stringify(request.files[1].filename)}`)
    }

console.log(id, title, director, synopsis, price, poster, trailer, movie)
    pool.query(`update movie set title = $2, director = $3, synopsis = $4, price = $5, poster = ${poster ? '$6' : 'poster'}, trailer = $7, movie = ${movie ? '$7' : 'movie'} where id = 0`, [id, title, director, synopsis, price, poster, trailer, movie], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.delete('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    pool.query('delete from movie where id = $1', [id], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.get('/search', function(request, response) {
    const keyword = request.query.keyword;
    pool.query("select * from movie where title ilike '%'||$1||'%' or director ilike '%'||$1||'%'", [keyword], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows)
    });
});

api.get('/purchased', function(request, response) {
    if (request.cookies.token) [username, _] = auth.verifyToken(request.cookies.token);
    else return response.status(403);

    pool.query("select * from movie where title in (select title from transaction where username = $1 and (now() - timestamp) < '48 hours'::interval);", [username], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows)
    });
});

module.exports = api;
