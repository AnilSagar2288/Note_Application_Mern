const express = require('express');
const router = express.Router();
const {registerUser, authUser, userProfile} = require('../controllers/userController');
const { protectedRoute } = require('../middlewares/authMiddleware');

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/profile').post(protectedRoute,userProfile);

module.exports = router


