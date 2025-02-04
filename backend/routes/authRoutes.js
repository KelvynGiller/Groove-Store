const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
    res.oidc.login();
});

router.get('/profile', authController.authMiddleware, authController.userProfile);
router.get('/logout', authController.authMiddleware, authController.logoutUser);

module.exports = router;