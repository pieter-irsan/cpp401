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
    destination: (request, file, path) => {
        console.log(`file: ${JSON.stringify(file)}`)
        if (file.fieldname == 'poster') path(null, 'TEST-POSTER/')
        if (file.fieldname == 'movie') path(null, 'TEST-MOVIE/')
    },
    filename: (request, file, filename) => {
        // console.log(`request.body: ${JSON.stringify(request.body)}`)
        let name = ''
        if (file.mimetype == 'image/jpeg') name = file.originalname + '-poster.jpg'
        if (file.mimetype == 'video/mp4') name = file.originalname + '-movie.mp4'
        filename(null, name
        // slugify(request.body.title, {
        //     replacement: '-',
        //     remove: /[<>/\\|?*+~.()'"!:@]/g,
        //     lower: true
        // })
        )
    }
})
const upload = multer({ storage: storage })
const fieldName = [{ name: 'poster' }, { name: 'movie' }]

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

api.put('/:id', upload.fields(fieldName), function(request, response) {
    const id = parseInt(request.params.id);
    const { title, director, synopsis, price, trailer } = request.body;
    console.log(`main request.header: ${JSON.stringify(request.headers)}`)
    console.log(`main request.body: ${JSON.stringify(request.body)}`)
    console.log(`main request.files: ${JSON.stringify(request.files)}`)
    console.log(`files['poster'][0]: ${request.files['poster'][0]}`)
    console.log(`files['poster']: ${request.files['poster']}`)
    const posterFilename = request.files['poster'][0];
    const movieFilename = request.files['movie'][1];

    pool.query('update movie set title = $2, director = $3, synopsis = $4, price = $5, poster = $6, trailer = $7, movie = $8 where id = 0', [id, title, director, synopsis, price, posterFilename, trailer, movieFilename], (error, result) => {
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
