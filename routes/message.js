const router = require('express').Router();
const mysql = require('mysql');

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
    const { usersMessage, idUsersMessage } = req.body;
    let post = { usersMessage, idUsersMessage }
    let sql = 'INSERT INTO messages SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result)
    });
});

module.exports = router;