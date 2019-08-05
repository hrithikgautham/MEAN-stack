const express = require('express');
const Router = express.Router();
const { Employee } = require('../schemas/schema');

Router.route('/')
.get((req, res) => {
    Employee.find()
    .then(employees => {
        // const n = employees.length;
        let newEmployees = [];
        employees.forEach(employee => {
            newEmployees.push({
                _id: employee._id,
                name: employee.name,
                position: employee.position,
                office: employee.office,
                salary: employee.salary
            });
        })
        console.log("new Employees: ", newEmployees);
        res.json(newEmployees);
    })
    .catch(err => res.status(400).json('Error: ' + err));
})
.options((req, res) => {
    console.log("option request!");
    console.log("req.headers: ", req.headers);
    res.set('Access-Control-Allow-Origin', req.headers.origin);
    res.set('Access-Control-Allow-Method', 'GET, POST, OPTIONS');
    res.set('Access-Control-Max-Age', '86400');
    res.send();
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