
import Dice from './Dice'
import Cosine from './Cosine'
import Trigrams from './Trigrams'

const StringSimilarity = (stringOne, stringTwo, algorithm) => {
    switch (algorithm) {
        case 'cosine': 
            return Cosine(stringOne, stringTwo)
        case 'sorensonDice':
            return Dice(stringOne, stringTwo)
        case 'dictionary':
            return Dice(stringOne, stringTwo)
        case 'trigrams':
            return Trigrams(stringOne, stringTwo)
        default: 
            return Dice(stringOne, stringTwo)
    }
}

export default StringSimilarity

