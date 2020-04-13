
const Cosine = (user, match) => {

    const termFreqMap = (string) => {
        let words = string.split(' ')
        let frequency = {}
        words.forEach( word => {
            frequency[word] = (frequency[word] || 0) + 1
        })
        return frequency
    }

    const addKeysToDictioanry = (termFreq, dictionary) => {
        for (let key in termFreq) {
            dictionary[key] = true
        }
    }

    const termFreqMapToVector = (frequency, dict) => {
        let frequencyVector = []
        for(let term in dict) {
            frequencyVector.push(frequency[term] || 0);
        }
        return frequencyVector
    }

    const vectorDotProduct = (vectorA, vectorB) => {
        let product = 0
        for (let i = 0; i < vectorA.length; i++) {
            product += vectorA[i] * vectorB[i]
        }
        return product
    }

    const magnitude = (vector) => {
        let sum = 0
        for (let i = 0; i < vector.length; i++){
            sum += vector[i] * vector[i]
        }
        return Math.sqrt(sum)
    }

    const cosineSimilarity = (vectorA, vectorB) => {
        return (vectorDotProduct(vectorA, vectorB) / (magnitude(vectorA) * magnitude(vectorB)))
    }

    const termFrequencyUser = termFreqMap(user)
    const termFrequencyMatch = termFreqMap(match)

    let dictionary = {}
    addKeysToDictioanry(termFrequencyUser, dictionary)
    addKeysToDictioanry(termFrequencyMatch, dictionary)

    const userVector = termFreqMapToVector(termFrequencyUser, dictionary)
    const matchVector = termFreqMapToVector(termFrequencyMatch, dictionary)

    return cosineSimilarity(userVector, matchVector)

}

export default Cosine