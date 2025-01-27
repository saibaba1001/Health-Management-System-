const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());


mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the user schema and model
const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  password: String,
}));

// Secret key for JWT
const secretKey = 'your-secret-key';

// User registration
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, secretKey, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
