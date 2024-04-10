const express = require("express")
const app = express()

// Ddoski: I need this so I can access my API from my front-end webpage :)
const cors = require("cors")
app.use(cors())

// Ddoski: I use this to parse the data from requests! So if someone sends a post request with JSON, I can read it :D
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Ddoski: In the future, I'll store flashcards in a database, but for now, I'll keep it in an array.
let flashcards = []

// Ddoski: I defined an endpoint here, so when someone sends a POST request to http://localhost:3000/new with some JSON data,
// I add this to my flashcards array.
app.post("/new", (req, res) => {
    flashcards.push(req.body) // .push() method adds an item to the end of an array
    res.status(201) // 201 is "Created"
    res.send("New card added!")
})

// Ddoski: Could you make an endpoint here so that if someone makes a GET request to http://localhost:3000/cards,
// I send the flashcards array as a response?
// QUESTION 1.
app.get("/cards", (req, res) => {
    res.send(flashcards);
});

app.get("/card/:index", (req, res) => {
    if (req.params.index >= flashcards.length) {
        res.status(404) // 404 is "Not found"
        res.send("Card doesn't exist.")
    } else {
        // Ddoski: I want this endpoint to send back the item in the flashcards array at index [req.params.index]!
        // Hint: use res.json() instead of res.send()!
        // QUESTION 2.
        res.json(flashcards[req.params.index]);
    }
})

// Ddoski: This gets a random integer!
function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Ddoski: We use the previous function to randomize what card we send back!
app.get("/random", (req, res) => {
    randomNum = randomInteger(0, flashcards.length - 1)
    res.json(flashcards[randomNum])
})

// Ddoski: I want to define an endpoint here "/delete/SOMETHING", but SOMETHING is an index that I can input,
// so when we do "/delete/2", it deletes the card at index 2 in the flashcards array.
// Hint: Look at the /card/:index endpoint to see how we used defined and used route parameters.
// QUESTION 3.
app.get("/delete/:index", (req, res) => {
    // First, check if req.params.index is greater than or equal to the length of the flashcards array.
    // If it is, that means the card the user wants to delete does not exist, so send "Card does not exist" with the appropriate status code.
    if (req.params.index >= flashcards.length) {
        res.status(404)
        res.send("Card does not exist")
    } else {
        // Now, delete the card from the flashcards array, and send the updated flashcards array back as a response.
        // Hint: You can use flashcards.splice(req.params.index, 1) here to delete the card. Google the .splice() function for more details!
        flashcards.splice(req.params.index, 1)
        res.send(flashcards)
    }
})

// Ddoski: The .listen() function starts a server so that it's listening out for requests.
// Call the .listen() function on app with port number 3000
// and console.log something like "Listening on port 3000" so we know our server is running.

// QUESTION 4.
app.listen(3000, () => {
    console.log("Listening on Port 3000");
});
