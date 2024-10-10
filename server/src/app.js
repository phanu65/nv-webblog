const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');
const config = require('./config/config');

const app = express();

// ใช้งาน middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/assets', express.static('public'));

// นำเข้ารูท
require('./userPassport'); // หากมีการจัดการผู้ใช้
require('./routes')(app); // เรียกใช้ router ที่กำหนดไว้

const port = config.port || 3000; // ใช้พอร์ตจาก config หรือ 3000

// เชื่อมต่อกับฐานข้อมูลและเริ่มเซิร์ฟเวอร์
sequelize.sync({ force: false })
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });
