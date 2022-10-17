const express = require('express');
const api = express.Router();
const jwt = require('jsonwebtoken');

const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'admin',
    host: 'localhost',
    database: 'online_cinema',
    password: '123',
    port: 5432
});

api.post('/login', function(request, response) {
    const { username, password } = request.body;
    pool.query(`select exists(select * from "user" where user_type = 'admin' and username = $1 and password = $2)`, [username, password], (error, result) => {
        jwt.sign({
            username: username,
            password: password
        }, jwtSecret)
        if (error) response.status(500).json({ error: error });
        else if (!result.rows[0].exists) response.status(401).json(result.rows[0].exists);
        else response.status(200).json(result.rows);
    });
});

module.exports = api;
