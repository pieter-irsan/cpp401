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

api.get('/', function(request, response) {
    pool.query('select * from movie', (error, result) => {
        if (error) response.status(500).json({ error: `${error}` });
        else response.status(200).json(result.rows);
    })
});

api.get('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    pool.query('select * from movie where id = $1', [id], (error, result) => {
        if (error) response.status(500).json({ error: `${error}` });
        else response.status(200).json(result.rows);
    })
});

api.post('/', function(request, response) {
    const { name, password, age } = request.body;
    pool.query('insert into movie () values ()', [], (error, result) => {
        
        if (error) response.status(500).json({ error: `${error}` });
        else response.status(200).json(result.rows);
    })
});

api.put('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    const { name, password, age } = request.body;
    pool.query('update movie set column = $value where id = $value', [], (error, result) => {
        
        if (error) response.status(500).json({ error: `${error}` });
        else response.status(200).json(result.rows);
    })
});

api.delete('/:id', function(request, response) {
    const id = parseInt(request.params.id);
    pool.query('delete from movie where id = $1', [id], (error, result) => {
        
        if (error) response.status(500).json({ error: `${error}` })
        else response.status(200).json(result.rows);
    })
});

module.exports = api;
