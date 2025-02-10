const express = require('express');
const router = express.Router();
const verifyToken = require('../firebaseAdmin'); 

router.get('/profile', verifyToken, (req, res) => {
  res.json({ message: "User profile", user: req.user });
});

router.get('/logout', (req, res) => {

  res.json({ message: "User logout" });
});

module.exports = router;