const express = require("express");
const Joi = require('joi');
const logger = require('./logger');
const app = express();

app.set('view engine', 'pug');

app.set('views', './views');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(logger);

if( app.get('env') === 'development' ) {
    console.log('Development environment');
}

var data = [
    {
        id: 1,
        name: "course1"
    },
    {
        id: 2,
        name: "course2"
    },
    {
        id: 3,
        name: "course3"
    }
]

app.get('/', (request, response) => {
    response.render('index', { title: 'Express app ', message: 'Hey there' });
});

app.get('/api/courses', (request, response) => {
    response.send(data);
});

app.post('/api/courses', ( request, response ) => {
    const { error } = validateInput(request.body);
    if( error ) {
        return response.status(400).send(result.error.details[0].message);
    }
    const course = {
        id: data.length + 1,
        name: request.body.name
    };
    data.push(course);
    response.send(data);
});

app.put('/api/courses/:id', ( request, response ) => {

    const course = data.find( c => c.id === parseInt( request.params.id ));
    if( !course ) {
        return response.status(400).send("Course id is not valid");
    }
    const { error } = validateInput(request.body);
    if( error ) {
        response.status(400).send(result.error.details[0].message);
        return;
    }
    course.name = request.body.name;
    response.send(course);
});

app.delete('/api/courses/:id', ( request, response ) => {
    const course = data.find( c => c.id === parseInt( request.params.id ));
    if( !course ) {
        return response.status(400).send("Course id is not valid");
    }
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    response.send(course);
});

function validateInput(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate( course, schema); 
}

app.get('/api/courses/:id', (request, response) => {
    const course = data.find( c => c.id === parseInt( request.params.id ));
    if( !course ) {
        return response.status(404).send("The course id is not valid");
    } else {
        return response.send( course );
    }
});

// setting system port or 5000 port
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));