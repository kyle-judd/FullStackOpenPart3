const recordsRouter = require("express").Router();
const Record = require("../models/record");

recordsRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  const record = {
    ...body,
    number: body.number,
  };

  Record.findByIdAndUpdate(req.params.id, record, { new: true })
    .then((updatedRecord) => res.json(updatedRecord))
    .catch((error) => next(error));
});

recordsRouter.post("/", (req, res, next) => {
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

recordsRouter.get("/:id", (req, res, next) => {
  Record.findById(req.params.id)
    .then((record) => (record ? res.json(record) : res.status(404).end()))
    .catch((error) => next(error));
});

recordsRouter.get("/", (req, res) => {
  Record.find({}).then((results) => res.json(results));
});

recordsRouter.get("/info", (req, res) => {
  Record.countDocuments({}).then((count) => {
    const date = new Date();
    res.send(
      `The total number of records is ${count} <br><br> Date is: ${date}`
    );
  });
});

recordsRouter.delete("/:id", (req, res, next) => {
  Record.findByIdAndDelete(req.params.id)
    .then((result) => {
      logger.info(result);
      res.status(204).end();
    })
    .catch((error) => next(error));
});

module.exports = recordsRouter;
