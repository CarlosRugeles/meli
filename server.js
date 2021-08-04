'use strict'

const server = require('./app')({
    logger : true
});

server.listen(3000,'0.0.0.0', (error, address) =>{
    if(error){
        server.log.error(error)
        process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
})