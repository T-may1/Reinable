const express = require('express')
const app = express()
const bodyParser = require ('body-parser')

app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', function(req, res) {
    const response = {
        name: "Heidi",
        role: "Lead",
        schooling:"Level 4",
        height: "14.2h",
        weight: "350kg"
    }
    res.send(response)
})

app.post('/update-profile', function(req, res) {
    const payload = req.body
    console.log(payload)
    if (Object.keys(payload).length === 0) {
        res.status(400).send({error: "empty payload.Couldn't update data"})
    } else {
        res.status(200).send({info: "profile data updated successfully"})
    }
    
})

const server = app.listen(3000, function(){
    console.log("app listening on port 3000")
})