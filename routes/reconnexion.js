const router = require('express').Router();
const mysql = require('mysql');
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopmodulecommun'
});

// Insertion pour mes requêtes d'inscription

router.get('/', async (req, res) => {
    const { token } = req.headers;
    const { id } = await jwt.verify(token, process.env.SECRET)
    let sql = 'SELECT * FROM users WHERE id = ?';
    let query = db.query(sql, [id], async (err, result) => {
    if(err) throw err;
    if(result.length > 0) {
        res.json({
            success: true,
            user: {
                userName: result[0].usersName,
                userFirstName: result[0].usersFirstName,
                userMail: result[0].usersMails,
                userId: result[0].id
            }
        })
        } else {
            res.json({
                success: false
            })
        }
    });
});



module.exports = router;