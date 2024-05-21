const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    work_year: Number,
    experience_level: Number,
    employment_type: Number,
    job_title: Number,
    salary: Number,
    salary_currency: String,
    salary_in_usd: Number,
    employee_residence: String,
    remote_ratio: Number,
    company_location: String,
    company_size: String,
});

const Data = mongoose.model('floqer', dataSchema)

module.exports = Data