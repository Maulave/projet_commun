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
    const { usersMessage, idUsersMessage, idUsersSend, idAnnonceSend } = req.body;
    let post = { usersMessage, idUsersMessage, idUsersSend, idAnnonceSend }
    let sql = 'INSERT INTO messages SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result)
    });
});

// Récupération des messages du User en fonction de l'annonce et du user
router.get('/', async (req, res) => {
    console.log(req.headers)
    const { idannoncesend } = req.headers
    const { idusersmessage } = req.headers
    const { idsendmessage } = req.headers
    let sql = "SELECT * FROM messages WHERE idAnnonceSend= ? AND idUsersMessage IN(?,?)";
    let query = db.query(sql, [idannoncesend, idusersmessage, idsendmessage], async (err, result) => {
    if(err) throw err;
    console.log(result)
    if(result.length > 0) {
        res.json({
            success: true,
            result
        })
        } else {
            res.json({
                success: false
            })
        }
    });
});

module.exports = router;