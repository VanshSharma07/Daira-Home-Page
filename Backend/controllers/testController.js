const Test = require('../models/test');
const Child = require('../models/child');

// Add a test for a child
exports.addTest = async (req, res) => {
    const { childId, test_name, reading_age, score } = req.body;

    try {
        const test = new Test({
            child_id: childId,
            test_name,
            reading_age,
            score
        });
        await test.save();

        // Increment the number of tests taken by the child
        await Child.findByIdAndUpdate(childId, {
            $inc: { tests_taken: 1 }
        });

        res.status(201).json({ message: 'Test added successfully', test });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all tests for a specific child
exports.getTestsByChild = async (req, res) => {
    const { childId } = req.params;

    try {
        const tests = await Test.find({ child_id: childId });
        res.status(200).json({ tests });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


