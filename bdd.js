const express = require('express');
const mysql = require('mysql');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopmodulecommun'
});

// Connexion 
db.connect((err) => {
  if(err) {
    throw err;
  }
  console.log('MySql Connected...')
})

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE shopmodulecommun';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('DataBase created...')
  })
})

// Create table
app.get('/createpostable', (req, res) => {
  let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('POST table created...')
  });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
  let post = {title: 'Post One', body:'This is post number one'}
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('POST one aded')
  });
});

// Insert post 2
app.get('/addpost3', (req, res) => {
  let post = {title: 'Post Three', body:'This is post number three'}
  let sql = 'INSERT INTO posts SET ?';
  let query = db.query(sql, post, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('POST one aded')
  });
});

// Select post
app.get('/getposts', (req, res) => {
  let sql = 'SELECT * FROM posts';
  let query = db.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.send('POST fecthed...')
  });
});

// Select single post
app.get('/getposts/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('POST fecthed...')
  });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('POST update...')
  });
});

// Delete post 
app.get('/deletepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('POST delete...')
  });
});



app.listen('3000'), () => {
  console.log('server sur le port 3000');
}