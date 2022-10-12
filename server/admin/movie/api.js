const express = require('express');
const api = express.Router();

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'online_cinema',
    password: '123',
    port: 5432
});

api.get('/', function(_, response) {
    pool.query('select * from movie order by id desc', (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.get('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    pool.query('select * from movie where id = $1', [id], (error, result) => {
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

api.put('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    const { title, director, synopsis, price, poster, trailer, movie } = request.body;
    pool.query('update movie set title = $2, director = $3, synopsis = $4, price = $5, poster = $6, trailer = $7, movie = $8 where id = $1', [id, title, director, synopsis, price, poster, trailer, movie], (error, result) => {
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

// api.get('/search', function(request, response) {
//     const keyword = request.query;
//     console.log(keyword); console.log(request.query)
//     pool.query("select * from movie where title ilike '%$1%' or director ilike '%$1%'", [keyword], (error, result) => {
//         if (error) response.status(500).json({ error: error });
//         else response.status(200).json(result.rows)
//     });
// });

module.exports = api;
