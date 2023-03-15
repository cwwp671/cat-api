const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// set up multer for file uploads
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cats', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// create a schema for the cat model
const catSchema = new mongoose.Schema({
    name: String,
    image: String
});

// create the cat model
const Cat = mongoose.model('Cat', catSchema);

app.use(cors());

// define the routes
app.post('/cats', upload.single('catImage'), async (req, res) => {
    const cat = new Cat({
        name: req.body.name,
        image: req.file.path
    });
    try {
        await cat.save();
        res.send(cat);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

app.get('/cats', async (req, res) => {
    try {
        const cats = await Cat.find();
        res.send(cats);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
