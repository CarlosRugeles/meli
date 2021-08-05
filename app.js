'use strict'

const fastify = require('fastify')
const {isMutant}= require("./handlers/mutantsHandler")
const dnaStorage = require('./services/dnaStorageFactory')
function build(opts={}) {
    const app = fastify(opts)
    app.post('/mutants/', (request, reply) =>{
        const result = isMutant(request.body.dna)
        const savedResult = dnaStorage().save({dna:request.body.dna, isMutant: result});
        console.log(savedResult);
        reply
            .code(result?200:403)
            .send()
    })
    return app
}

module.exports = build