'use strict';
const mongoose = require('mongoose');
const {getConnection} = require('./dbConnection');
const DB_URL = "mongodb://localhost:27017/meli"
const dnaStorage = require('./dnaStorage')
module.exports = () => {
    const connection = getConnection(mongoose,DB_URL, {})
    return dnaStorage(connection)
}

