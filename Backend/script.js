const mongoose = require('mongoose');
const User = require('./models/user');
const Child = require('./models/child');

const MONGODB_URI = 'mongodb://localhost:27017/DemoDB';
const PORT = 5000;

async function assignChildrenToTeacher(teacherEmail, childRollNos) {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

        // Find the teacher by email
        const teacher = await User.findOne({ email: teacherEmail });
        if (!teacher) {
            throw new Error('Teacher not found');
        }

        // Update each child to assign the teacher
        for (const rollno of childRollNos) {
            const child = await Child.findOne({ rollno });
            if (child) {
                child.teacher_id = teacher._id;
                await child.save();
                console.log(`Assigned teacher to child with roll number: ${rollno}`);
            } else {
                console.log(`Child with roll number ${rollno} not found`);
            }
        }

        console.log('All children have been assigned to the teacher');
    } catch (error) {
        console.error('Error assigning children to teacher:', error);
    } finally {
        // Close the connection
        mongoose.connection.close();
    }
}

// Example usage
const teacherEmail = 'vansh@gmail.com';
const childRollNos = ['S1001', 'S1002', 'S1003','S1004']; // List of child roll numbers

assignChildrenToTeacher(teacherEmail, childRollNos);
