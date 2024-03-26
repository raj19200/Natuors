const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');
dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE_URI.replace('<PASSWORD>', process.env.PASSWORD);
mongoose.connect(DB).then(() => console.log('Databse connected successfully'));

const tourData = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'),
);

const importData = async () => {
  try {
    await Tour.create(tourData);
    console.log('Data inserted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
