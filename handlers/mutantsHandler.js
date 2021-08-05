const dnaStorage = require('../services/dnaStorageFactory')()
const dnaMatrix = [[]];
const LEFT_COUNT = 3;
function setDNAMatrix(dna =[]) {
    for (let i =0; i<dna.length; i++){
        dnaMatrix[i] = dna[i]
    }
}
/**
 *
 * @param currentX
 * @param currentY
 * @returns {*}
 */
function countConsecutiveGenes(currentX = 0, currentY = 0){
    const diagCounter = countDiags(currentX, currentY,LEFT_COUNT) >= LEFT_COUNT ? 1 : 0;
    const horCounter = countHorizontal(currentX, currentY,LEFT_COUNT) >= LEFT_COUNT ? 1 : 0;
    const verCounter = countVertical(currentX, currentY,LEFT_COUNT) >= LEFT_COUNT ? 1 : 0;
    return diagCounter+horCounter + verCounter;
}

/**
 * Look up in vertical axis of the matrix if there are any match record
 * @param currentX pivot X
 * @param currentY pivot Y
 * @param left
 * @returns {number|*}
 */
function countVertical(currentX = 0, currentY = 0, left = 0){
    let currentGen = dnaMatrix[currentX][currentY];
    if(left!==0 && isValidPosition(currentX, currentY+1) && currentGen === dnaMatrix[currentX][currentY+1]){
        return 1 + countVertical(currentX, currentY+1, left-1);
    }
    return 0;
}

/**
 *
 * @param currentX
 * @param currentY
 * @param left
 * @returns {number|*}
 */
function countHorizontal(currentX = 0, currentY = 0,left = 0){
    let currentGen = dnaMatrix[currentX][currentY];
    if(left!==0 && isValidPosition(currentX+1, currentY) && currentGen === dnaMatrix[currentX+1][currentY]){
        return 1 + countHorizontal(currentX+1, currentY, left-1);
    }
    return 0;
}

/**
 *
 * @param currentX
 * @param currentY
 * @param left
 * @returns {number|*}
 */
function countDiags(currentX = 0, currentY = 0, left = 0){
    let currentGen = dnaMatrix[currentX][currentY];
    if(left!==0 && isValidPosition(currentX+1, currentY+1) && currentGen === dnaMatrix[currentX+1][currentY+1]){
        return 1 + countDiags(currentX+1, currentY+1, left - 1);
    }
    return 0;
}

/**
 *
 * @param x
 * @param y
 * @returns {boolean}
 */
function isValidPosition(x = 0, y= 0){
    return x>=0 && x < dnaMatrix.length && y>=0 && y<dnaMatrix.length
}

const isMutant = (dna =[]) =>{
    setDNAMatrix(dna);
    let mutantCounter = 0;
    for(let i =0; i<dnaMatrix.length && mutantCounter<2; i++){
        for (let j = 0; j < dnaMatrix.length && mutantCounter<2; j++) {
            mutantCounter += countConsecutiveGenes(i,j);
        }
    }
    dnaStorage.then(storage =>{
        storage.save({dna:{dna}, isMutant: mutantCounter>=2})
    })
    return mutantCounter>=2
}
module.exports={
    isMutant
}