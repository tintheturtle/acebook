
import Dice from './Dice'
// import Cosine from './Cosine'

const StringSimilarity = (stringOne, stringTwo, algorithm) => {
    switch (algorithm) {
        case 'cosine': 
            return Dice(stringOne, stringTwo)
        case 'sorensonDice':
            return Dice(stringOne, stringTwo)
        default: 
            return Dice(stringOne, stringTwo)
    }
}

export default StringSimilarity

