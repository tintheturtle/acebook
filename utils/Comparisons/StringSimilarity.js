

const sorensonDice = (stringOne, stringTwo) => {

    const splitPairs = (string) => {
        let pairs = []
        for (let i = 0; i < string.length - 1; i++) {
            pairs[i] = string.slice(i, i+2)
        }
        return pairs
    }

    const stringSimilarity = (stringOne, stringTwo) => {
        let similarities = []
        let dictObject = {}
        const length = stringTwo.length

        for(let i = 0; i < length; i++) {
            dictObject[stringTwo[i]] = true
        }

        for(let i = 0; i < length; i++) {
            v = stringOne[i]
            if (v in dictObject) {
                dictObject.push(v)
            }
        }

        return dictObject
    }

    const splitStringOne = splitPairs(stringOne)
    const splitStringTwo = splitPairs(stringTwo)

    const similarityscore = 2 * stringSimilarity(splitStringOne, splitStringTwo)
    const stringLengths = splitStringOne.length + splitStringTwo.length
    return similarityscore / stringLengths


}

export default sorensonDice

