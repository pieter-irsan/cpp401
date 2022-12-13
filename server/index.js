/*


TODO:

- Upload Movie file
  1. Press submit
  2. Wait for upload to finish
  3. Need loading indicator
  4. Then show alert when done / not done

- for user client, save video in advance on project directory

- user client use xhr while admin client use fetch api

- Forgot password feature (kayanya gaperlu kirim token lewat email...)

- Create single pgsql pool
  - pg_dump from bit.io

- After payment, display alert: "Your movie will be available on the My Movies page"


*/
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

const userAPI = require('./user/auth/api')
const ratingAPI = require('./user/rating/api');

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/resources', express.static('../client/resources'));
app.use('/media', express.static('media'));

// Client
app.use('/admin/auth', express.static('../client/admin/auth'));
app.use('/admin/home', verifyAdmin, express.static('../client/admin/index'));
app.use('/admin/movie', verifyAdmin, express.static('../client/admin/movie'));
app.use('/admin/transaction', verifyAdmin, express.static('../client/admin/transaction'));

app.use('/app', express.static('../client/user/app'));
app.use('/auth', express.static('../client/user/auth'));
app.use('/user', verifyUser, express.static('../client/user/user'));
app.use('/purchase', verifyUser, express.static('../client/user/transaction'));

// API
app.use('/admin', adminAPI);
app.use('/movie', movieAPI);

app.use('/auth', userAPI);
app.use('/transaction', transactionAPI);
app.use('/rating', ratingAPI);

app.get('/', (_, response) => response.redirect('/app'));

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
