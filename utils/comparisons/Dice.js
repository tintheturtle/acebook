

const sorensonDice = (stringOne, stringTwo) => {

    console.log(stringOne, stringTwo)

    const splitPairs = (string) => {
        let pairs = []
        for (let i = 0; i < string.length - 1; i++) {
            pairs[i] = string.slice(i, i+2)
        }
        return pairs
    }

    const stringSimilarity = (first, second) => {
        let similarities = []
        let dictObject = {}
        const length = second.length
        let tempObject

        for(let i = 0; i < length; i++) {
            dictObject[second[i]] = true
        }

        for(let i = 0; i < length; i++) {
            tempObject = first[i]
            if (tempObject in dictObject) {
                similarities.push(tempObject)
            }
        }

        return similarities
    }

    const splitStringOne = splitPairs(stringOne)
    const splitStringTwo = splitPairs(stringTwo)

    const similarityscore = 2 * stringSimilarity(splitStringOne, splitStringTwo).length
    const stringLengths = splitStringOne.length + splitStringTwo.length
    return similarityscore / stringLengths


}

export default sorensonDice

