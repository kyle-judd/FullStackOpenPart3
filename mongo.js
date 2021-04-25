const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://kylejudd:${password}@cluster0.okipf.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Record = mongoose.model("Record", phonebookSchema);

if (process.argv.length < 4) {
  console.log(`Phonebook:`);
  Record.find({}).then((res) => {
    res.forEach((record) => console.log(record));
    mongoose.connection.close();
  });
} else {
  const record = new Record({
    name: process.argv[3],
    number: process.argv[4],
  });

  record.save().then((result) => {
    console.log(`added ${record.name} number ${record.number} to phonebook`);
    mongoose.connection.close();
  });
}
