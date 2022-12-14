const express = require('express');
const api = express.Router();
const multer  = require('multer')
const slugify = require('slugify');
const auth = require('../../admin/auth/auth');
const db = require('../../db');
const pool = db.getPool();

const storage = multer.diskStorage({
    destination: (request, file, setDestination) => {
        if (file.fieldname == 'poster') setDestination(null, 'media/poster/')
        if (file.fieldname == 'movie') setDestination(null, 'media/movie/')
    },
    filename: (request, file, setFilename) => {
        let fileName = slugify(request.body.title, {
            replacement: '-',
            remove: /[<>/\\|?*+~.()'"!:@$^&]/g,
            lower: true
        })
        if (file.mimetype == 'image/jpeg') fileName += '-poster.jpg';
        if (file.mimetype == 'video/mp4') fileName += '-movie.mp4';
        setFilename(null, fileName)
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

api.post('/', upload.fields(fieldName), function(request, response) {
    let { title, director, synopsis, price, poster, trailer, movie } = request.body;
    if (Object.keys(request.files).length > 0) {
        poster = request.files.poster[0].filename;
        movie = request.files.movie[0].filename;
    }
    pool.query(`insert into movie (title, director, synopsis, price, poster, trailer, movie) values ($1, $2, $3, $4, ${poster ? '$5' : 'null'}, $6, ${movie ? '$7' : 'null'})`, [title, director, synopsis, price, poster, trailer, movie], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows)
    });
});

api.put('/:id', upload.fields(fieldName), function(request, response) {
    const id = parseInt(request.params.id);
    let { title, director, synopsis, price, poster, trailer, movie } = request.body;
    if (typeof request.files.poster != 'undefined' && Object.keys(request.files.poster).length > 0) {
        poster = request.files.poster[0].filename;
    }
    if (typeof request.files.movie != 'undefined' && Object.keys(request.files.movie).length > 0) {
        movie = request.files.movie[0].filename;
    }
    
    console.log(`update movie set title = $2, director = $3, synopsis = $4, price = $5, poster = ${(poster) ? '$6' : 'poster'}, trailer = $7, movie = ${(movie) ? '$8' : 'movie'} where id = $1 returning $6, $8`)
    pool.query(`update movie set title = $2, director = $3, synopsis = $4, price = $5, poster = ${(poster) ? '$6' : 'poster'}, trailer = $7, movie = ${(movie) ? '$8' : 'movie'} where id = $1 returning $6, $8`, [id, title, director, synopsis, price, poster, trailer, movie], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows)
    });
});

api.delete('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    pool.query('delete from movie where id = $1', [id], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows)
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
