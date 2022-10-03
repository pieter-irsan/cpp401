const express = require('express');
const api = require('./api');
const app = express();
const port = 5000;

app.use(express.json());

app.listen(port, () => {
    console.log(`User database app is running on port ${port}.`);
});

app.get('/users/', api.getAllUser);
app.get('/users/:id', api.getUserById);
app.post('/users/', api.addUser);
app.put('/users/:id', api.updateUser);
app.delete('/users/:id', api.deleteUser);

/** ============================================================= */
app.use('/api/v1', require('./controllers/api_v1'));
app.use('/api/v2', require('./controllers/api_v2'));

app.get('/', function(req, res) {
  res.send('Hello from root route.')
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}