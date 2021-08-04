'use strict';

const dnaSchema = require('./DnaSchema')

const save = conn => newDna =>{
    const DNA = conn.model('DNA', dnaSchema, 'dna');
    const dna = new DNA()
}