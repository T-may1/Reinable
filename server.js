const express = require('express')
const app = express()
const bodyParser = require ('body-parser')

app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/dist'))

const server = app.listen(3000, function(){
    console.log("app listening on port 3000")
})