function sleeper(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
    sleeper: sleeper,
}