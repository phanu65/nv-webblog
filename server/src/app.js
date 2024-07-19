const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./route')(app);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});