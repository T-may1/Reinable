const { isInvalidHeight, isEmptyPayload} = require('../validator')


test ('valid height', function() {
    const testPayload = {
        name: "test",
        role: "test role",
        schooling: "some schooling",
        height: "15h",
        weight: "400kg"
    }
    const result = isInvalidHeight(testPayload)
    expect(result).toBe(false)

})

test ('invalid height', function() {
    const testPayload = {
        name: "test",
        role: "test role",
        schooling: "some schooling",
        height: "15",
        weight: "400kg"
    }
    const result = isInvalidHeight(testPayload)
    expect(result).toBe(true)

})

test ('empty payload', function() {
    const testPayload = {}
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(true)
})

test ('not-empty payload', function() {
    const testPayload = {
        name: "test",
        role: "test role",
        schooling: "some schooling",
        height: "15h",
        weight: "400kg"
    }
    const result = isEmptyPayload(testPayload)
    expect(result).toBe(false)
})



