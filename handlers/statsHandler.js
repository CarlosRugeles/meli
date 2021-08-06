const dnaStorage = require('../services/dnaStorageFactory');
const {mutantsQuery,humansQuery} = require('../services/statsQueryGenerator')
const getStats = async () => {
    const storage = await dnaStorage();
    const count_mutant_dna = await storage.count(mutantsQuery)
    const count_human_dna = await storage.count(humansQuery)
    console.log(count_mutant_dna)
    return {
        count_mutant_dna,
        count_human_dna,
        ratio : (count_human_dna) / Math.max(1, count_mutant_dna)
    }
}

module.exports = {
    getStats
}