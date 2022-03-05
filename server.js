// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes/routes')
require('dotenv').config()
const Port =process.env.Port || 5000;

// Initialsed the imports
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json());

// Creating routes
app.use('/', routes);


// Creating DataBase
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB is connected"))
.catch((err) => console.log(err));


// Creating Server

app.listen(Port, () => {
    console.log(`Server Started at Port ${Port}`)
});