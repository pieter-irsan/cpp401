const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'apiadmin',
    host: 'localhost',
    database: 'users',
    password: '123',
    port: 5432
});
/** ============================================================= */
var apiv1 = express.Router();

apiv1.get('/', function(req, res) {
  res.send('Hello from APIv1 root route.');
});

apiv1.get('/users', function(req, res) {
  res.send('List of APIv1 users.');
});

module.exports = apiv1;
/** ============================================================= */
const getAllUser = async (request, response) => {
    pool.query('SELECT * FROM users ORDER BY age ASC', (error, results) => {
        response.status(200).json(results.rows);
    })
};

const getUserById = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        response.status(200).json(results.rows);
    })
};

const addUser = async (request, response) => {
    const { name, password, age } = request.body;
    pool.query('INSERT INTO users (name, password, age) VALUES ($1, $2, $3)', [name, password, age], (error, results) => {
        response.status(201).send(`User added successfully.`);
    })
};

const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, password, age } = request.body;
    pool.query('UPDATE users SET name = $1, password = $2, age = $3 WHERE id = $4', [name, password, age, id], (error, results) => {
        response.status(200).send(`User updated successfully.`);
    })
};

const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        response.status(200).send(`User deleted successfully.`);
    })
};

module.exports = {
    getAllUser,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};
