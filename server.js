const express = require('express')
const bodyParser = require ('body-parser')
const { MongoClient } = require('mongodb')
const { isEmptyPayload, isInvalidHeight} = require('./validator')

const app = express()
const dbAddress = '127.0.0.1:27017'
const dbName = 'ranch_db'
const collName = 'herdMembers'

const { DB_USER, DB_PASS, DEV} = process.env

const url = DEV
        ?`mongodb://${dbAddress}` 
        :`mongodb://${DB_USER}:${DB_PASS}@${dbAddress}?authSource=admin`

const client = new MongoClient(url)


app.use(bodyParser.json())

app.use('/', express.static(__dirname + '/dist'))

app.get('/horses', async function (req, res) {

    try {
        const collection = client.db(dbName).collection(collName)
        const horses = await collection
            .find({}, { projection: { _id: 0, id: 1, name: 1 } })
            .toArray()
        res.json(horses)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch horses' })
    }
})

app.get('/get-profile', async function(req, res) {
    
    const { id } = req.query
    if (!id) return res.status(400).json({ error: 'Missing id parameter' })

    try {
        const collection = client.db(dbName).collection(collName)
        const result = await collection.findOne({ id }, { projection: { _id: 0 } })

        if (!result) return res.status(404).json({ error: 'Profile not found' })
        res.json(result)
    } 
    catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Database error' })
    }
    
})

app.post('/update-profile', async function(req, res) {
    const payload = req.body

    if (isEmptyPayload(payload) || isInvalidHeight(payload)) {
        res.status(400).json({error: "Invalid payload.Couldn't update data"})
    }

    const { id } = payload
    if (!id) return res.status(400).json({ error: 'Missing id in payload' })

    try {
        const collection = client.db(dbName).collection(collName)
        const { id: _ignored, ...fields } = payload
        const result = await collection.updateOne({ id }, { $set: fields }, { upsert: true })

        res.status(200).json({
            info: 'Profile updated successfully',
            matched: result.matchedCount,
            modified: result.modifiedCount
        })
    }catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Database error' })
    }

})

app.get('/{*splat}', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

process.on('SIGINT', async () => {
    console.log('Shutting down...')
    await client.close()
    process.exit(0)
})

async function startServer() {
    try {
        await client.connect()
        console.log('Connected to MongoDB')
        app.listen(3000, () => console.log('App listening on port 3000'))
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err)
        process.exit(1)
    }
}

startServer()

module.exports = { app }