const express = require("express");

const app = express();

const Joi = require('joi');

app.use(express.json());

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
    response.send('Hitting root api');
});

app.get('/api/courses', (request, response) => {
    response.send(data);
});

app.post('/api/courses', ( request, response ) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const  result = Joi.validate( request.body, schema);
    if( result.error ) {
        response.status(400).send(result.error.details[0].message);
        return;
    }
    const course = {
        id: data.length + 1,
        name: request.body.name
    };
    data.push(course);
    response.send(data);
});

app.get('/api/courses/:id', (request, response) => {
    const course = data.find( c => c.id === parseInt( request.params.id ));
    if( !course ) {
        response.status(404).send("The course id is not valid");
    } else {
        response.send( course );
    }
});

// setting system port or 5000 port
const port = process.env.port || 5000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));