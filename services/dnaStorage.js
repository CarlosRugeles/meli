'use strict';

const dnaSchema = require('../model/DnaSchema')

const save = conn => newDna =>{
    const DNA = conn.model('DNA', dnaSchema, 'dna');
    new DNA({
        ...newDna
    });
    DNA.findOneAndUpdate({
        dna: {"$eq":newDna.dna}
    },{isMutant: newDna.isMutant},{upsert: true, new: true}, (err, doc) =>{
        console.log(err)
        console.log(doc)
    })
}

const count = conn => async (query) =>{
    const DNA = conn.model('DNA', dnaSchema, 'dna');
    return await DNA.find(query).count();
}

module.exports = conn => {
    return {
        save: save(conn),
        count: count(conn)
    }
}