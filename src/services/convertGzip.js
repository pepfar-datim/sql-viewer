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

    // console.log('okay fake')
    // let b64text = 'H4sIAAAAAAAAAO1U0WrbMBT9Fz3HwVKU1vWbl6TGNI1L4w3KGEWxb1pT2TKSnDSE/vuu6zRpnWxQxl7GjJ7OOVf3Xp2DtyRVGRCfZLAUtbSkR0pRfARSDcJChhhzKXModRhNKPPp0Kdefzg4R40Uxn6tsr2OuY47dJiXuJ4/QOmg7w4Z6qwWpZHC5qo0xP/+o0fg2YIuhQzSFAxiSyEN9EhVL2SevoFEr53XD6+oDWjib0nedArjqVnPOS8ePfLScqFWddUWApaWtZQt0cWWYqV0bmE3SJabSorNrLu+eVTaHqE79fx35KXSxQmugNLg/smmaphRkEzC+PauoYQV4w49juZBGN5OwiCJ4llXtH8uXKNo9th+1k/qoKWMN34yjqdP+cUJP+mZ43KUJsz1B+c+9/qc8mM/t0SqVMimH5T34RdUVFpVoO0GoVlwPUFkJWT9fqKXT6SgzcE/lIIIjesk4T6+2Xkt4QHKbA52P9y7Kqx4vgN9Nb4awfKJHDY5hCI70ghrdb6oLXxrTHi9tnl+IWXUJmhXmqLzD0pv4upg7f9k/ZVk/YFtby6NVLFQ+77Z4e9AwimsprPoYv0kf9nqo+ZUq5+LUckHJgYAAA=='
    // const strData = atob(b64text);
    // {/*console.log()*/}
    // {/*console.log(window.atob(b64text).substring(0,8))*/}

    // // split it into an array rather than a "string"
    // const charData = strData.split('').map(function(x){return x.charCodeAt(0); });
    // {console.log(charData)}

    // // convert to binary
    // const binData = new Uint8Array(charData);
    // {/*console.log(binData)*/}
    // // inflate
    // const result = pako.inflate(binData, { to: 'string' });
    // {/*console.log(result);*/}
}
