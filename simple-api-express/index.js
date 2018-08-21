const express = require("express");
const Joi = require('joi');
const logger = require('./logger');
const app = express();
const courses = require('./routes/courses');

app.set('view engine', 'pug');

app.set('views', './views');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(logger);

app.use('/api/courses', courses);

if( app.get('env') === 'development' ) {
    console.log('Development environment');
}

app.get('/', (request, response) => {
    response.render('index', { title: 'Express app ', message: 'Hey there' });
});


// setting system port or 5000 port
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));