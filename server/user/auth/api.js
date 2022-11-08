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

api.post('/register', function(request, response) {
    const { username, email, password } = request.body;
    pool.query(`insert into "user" (username, email, password, user_type) values ($1, $2, $3, 'user')`, [username, email, password], (error, result) => {
        if (error) {
            if (error.detail.includes('exists')) return response.status(409).end();
            else response.status(500).json({ error: error });
        }
        else response.status(200).end();
    });
});

api.post('/login', function(request, response) {
    const { username, password } = request.body;
    pool.query(`select exists(select * from "user" where user_type = 'user' and username = $1 and password = $2)`, [username, password], (error, result) => {
        const token = auth.signToken(username, 'user');
        if (error) response.status(500).json({ error: error });
        if (!result.rows[0].exists) response.status(401).json({ loggedIn: result.rows[0].exists, token: null });
        else response.status(200).json({ loggedIn: result.rows[0].exists, token: token });
    });
});

module.exports = api;
