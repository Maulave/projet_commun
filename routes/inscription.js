const router = require('express').Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopmodulecommun'
});

// Insertion pour mes requêtes d'inscription
router.post('/', (req, res) => {
    console.log(req.body)
    const { usersName, usersFirstName, usersMails, usersPassword } = req.body;
    const passwordHash = bcrypt.hashSync(usersPassword, 10);
    let post = { usersName, usersFirstName, usersMails, usersPassword: passwordHash }
    let sql = 'INSERT INTO users SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result)
    });
});

module.exports = router;