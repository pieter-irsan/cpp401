require('dotenv').config();
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const { verifyAdmin, verifyUser } = require('./admin/auth/auth');
const port = 2800;

const corsOptions = {
   origin: '*', 
   credentials: true,
   optionSuccessStatus: 200,
}

const adminAPI = require('./admin/auth/api');
const movieAPI = require('./admin/movie/api');
const transactionAPI = require('./admin/transaction/api');
const ratingAPI = require('./admin/rating/api');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/resources', express.static('../client/resources'));

// Client
app.use('/admin/home', verifyAdmin, express.static('../client/admin/index'));
app.use('/admin/auth', express.static('../client/admin/auth'));
app.use('/admin/movie', verifyAdmin, express.static('../client/admin/movie'));
app.use('/admin/transaction', verifyAdmin, express.static('../client/admin/transaction'));

app.use('/app', express.static('../client/user/app'));
// app.use('/???', verifyUser, express.static('../client/user/???'));
app.use('/auth', express.static('../client/user/auth'));

// API
app.use('/admin', adminAPI);
app.use('/movie', movieAPI);

app.use('/transaction', transactionAPI);
app.use('/rating', ratingAPI);

app.get('/', (_, response) => response.send('Online Cinema API'));

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
