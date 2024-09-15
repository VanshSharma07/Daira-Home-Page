const express = require('express');
const { addTest, getTestsByChild } = require('../controllers/testController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();


// Route to add a test
router.post('/addTest', verifyToken, addTest);

// Route to get tests by child ID
router.get('/getTestsByChild/:childId', verifyToken, getTestsByChild);

module.exports = router;