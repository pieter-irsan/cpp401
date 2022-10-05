const express = require('express');
const app = express();
const port = 2800;

const movieAPI = require('C:/Users/piete/Documents/Projects/cpp401/server/admin/transaction/api');
// const transactionAPI = require('./server/admin/transaction/api');

app.use(express.json());

app.use('/movie', movieAPI);
// app.use('/transaction', transactionAPI);

app.get('/', (request, response) => response.send('Online Cinema API'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});

// app.get('/users/', api.getAllUser);
// app.get('/users/:id', api.getUserById);
// app.post('/users/', api.addUser);
// app.put('/users/:id', api.updateUser);
// app.delete('/users/:id', api.deleteUser);