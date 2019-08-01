const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());

//connect to mongoDB
const pwd = 'mean';
mongoose.connect(`mongodb+srv://hrithik:${pwd}@cluster0-4lblr.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true
});
//create connection instance
const connection = mongoose.connection;
//listen for 'open' event
connection.once('open', () => {
    console.log("Successfully connected to database");
});

const EmployeeRoute = require('./routes/employee.routes');
app.use('/emps', EmployeeRoute);

app.listen(5000, () => {
    console.log('listening on port 5000...');
});