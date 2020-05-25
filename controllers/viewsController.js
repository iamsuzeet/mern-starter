const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getTourJSON = catchAsync(async (req, res, next) => {
  //get the data, for the requested tour(including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.tourname }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  if (!tour) next(new AppError('There is no tour with that name.', 404));

  //build template
  //render template using tour data
  res.status(200).json({
    status: 'success',
    data: {
      data: tour,
    },
  });
});
