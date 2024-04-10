const express = require("express");
const asyncHandler = require("express-async-handler");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectToDB, Flashcard } = require("./database");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// serves our frontend files from the 'public' directory (GET /, /script.js, /styles.css, etc.)
// https://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + "/public"));


// QUESTION 5. Finish this route handler that creates a new card, with "front" and "back" from the POST request body.
// Hint: Create a new Flashcard and save it to the database. Make sure to await asynchronous functions!
app.post("/new", asyncHandler(async (req, res) => {
    const front = req.body.front;
    const back = req.body.back;
    const newCard = new Flashcard({
        front: front,
        back: back
    });
    /* YOUR CODE HERE */
    await newCard.save();
    res.status(201).json(newCard);
}));

// QUESTION 6. Write a route handler for "GET /cards" that finds all flashcards and returns them as a JSON array.
// Hint: This should only need a few lines of code! Call a mongoose method and send back its result using res.something().
app.get("/cards", asyncHandler(async (req, res) => {
    const cards = await Flashcard.find()
    res.json(cards)
}));

// QUESTION 7. Finish this route handler that finds a card by its id and returns it as JSON.
app.get("/card/:id", asyncHandler(async (req, res) => {
    const id = req.body.id;
    const foundCard = await Flashcard.findById(id);
    res.send(foundCard)
}));

// QUESTION 8. Write a route handler for "GET /delete/:id" to delete a card by its id and return the deleted data.
// Try googling what the mongoose method could be or check the lab slides!
// Hint: This will be similar to the previous question.
app.delete("delete/:id", asyncHandler(async (req, res) => {
    const id = req.body.id;
    const deletedCard = await Flashcard.findyByIdAndDelete(id);
    res.send(deletedCard)
}))


// connects to the database and starts the server
async function start() {
    await connectToDB();

    return app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

// fancy way of saying only run the start function if we run this script from the CLI with `node server.js`.
// alternative, this file could imported with require("server.js"), where this will not run (i.e. on our autograder)
if (require.main === module) {
    start().catch((err) => console.error(err));
}
