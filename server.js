const express = require('express');
const exphbs = require("express-handlebars")
const path = require('path');
require('./models/db');


// Instatiations

const app = express();
const port = 3000;

// import Router file
const musicianController = require('./controllers/musiciansController');

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.use('/musicians', musicianController);

app.listen(port, () => {
    console.log('Express server connected at port:3000');
});
