const mongoose = require('mongoose');
const Report = require('./models/Report');

mongoose.connect('mongodb://localhost:27017/auris');

async function run() {
  const reports = await Report.find({});
  console.log(JSON.stringify(reports, null, 2));
  process.exit(0);
}

run();
