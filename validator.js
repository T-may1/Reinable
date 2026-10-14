function isEmptyPayload(userObj) {
    return Object.keys(userObj).length === 0;
}

function isInvalidName(name) {
    if (!name) return true;
    const len = name.length;
    return len < 1 || len > 50;
}

function isInvalidHeight(height) {
    if (!height) return false;  
    return !/\d/.test(height);
}

function isInvalidWeight(weight) {
    if (!weight) return false;   
    return !/\d/.test(weight);
}

module.exports = {
    isInvalidHeight,
    isEmptyPayload,
    isInvalidName,
    isInvalidWeight
}