const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const UserAuthenController = require('./controllers/UserAuthenController');
const isAuthenController = require('./authen/isAuthenController');
const MedicineController = require('./controllers/MedicineController');
const multer = require("multer");
const fs = require('fs');

// upload section
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

let upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: File type not supported!", false);
        }
    }
}).array("userPhoto", 10);

module.exports = (app) => {
    app.get('/users', isAuthenController, UserController.index);
    app.get('/user/:userId', UserController.show);
    app.post('/user', UserController.create);
    app.put('/user/:userId', UserController.put);
    app.delete('/user/:userId', UserController.remove);
    app.post('/login', UserAuthenController.login);

    // Medicine routes
    app.post('/medicine', MedicineController.create);
    app.put('/medicine/:medicineId', MedicineController.put);
    app.delete('/medicine/:medicineId', MedicineController.remove);
    app.get('/medicine/:medicineId', MedicineController.show);
    app.get('/medicines', MedicineController.index);

    // upload
    app.post("/upload", upload, function (req, res) {
        if (req.files) {
            res.json({ message: "Files are uploaded", files: req.files });
        } else {
            res.status(400).json({ message: "No files were uploaded." });
        }
    });

    // delete file uploaded function
    app.post('/upload/delete', async function (req, res) {
        try {
            fs.unlink(process.cwd() + '/public/uploads/' + req.body.filename, (err) => {
                if (err) throw err;
                res.send("Delete successful");
            });
        } catch (err) {
            res.status(500).send({ error: 'An error has occurred trying to delete the file' });
        }
    });
};
