const express = require('express');
const Router = express.Router();
const { Employee } = require('../schemas/schema');

Router.get('/', (req, res) => {
    Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});
    
Router.post('/add', (req, res) => {
    const name = req.body.name;
    const position = req.body.position;
    const office = req.body.office;
    const salary = req.body.salary;
    const newEmployee = new Employee({
        name,
        position,
        office,
        salary
    });
    newEmployee.save()
    .then(() => res.status(201).json('Saved successfully!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

Router.route('/:id')
    .get((req, res) => {
        Employee.findById(req.params.id)
        .then(employee => res.json(employee))
        .catch(err => res.status(400).json('Error: ' + err));
    });

Router.post('/update/:id', (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const position = req.body.position;
    const office = req.body.office;
    const salary = req.body.salary;
    if(!name || !position || !office || !salary || !id){
        res.status(400).json('insufficient parameters');
        res.end();
    }
    Employee.findById(id)
    .then(employee => {
        employee.name = name;
        employee.position = position;
        employee.office = office;
        employee.salary = salary;
        employee.save()
        .then(() => res.status(201).json('Succesfully Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = Router;