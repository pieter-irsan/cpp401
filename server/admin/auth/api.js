const express = require('express');
const api = express.Router();
const auth = require('./auth');
const db = require('../../db');
const pool = db.getPool();

api.post('/login', function(request, response) {
    const { username, password } = request.body;
    pool.query(`select exists(select * from "user" where user_type = 'admin' and username = $1 and password = $2)`, [username, password], (error, result) => {
        const token = auth.signToken(username, 'admin')
        if (error) response.status(500).json({ error: error });
        if (!result.rows[0].exists) response.status(401).json({ loggedIn: result.rows[0].exists, token: null });
        else response.status(200).json({ loggedIn: result.rows[0].exists, token: token });
    });
});

module.exports = api;
