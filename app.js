'use strict'

const fastify = require('fastify')
const {isMutant}= require("./handlers/mutantsHandler")

function build(opts={}) {
    const app = fastify(opts)
    app.post('/mutants/', (request, reply) =>{
        let result = isMutant(request.body.dna)
        reply
            .code(result?200:403)
            .send()
    })
    return app
}

module.exports = build