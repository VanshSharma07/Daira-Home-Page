// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const JWT_SECRET = 'your_jwt_shecret';

// // Register user
// exports.register = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: 'User already exists' });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = new User({ email, password: hashedPassword });
//         await newUser.save();

//         const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
//         res.status(201).json({ message: 'User registered successfully', token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

// // Login user
// exports.login = async (req, res) => {
//     const { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

//     try {
//         const user = await User.findOne({ email });
//         if (!user || !(await bcrypt.compare(password, user.password))) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const JWT_SECRET = 'your_jwt_shcret'; // Correct the secret spelling if necessary

// Register user
exports.register = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Generate token without expiry
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET);
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });

    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate token without expiry
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
