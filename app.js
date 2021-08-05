'use strict'

const fastify = require('fastify')
const {isMutant}= require("./handlers/mutantsHandler")
const {getStats} = require("./handlers/statsHandler")
function build(opts={}) {
    const app = fastify(opts)
    app.post('/mutants/', (request, reply) =>{
        reply
            .code(isMutant(request.body.dna)?200:403)
            .send();
    });
    app.get('/stats',(request, reply) =>{
        return getStats()
    });
    return app
}

module.exports = build