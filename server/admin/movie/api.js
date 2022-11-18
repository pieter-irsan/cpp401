const express = require('express');
const api = express.Router();
const multer  = require('multer')
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
    if (request.files[0].fieldname == 'poster') path(null, 'TEST-POSTER/')
    if (request.files[1].fieldname == 'movie') path(null, 'TEST-MOVIE/')
  },
  filename: (request, file, filename) => {
    filename(null, request.body.title)
  }
})
const upload = multer({ storage: storage })

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

api.put('/:id', upload.any(), function(request, response) {
    const id = parseInt(request.params.id);
    const { title, director, synopsis, price, trailer } = request.body;
    console.log(req.files)
    console.log(req.files[0].filename)
    console.log(req.files[0].originalname)
    const posterFilename = req.files[0];
    const movieFilename = req.files[1];

    pool.query('update movie set title = $2, director = $3, synopsis = $4, price = $5, poster = $6, trailer = $7, movie = $8 where id = $1', [id, title, director, synopsis, price, posterFilename, trailer, movieFilename], (error, result) => {
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
