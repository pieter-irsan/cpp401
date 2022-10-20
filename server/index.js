require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const { verifyToken } = require('./admin/auth/auth');
const port = 2800;

const corsOptions = {
   origin: '*', 
   credentials: true,
   optionSuccessStatus: 200,
}

const adminAPI = require('./admin/auth/api');
const movieAPI = require('./admin/movie/api');
const transactionAPI = require('./admin/transaction/api');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/resources', verifyToken, express.static('../resources'));

// Client
app.use('/admin/home', verifyToken, express.static('../client/admin/index'));
app.use('/admin/auth', express.static('../client/admin/auth'));
app.use('/admin/movie', verifyToken, express.static('../client/admin/movie'));
app.use('/admin/transaction', verifyToken, express.static('../client/admin/transaction'));

// API
app.use('/admin', adminAPI);
app.use('/movie', movieAPI);
app.use('/transaction', transactionAPI);

app.get('/', (_, response) => response.send('Online Cinema API'));

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
