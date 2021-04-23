const express = require("express");
const app = express();
const morgan = require("morgan");
const port = 3001;

app.use(express.json());
morgan.token("person", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : null
);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :person"
  )
);

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

const generateId = () => {
  const maxId =
    people.length > 0 ? Math.max(...people.map((person) => person.id)) : 0;
  return maxId + 1;
};

app.get("/", (request, response) => {
  response.send("Hello World!");
  next();
});

app.get("/api/persons", (req, res) => {
  res.json(people);
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
