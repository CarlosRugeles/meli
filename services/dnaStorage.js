'use strict';

const dnaSchema = require('../model/DnaSchema')

const save = conn => newDna =>{
    const DNA = conn.model('DNA', dnaSchema, 'dna');
    const dna = new DNA({
        ...newDna
    });
    return dna.save
}

module.exports = conn => {
    return {
        save: save(conn)
    }
}