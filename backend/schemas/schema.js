const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Employee = new Schema({
    name: { type: String, required: true },
    position: { type: String, required: true },
    office: { type: String },
    salary: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = { Employee: mongoose.model('Employee', Employee) };
