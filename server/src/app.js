let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

require('./route')(app);

let port = process.env.PORT || config.port

sequelize.sync({ force: false })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('Unable to sync database:', err);
    });