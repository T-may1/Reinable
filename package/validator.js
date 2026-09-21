function isInvalidHeight (userObj) {
    return !userObj.height.includes("h")
}

function isEmptyPayload (userObj) {
    return Object.keys(userObj).length === 0
}

module.exports = {
    isInvalidHeight,
    isEmptyPayload
}