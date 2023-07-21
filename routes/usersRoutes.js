const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to register a new user
router.post('/user', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error registering new user.' });
  }
});

// Route to login
router.post('/user', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Check if the password is correct
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in.' });
  }
});

module.exports = router;