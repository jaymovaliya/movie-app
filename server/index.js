const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
dotenv.config();

const movies = require('./api/movies');
const users = require('./api/users');
const auth = require('./middleware/auth');

const port = process.env.PORT || 3001;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = require('http').createServer(app);
server.listen(port);

app.use(express.static(path.join(__dirname, '../build')));

(async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log("connected to databse....")

        app.use('/movies', auth, movies());
        app.use('/user', users());

    } catch (e) {
        console.log('Cannot connect to database');
        console.log(e);
        process.exit(1);
    }
})();

module.exports = app;