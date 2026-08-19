const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const { MongoClient } = require('mongodb')
const { isEmptyPayload, isInvalidHeight} = require('./validator')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'ranch_db'
const collName = 'herdMembers'

app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', async function(req, res) {
    // connect to db
    await client.connect()
    console.log('Successfully connected to database')

    //initiates or get database & collection
    const db = client.db(dbName)
    const collection = db.collection(collName)

    // get saved data from 
    const result = await collection.findOne({id: 1})
    console.log(result)
    client.close()

    response = {}

    if (result !== null ) {
        response = {
            name: result.name,
            role: result.role,
            schooling: result.schooling,
            height: result.height,
            weight: result.weight
        }
        
    }

    res.send(response)
    
})

app.post('/update-profile', async function(req, res) {
    const payload = req.body
    console.log(payload)

    if (isEmptyPayload(payload) || isInvalidHeight(payload)) {
        res.status(400).send({error: "invalid payload.Couldn't update data"})
    } else {
        //connect to mongodb 
        await client.connect()
        console.log('Successfully connected to database')
        
        //initiates or get database & collection
        const db = client.db(dbName)
        const collection = db.collection(collName)

        //save data from frontend to database
        payload['id'] = 1
        const updatedValues = { $set: payload }
        await collection.updateOne({id:1}, updatedValues, {upsert: true})
        client.close()
        res.status(200).send({info: "profile data updated successfully"})
    }
    
})

const server = app.listen(3000, function(){
    console.log("app listening on port 3000")
})

module.exports = {
    app,
    server
}