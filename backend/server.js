const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const {v2} = require("cloudinary");

const authRoutes = require('./route/auth');
const userRoutes = require('./route/user');

const connectMongoDB = require('./db/connectMongoDB');

dotenv.config();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${3000}!`);
  connectMongoDB();
});