const express = require('express');
const { addChild, getChild, getChildrenByTeacher, getAllChildren } = require('../controllers/childController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Add a child
router.post('/addChild', verifyToken, addChild);

// Get a specific child
router.post('/getChild', verifyToken, getChild);

// Get all children for a teacher
router.get('/getChildrenByTeacher', verifyToken, getChildrenByTeacher);

// Get all children (new route)
router.get('/getAllChildren', getAllChildren);

module.exports = router;
