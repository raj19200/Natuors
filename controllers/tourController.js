const fs = require('fs');
const Tour = require('../models/tourModel');

// Define all the callback function
exports.getTours = async (req, res) => {
  try {
    // Query Build
    // 1)Filtering
    const queryObj = { ...req.query };
    const exculdedFileds = ['page', 'sort', 'limit', 'fields'];
    exculdedFileds.forEach((el) => delete queryObj[el]);

    // 2)Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //3)Sorting

    const query = Tour.find(JSON.parse(queryStr));
    const tours = await query;
    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      msg: 'There is something went wrong',
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    req.status(400).json({
      status: 'Fail',
      mag: 'Please enter the correct ID',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    // Insert data into the table
    // const testTour = new Tour({
    //   name: 'The Highland Park',
    //   rating: 4.5,
    //   price: 437,
    // });

    // // Save the data to database

    // testTour
    //   .save()
    //   .then((doc) => console.log(doc))
    //   .catch((err) => console.log(err));

    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      msg: 'Invalid data',
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour: tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      msg: 'Something went wrong',
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      msg: 'Tour deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      msg: 'something went wrong',
    });
  }
};

// To read a file
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );
// This one is the example of hoe to create a middleware
// exports.checkID = (req, res, next, val) => {
//   if (val > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invaild tour id',
//     });
//   }
//   next();
// }
