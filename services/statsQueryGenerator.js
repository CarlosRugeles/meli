const mutantsQueryCount ={
    "isMutant":{
        "$eq":true
    }
};
const humansQueryCount ={
    "isMutant":{
        "$eq":false
    }
}
module.exports ={
    humansQuery: humansQueryCount,
    mutantsQuery: mutantsQueryCount
}