'use strict';
const mongoose = require('mongoose');
const {getConnection} = require('./dbConnection');
const DB_URL = "mongodb://172.17.0.1:27017/meli"
const dnaStorage = require('./dnaStorage')
module.exports = async () => {
    const connection = await getConnection(mongoose,DB_URL, {useNewUrlParser: true})
    return dnaStorage(connection)
}

