const express = require('express')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const bodyParser = require('body-parser')

const app = express()


// QUESTION: add your connection URL
const dbConnectionUri = 'mongodb+srv://jtao25:NZ1cgIDZpdIRdHvI@cluster0.9nmidw4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const dbName = 'petfinder'

// QUESTION: make a schema for a pet
const petSchema = new mongoose.Schema({
    name: String,
    image: String
});

// QUESTION: make a mongoose model from it
// note: the first parameter should match the model name (capitalized, not plural).
//       mongoose automatically converts it to a plural collection name (i.e. Cat -> cats)
const Pet = new mongoose.model("Pet", petSchema);


// parses JSON bodies in POST/PUT requests and put then in req.body
app.use(bodyParser.json())

// handler to serve the index.html file
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))


// QUESTION: add a handler to get pets
app.get('/pets', asyncHandler(async (req, res) => {
    const allPets = await Pet.find();
    return res.json(allPets);
}));

// QUESTION: add a handler to create a pet: POST /pets
// app.post('/pets', asyncHandler(async (req, res) => {
app.post('/pets', asyncHandler(async (req, res) => {
    const name = req.body.name
    const image = req.body.image
    
    const newPet = new Pet({ name, image })
    // same as new Pet({ "name": name, "image": image })
    await newPet.save()
    
    res.status(201).json(newPet)
    }))
     
// }));


// function to connect to database and start the server
async function start() {
    await mongoose.connect(dbConnectionUri, { dbName })

    console.log(`Connected to the mongoDB database '${dbName}'`)

    app.listen(3000, () => {
        console.log('Server listening on port 3000')
    })
}

start()
