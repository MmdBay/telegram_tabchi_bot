exports.codeNumber = async(message) => {
    return new Promise((resolve, reject) => {
        if (typeof message === 'string') {
            resolve(message)
        } else {
            reject(error)
        }
    })
}