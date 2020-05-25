const express = require('express');
const { getTourJSON } = require('../controllers/viewsController');
const { isLoggedIn, sendIsLoggedIn } = require('../controllers/authController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Sujit',
//   });
// });
router.use(isLoggedIn);

router.get('/', sendIsLoggedIn);

router.get('/overview/:tourname', getTourJSON);

module.exports = router;
