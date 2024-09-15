const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    child_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Child', required: true }, // Reference to the child
    test_name: { type: String, required: false },
    reading_age: { type: Number },  // Customize these fields as per test type
    score: { type: Number }
}, { collection: 'Tests' });

module.exports = mongoose.model('Test', testSchema);

