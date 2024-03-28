const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Tour = require('../../models/tourModel');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });
const DB = process.env.DATABASE_URI.replace('<PASSWORD>', process.env.PASSWORD);
mongoose.connect(DB).then(() => console.log('Databse connected successfully'));

const tourData = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'),
);

const userData = JSON.parse(
  fs.readFileSync(`${__dirname}/users.json`, 'utf-8'),
);

const importTourData = async () => {
  try {
    await Tour.create(tourData);
    console.log('Data inserted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteTourData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const importUserData = async () => {
  try {
    await User.create(userData);
    console.log('Data inserted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteUserData = async () => {
  try {
    await User.deleteMany();
    console.log('Data deleted successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importTourData();
  importUserData();
} else if (process.argv[2] === '--delete') {
  deleteTourData();
  deleteUserData();
}
