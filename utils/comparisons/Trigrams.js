
const Trigrams = (user, match) => {

    let trigramDict = {}

    const asTrigrams = (string) => {
        let rawData = "  ".concat(string, "  ")
        let trigramArray = []
        for (var i = rawData.length - 3; i >= 0; i = i - 1){
            trigramArray.push( rawData.slice(i, i + 3))
        }
        return trigramArray
    }

    let userTrigrams = asTrigrams(user)
    let matchTrigrams = asTrigrams(match)

    const dictionary = (trigrams) => {
        for (let i = 0; i < trigrams.length; i++) {
            if (trigrams[i] in trigramDict) {
                trigramDict[trigrams[i]] += 1
            }
            else {
                trigramDict[trigrams[i]] = 1
            }
        }
    }

    dictionary(userTrigrams)
    dictionary(matchTrigrams)

    const matchNumber = (user, match) => {
        let accumulator = 0
        for (let i = 0; i < user.length; i++) {
            if(match.includes(user[i])) {
                accumulator += 1
            }
        }
        return accumulator
    }

    const matches = matchNumber(userTrigrams, matchTrigrams) + matchNumber(userTrigrams, matchTrigrams)

    let score = (matches/2) / [...new Set(Object.keys(trigramDict))].length
    return score
}

export default Trigrams