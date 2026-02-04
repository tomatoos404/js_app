const express = require('express');
const app = express();
const mysql = require('mysql2');
const ip = require("ip"); 

const connection = mysql.createConnection({
    host: '172.29.18.111',
    user: 'jsServer',
    password: 'jsServer',
    database: 'testjs'
});

connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la BDD :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});

app.use(express.static('public')); 
app.use(express.json());


app.get('/users', (req, res) => {
    connection.query('SELECT * FROM User', (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
});

app.get('/info', (req, res) => {
    res.json({ cle1: 'Toto', cle2: 'titi' });
});

app.post('/register', (req, res) => {
    const { inputValue, inputValue2 } = req.body;
    connection.query(
        'INSERT INTO User (login, password) VALUES (?, ?)',
        [inputValue, inputValue2],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Erreur serveur' });
                return;
            }
            res.json({ message: 'Inscription réussie !', userId: results.insertId });
        }
    );
});

app.post('/voter', (req, res) => {
    const { userId, voteValue } = req.body;
    
    connection.query(
        'INSERT INTO Voter (id_user, vote) VALUES (?, ?)',
        [userId, voteValue],
        (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Erreur serveur ou vote déjà existant' });
                return;
            }
            res.json({ message: 'Vote enregistré !', voteId: results.insertId });
        }
    );
});

app.get('/votes-count', (req, res) => {
    const sql = `
        SELECT User.login, Voter.vote 
        FROM User 
        JOIN Voter ON User.id = Voter.id_user 
        ORDER BY User.login
    `;
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Erreur serveur' });
            return;
        }
        res.json(results);
    });
});

app.post('/connexion', (req, res) => {
    const { login, password } = req.body;
    connection.query('SELECT * FROM User WHERE login = ? AND password = ?', [login, password], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erreur serveur' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: 'Identifiants invalides' });
            return;
        }
        res.json({ message: 'Connexion réussie !', User: results[0] });
    });
});

app.post('/connexionId', (req, res) => {
    const { userId } = req.body;
    connection.query('SELECT id, login FROM User WHERE id = ?', [userId], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erreur serveur' });
            return;
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Utilisateur introuvable' });
        }
    });
});

app.listen(3000, () => {
    let monIp = ip.address();
    console.log(`Server running on http://${monIp}:3000`);
});