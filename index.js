require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Record = require("./models/record");

app.use(express.static("build"));
app.use(cors());
app.use(express.json());
morgan.token("person", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : null
);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

// const convertStringToNumber = (stringNumber) => Number(stringNumber);

app.get("/api/persons", (req, res) => {
  Record.find({}).then((results) => res.json(results));
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name && !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  if (people.find((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };

  people = people.concat(newPerson);
  console.log(people);
  res.status(201).end();
});

app.get("/api/persons/:id", (req, res) => {
  const id = convertStringToNumber(req.params.id);
  const person = people.find((person) => person.id === id);
  person ? res.json(person) : res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = convertStringToNumber(req.params.id);
  const requestedPerson = people.find((person) => person.id === id);
  if (requestedPerson) {
    people = people.filter((person) => person.id !== requestedPerson.id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  const totalPeople = notes.length;
  const date = new Date();
  res.send(`Phonebook has info for ${totalPeople} people <br> <br>${date}`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT} and ${process.env.MONGODB_URI}`
  );
});
