const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.find();
  res.status(200).json({
    status: 'success',
    data: {
      review: review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { review: newReview },
  });
});
