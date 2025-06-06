const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = generateToken(user._id);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};