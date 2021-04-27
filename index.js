require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Record = require("./models/record");
const { response } = require("express");

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

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const record = {
    ...body,
    number: body.number,
  };

  Record.findByIdAndUpdate(req.params.id, record, { new: true })
    .then((updatedRecord) => res.json(updatedRecord))
    .catch((error) => next(error));
});

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  if (!body.name && !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const newRecord = new Record({
    name: body.name,
    number: body.number,
  });

  newRecord
    .save()
    .then((response) => res.json(response))
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (req, res, next) => {
  Record.findById(req.params.id)
    .then((record) => (record ? res.json(record) : res.status(404).end()))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Record.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(result);
      res.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (req, res) => {
  Record.countDocuments({}).then((count) => {
    const date = new Date();
    res.send(
      `The total number of records is ${count} <br><br> Date is: ${date}`
    );
  });
});

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

app.get("/api/persons", (req, res) => {
  Record.find({}).then((results) => res.json(results));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT} and ${process.env.MONGODB_URI}`
  );
});
