const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// User routes
app.get('/users', (req, res) => {
    res.send('All Users');
});

app.get('/user/:userId', (req, res) => {
    res.send('User Details: ' + req.params.userId);
});

app.post('/user', (req, res) => {
    res.send('User Created: ' + JSON.stringify(req.body));
});

app.put('/user/:userId', (req, res) => {
    res.send('User Updated: ' + req.params.userId + ' with data: ' + JSON.stringify(req.body));
});

app.delete('/user/:userId', (req, res) => {
    res.send('User Deleted: ' + req.params.userId);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});