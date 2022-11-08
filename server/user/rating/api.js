const express = require('express');
const api = express.Router();
const auth = require('../../admin/auth/auth');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'online_cinema',
    password: '123',
    port: 5432
});

api.get('/:movieid', function(request, response) {
    const id = parseInt(request.params.movieid);
    let username = ''
    if (request.cookies.token) [username, _] = auth.verifyToken(request.cookies.token);

    pool.query("select * from rating where title = (select title from movie where id = $1) and username != $2", [id, username], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows)
    });
});

api.get('/:movieid/user', function(request, response) {
    const id = parseInt(request.params.movieid);
    let username = ''
    if (request.cookies.token) [username, _] = auth.verifyToken(request.cookies.token);
    else return response.status(403);
    
    pool.query("select * from rating where title = (select title from movie where id = $1) and username = $2", [id, username], (error, result) => {
        if (error) response.status(500).json({ error: error });
        if (result.rowCount < 1) response.status(404);
        else response.status(200).json(result.rows);
    });
});

api.post('/:movieid', function(request, response) {
    const { rating, review } = request.body;
    const id = parseInt(request.params.movieid);
    let username = ''
    if (request.cookies.token) [username, _] = auth.verifyToken(request.cookies.token);
    else return response.status(403);

    pool.query('insert into rating (username, title, rating, review) values ($2, (select title from movie where id = $1), $3, $4)', [id, username, rating, review], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.put('/:movieid', function(request, response) {
    const { rating, review } = request.body;
    const id = parseInt(request.params.movieid);
    let username = ''
    if (request.cookies.token) [username, _] = auth.verifyToken(request.cookies.token);
    else return response.status(403);

    pool.query('update rating set rating = $3, review = $4 where title = (select title from movie where id = $1) and username = $2', [id, username, rating, review], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.delete('/:movieid', function(request, response) {
    const id = parseInt(request.params.movieid);
    let username = ''
    if (request.cookies.token) [username, _] = auth.verifyToken(request.cookies.token);
    else return response.status(403);

    pool.query("delete from rating where title = (select title from movie where id = $1) and username = $2", [id, username], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows)
    });
});

module.exports = api;
