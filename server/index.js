const cors = require('cors');
const express = require('express');
const app = express();
const port = 2800;

const corsOptions = {
   origin: '*', 
   credentials: true,
   optionSuccessStatus: 200,
}

const movieAPI = require('./admin/movie/api');
// const transactionAPI = require('./admin/transaction/api');

app.use(cors(corsOptions))
app.use(express.json());

app.use('/movie', movieAPI);
// app.use('/transaction', transactionAPI);

app.get('/', (request, response) => response.send('Online Cinema API'));

app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}.`);
});

// app.get('/users/', api.getAllUser);
// app.get('/users/:id', api.getUserById);
// app.post('/users/', api.addUser);
// app.put('/users/:id', api.updateUser);
// app.delete('/users/:id', api.deleteUser);