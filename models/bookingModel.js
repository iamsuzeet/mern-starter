const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'tour',
      required: [true, 'Booking must belong to a tour!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'Booking must have a price'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    price: {
      type: Number,
      required: [true, 'Booking must have a price!'],
    },
    paid: {
      type: Boolean,
      default: true,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.tour.guides;
        delete ret.tour.id;
        delete ret.tour.durationWeeks;
        delete ret.user.role;
        delete ret.user.email;
      },
    },
    toObject: {
      transform: function (doc, ret) {
        delete ret.tour.guides;
        delete ret.tour.id;
        delete ret.tour.durationWeeks;
        delete ret.user.role;
        delete ret.user.email;
      },
    },
  }
);

bookingSchema.index({ tour: 1, user: 1 }, { unique: true });

bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({ path: 'tour', select: 'name' });
  next();
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;
