// import mongoose from 'mongoose';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
import { UserModel } from '../models/Users.js';

const router = express.Router();

// test
router.get('/userId/ids/:userId', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.json(user.username);
  }
  catch (err) {
    res.json(err);
  }
});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });

    if (user) {
      return res.json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username: username, password: hashedPassword });
    newUser.save();

    res.json({ message: "User registered!" });
  }
  catch (err) {
    res.json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username: username });

    if (!user) {
      res.status(400);
      return res.json({ message: 'User doesn\'t exist' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ message: 'Username or password is incorrect!' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);

    res.json({ token, userId: user._id });
  }
  catch (err) {
    res.json(err);
  }
});

export { router as userRouter };