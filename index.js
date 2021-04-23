const express = require("express");
const app = express();
const port = 3001;

let people = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122",
  },
];

const convertStringToNumber = (stringNumber) => Number(stringNumber);

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.get("/api/persons", (req, res) => {
  res.json(people);
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
