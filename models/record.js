const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    min: 8,
    required: true,
    unique: true,
  },
});

phonebookSchema.plugin(uniqueValidator);

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Record", phonebookSchema);
