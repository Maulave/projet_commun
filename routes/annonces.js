const router = require('express').Router();
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'shopmodulecommun'
});


// Création de mes routes pour requêtes d'annonces
router.post('/', async (req, res) => {
    const { annonceCategory } = req.body

    if (annonceCategory === 'Cable'){
        let sql = 'SELECT * FROM annoncesearcharticles WHERE annonceCategory= ?';
        let query = db.query(sql, [annonceCategory], async (err, results) => {
            if(err) throw err;
            if(results.length > 0) {
                res.json(results)
            } else {
                res.json({
                    success: false
                })
            }
        });
    } else if (annonceCategory === undefined || 'All') {
        let sql = 'SELECT * FROM  annoncesearcharticles';
        let query = db.query(sql, (err, results) => {
            if(err) throw err;
            if(results.length > 0) {
                res.json(results)
            } else {
                res.json({
                    success: false
                })
            }
        });
    }
})

router.post('/price', (req, res) => {
    console.log(req.body)
    const { usersMessage, priceAnnonceMessage, idUsersMessage, idUsersSend, idAnnonceSend } = req.body;
    let post = { usersMessage, priceAnnonceMessage, idUsersMessage, idUsersSend, idAnnonceSend }
    let sql = 'INSERT INTO messages SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.json(result)
    });
});


module.exports = router;