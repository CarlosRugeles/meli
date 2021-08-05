'use strict'
const Schema = require('mongoose').Schema

const schema = new Schema({
    dna: Object,
    isMutant: Boolean
});
schema.virtual("id").get(function (){
    return this._id.toHexString();
})
module.exports = schema