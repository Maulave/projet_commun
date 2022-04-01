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

// Récupération pour mes requêtes de connexion
router.post('/', (req, res) => {
    const { usersMails, usersPassword } = req.body;
    let sql = 'SELECT * FROM users WHERE usersMails= ?';
    let query = db.query(sql, [usersMails], async (err, result) => {
        if(err) throw err;
        if(result.length > 0) {
            const verified = bcrypt.compareSync(usersPassword, result[0].usersPassword);
            if(verified) {
                const token = await jwt.sign({id: result[0].id}, process.env.SECRET)
                res.json({
                    success: true,
                    token: token,
                    user: {
                        userName: result[0].usersName,
                        userFirstName: result[0].usersFirtName,
                        userMail: result[0].usersMails,
                        userId: result[0].id
                    }
                })
            } else {
                res.json({
                    success: false
                })
            }
        } else {
            res.json({
                success: false
            })
        }
    });
});



module.exports = router;