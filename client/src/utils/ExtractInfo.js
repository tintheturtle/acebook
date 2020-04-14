
const ExtractInfo = (string) => {
    const info = string.split('separatorString')
    let array = []
    array.push(info[0].split(' '))
    array.push(info[1].split('_'))
    return array
}

export default ExtractInfo