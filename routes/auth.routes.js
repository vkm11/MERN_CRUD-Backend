const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');

const router = express.Router();

// Register
router.route("/register").post(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;

    try {
        // Validate role
        const roleNumber = parseInt(role, 10);
        if (![1, 2, 3].includes(roleNumber)) {
            return res.status(400).json({ msg: 'Invalid role' });
        }

        // Check if user exists
        let user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Create a new user
        user = new Users({ name, email, phone, password, role: roleNumber });

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return JSON Web Token
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });

        res.status(201).json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        return next(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Check if user exists
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check role
        if (role) {
            const roleNumber = parseInt(role, 10);
            if (user.role !== roleNumber) {
                return res.status(403).json({ msg: 'Access denied please check the role' });
            }
        }

        // Return JSON Web Token and role
        const payload = { user: { id: user.id, name: user.name, role: user.role } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });

        res.json({ token, name: user.name, role: user.role });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.get('/verify-token', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ msg: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Token is not valid or has expired' });
        }

        res.json({ msg: 'Token is valid' });
    });
});

module.exports = router;
