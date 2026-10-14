const express = require('express')
const bodyParser = require ('body-parser')
const { MongoClient } = require('mongodb')
const { isEmptyPayload, isInvalidHeight, isInvalidName, isInvalidWeight} = require('./validator')
const {slugify, isInvalidSlug} = require('./slugify')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        if (allowed.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(new Error('Only image files are allowed'))
        }
    }
})


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

app.use('/uploads', express.static('uploads'))

app.get('/horses', async function (req, res) {

    try {
        const collection = client.db(dbName).collection(collName)
        const horses = await collection
            .find({}, { projection: { _id: 0, id: 1, name: 1 } })
            .toArray()
        res.json(horses)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Could not load horses' })
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

    if (isEmptyPayload(payload)) {
    return res.status(400).json({ error: "Payload is empty" });
    }

    if (isInvalidName(payload.name)) {
        return res.status(400).json({ error: "Name must be 1-50 characters" });
    }

    if (isInvalidWeight(payload.weight)) {
        return res.status(400).json({ error: "Weight must contain a number" });
    }
    if (isInvalidHeight(payload.height)) {
        return res.status(400).json({ error: "Height must contain a number" });
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

app.post('/new-profile', async function(req, res) {
    const payload = req.body

    if (isEmptyPayload(payload)) {
    return res.status(400).json({ error: "Payload is empty" });
    }

    if (isInvalidName(payload.name)) {
        return res.status(400).json({ error: "Name must be 1-50 characters" });
    }

    if (isInvalidWeight(payload.weight)) {
        return res.status(400).json({ error: "Weight must contain a number" });
    }
    if (isInvalidHeight(payload.height)) {
        return res.status(400).json({ error: "Height must contain a number" });
    }
    

    const slug = slugify(payload.name)
    if (isInvalidSlug(slug)) {
        return res.status(400).json({ error: "Please enter a valid name" })
    }

    const profile = { id: slug, ...payload }

    try {
        const collection = client.db(dbName).collection(collName)
        await collection.insertOne(profile)
        return res.status(201).json(profile)
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ error: 'This profile name already exists' })
        }
        console.error(err)
        return res.status(500).json({ error: 'Database error' })
    }
})

app.post('/delete-profile', async function(req, res) {
    const payload = req.body

    const { id } = payload
    if (!id) return res.status(400).json({ error: 'Missing id in payload' })

    try {
        const collection = client.db(dbName).collection(collName)
        const result = await collection.deleteOne({ id })
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Profile not found' })
        }
        return res.status(200).json({info: 'Profile deleted successfully'})
    }catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Database error' })
    }

})

app.post('/upload-image', upload.single('image'), function (req, res) {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' })
    }

    res.status(200).json({
        imageUrl: '/uploads/' + req.file.filename
    })
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