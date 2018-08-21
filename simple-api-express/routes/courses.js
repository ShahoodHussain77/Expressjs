const express = require('express');
const router = express.Router();

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

router.get('/', (request, response) => {
    response.send(data);
});

router.post('/', ( request, response ) => {
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

router.put('/:id', ( request, response ) => {

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

router.delete('/:id', ( request, response ) => {
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

router.get('/:id', (request, response) => {
    const course = data.find( c => c.id === parseInt( request.params.id ));
    if( !course ) {
        return response.status(404).send("The course id is not valid");
    } else {
        return response.send( course );
    }
});

module.exports = router;