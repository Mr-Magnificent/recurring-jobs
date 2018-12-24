const express = require('express');
const app = express();
const db = require('./database');
const Recurring = require('./recurringController');

app.use(express.static('./public'));

app.get('/date', (req, res) => {
    console.log(req.query);
    Recurring.insert(req.query);
    res.sendStatus(200);
})

app.listen(5000);