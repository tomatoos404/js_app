const express = require('express');
const app = express();
 

app.use(express.static('public'));
app.use(express.json());

app.get('/login', (req, res) => {
  res.send('<h1>Bienvenue sur la page de login  </h1>');
});
 

app.get('/info', (req, res) => {
  res.json({ cle1: 'Toto', cle2: 'titi' });
});
 

app.post('/register', (req, res) => {
console.log('Données reçues pour l\'inscription');
console.log(req.body);
  res.json({ message: 'Inscription réussie !' });
});
 

app.listen(3000, () => {
  let monIp = require("ip").address();
  console.log(`Server running on http://${monIp}:3000`);
});