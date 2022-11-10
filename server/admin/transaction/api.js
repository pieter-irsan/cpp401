const express = require('express');
const api = express.Router();
const auth = require('../auth/auth');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'online_cinema',
    password: '123',
    port: 5432
});

api.get('/', function(_, response) {
    pool.query('select * from transaction order by id desc', (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.get('/detail/:id', function(request, response) {
    const id = parseInt(request.params.id);
    pool.query('select * from transaction where id = $1', [id], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.post('/', function(request, response) {
    const { title, price } = request.body;
    let username = ''
    if (request.cookies.token) [username, _] = auth.verifyToken(request.cookies.token);
    else return response.status(403).end();
    pool.query('insert into transaction (username, title, price, timestamp) values ($1, $2, $3, now())', [username, title, price], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.put('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    const { username, title, price, timestamp } = request.body;
    pool.query('update transaction set username = $2, title = $3, price = $4, timestamp = $5 where id = $1', [id, username, title, price, timestamp], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.delete('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    pool.query('delete from transaction where id = $1', [id], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

api.get('/search', function(request, response) {
    const keyword = request.query.keyword;
    pool.query("select * from transaction where username ilike '%'||$1||'%' or title ilike '%'||$1||'%'", [keyword], (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows)
    });
});

api.get('/total', function(_, response) {
    pool.query('select sum(price) from transaction', (error, result) => {
        if (error) response.status(500).json({ error: error });
        else response.status(200).json(result.rows);
    });
});

module.exports = api;
