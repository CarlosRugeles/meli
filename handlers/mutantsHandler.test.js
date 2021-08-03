const {isMutant} = require("./mutantsHandler")

describe("Mutants handler should", ()=>{

    test("Retrieves no mutant", ()=>{
        const request =
            [
                "ATGCGA",
                "CAGTGC",
                "TTATTT",
                "AGACGG",
                "GCGTCA",
                "TCACTG"
            ];
        expect(isMutant(request)).toBe(false)
    });
    test("Retrieves mutant", ()=>{
        let request =
            [
                "ATGCGA",
                "CAGTGC",
                "TTATGT",
                "AGAAGG",
                "CCCCTA",
                "TCACTG"
            ];
        expect(isMutant(request)).toBe(true)
        request = [
            "ATGCGA",
            "AAGTCC",
            "ATATGT",
            "AGAAGG",
            "ACCCTA",
            "TCACTG"
        ]
        expect(isMutant(request)).toBe(true)
    });
})