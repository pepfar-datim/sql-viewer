import pako from 'pako'

export const convertGzip = inputString => {
    try {
        const strData = atob(inputString)
        const charData = strData.split('').map(c => c.charCodeAt(0))
        if (charData[0] !== 31 || charData[1] !== 139) {
            return inputString
        }
        const strRep = pako.inflate(charData, { to: 'string' })
        const jsonRep = JSON.stringify(JSON.parse(strRep))
        return '(unzipped) ' + jsonRep
    } catch {
        return inputString
    }
}
