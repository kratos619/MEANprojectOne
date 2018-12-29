const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const users = require('./routes/users');
// add connection file
const config = require('./config/database');
// parse application/x-www-form-urlencoded
const app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));
// parse application/json
app.use(bodyParser.json());
mongoose.connect(config.database);
//check to see successfull connection
mongoose.connection.on('connected', () => {
    console.log('connected to db');
});
//check to see error connection
mongoose.connection.once('error', (err) => {
    console.log(err);
});
const port = 4040;

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use('/users', users);

//set static folder
app.use(express.static(path.join(__dirname, 'public')));



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/', (req, res) => {
    res.send('index');
})
app.get('*', (req, res) => {
    res.send(path.join(__dirname, 'public/index.html'));
});
app.listen(port, () => {
    console.log("app running on http://localhost:4040/");
})