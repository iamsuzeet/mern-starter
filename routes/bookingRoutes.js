const express = require('express');

const { protect, restrictTo } = require('../controllers/authController');
const {
  getCheckoutSession,
  getAllBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBookings,
  getMyBooking,
} = require('../controllers/bookingController');

const router = express.Router();

router.use(protect);

router.get('/checkout-session/:tourId', getCheckoutSession);
router.get('/my-booking', getMyBooking);

router.use(restrictTo('admin', 'lead-guide'));

router.route('/').get(getAllBookings).post(createBooking);
router
  .route('/:id')
  .get(getBooking)
  .patch(updateBookings)
  .delete(deleteBooking);

module.exports = router;
