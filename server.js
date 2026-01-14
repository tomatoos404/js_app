const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.send('Hello, World!');
});


app.post('/register', (req, res) => {
    res.send('merci de manger votre chien');
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

