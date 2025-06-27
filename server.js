const express = require('express');

const app = express();

const mongoose = require('mongoose');

const cors = require('cors');

const PORT = 5000;

app.use(express.json());

app.use(cors());

const mongoURL = 'mongodb+srv://Umasatya27:bb1UNNXoeaRx7Iix@cluster0.1rm40x2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Make sure to replace `yourDatabaseName` with your actual database name



mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })



  .then(() => console.log("Connected to MongoDB Atlas"))

  .catch((err) => console.log(" DB connection error:", err));

// Mongoose schema and model

const userSchema = new mongoose.Schema({

  name: String

});

const User = mongoose.model('User', userSchema);

// ✅ GET all users

app.get('/items', async (req, res) => {

  try {

    const users = await User.find();

    res.json(users);

  } catch (err) {

    res.status(500).send("Error fetching users");

  }

});

// ✅ POST a new user

app.post('/items', async (req, res) => {

  try {

    const newUser = new User({ name: req.body.name });

    await newUser.save();

    res.status(201).json(newUser);

  } catch (err) {

    res.status(500).send("Error saving user");

  }

});

// ✅ PUT (update user by ID)

app.put('/items/:id', async (req, res) => {

  try {

    const updatedUser = await User.findByIdAndUpdate(

      req.params.id,

      { name: req.body.name },

      { new: true }

    );

    if (!updatedUser) return res.status(404).send("User not found");

    res.json(updatedUser);

  } catch (err) {

    res.status(500).send("Error updating user");

  }

});

// ✅ DELETE user by ID

app.delete('/items/:id', async (req, res) => {

  try {

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) return res.status(404).send("User not found");

    res.send(`User ${req.params.id} deleted successfully`);

  } catch (err) {

    res.status(500).send("Error deleting user");

  }

});

// ✅ Start server

app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);

});









