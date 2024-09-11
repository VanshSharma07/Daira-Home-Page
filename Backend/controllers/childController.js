const Child = require('../models/child');
const User = require('../models/user');

// Add a new child for a teacher
exports.addChild = async (req, res) => {
    const { name, rollno } = req.body;
    const teacherId = req.userId; // Extracted from verifyToken middleware

    try {
        const child = new Child({
            name,
            rollno,
            teacher_id: teacherId
        });
        await child.save();
        res.status(201).json({ message: 'Child added successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific child with the number of tests taken
exports.getChild = async (req, res) => {
    const { name, rollno} = req.body; // Extract both rollno and name from the request body

    try {
        // Find the child based on both roll number and name
        const child = await Child.findOne({ name, rollno });
        if (!child) {
            return res.status(404).json({ message: 'Child not found' });
        }
        res.status(200).json({ child });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all children for a specific teacher
exports.getChildrenByTeacher = async (req, res) => {
    const teacherId = req.userId;

    try {
        const children = await Child.find({ teacher_id: teacherId });
        res.status(200).json({ children });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
