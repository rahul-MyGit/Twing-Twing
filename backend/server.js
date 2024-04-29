const express = require('express');
const authRoutes = require('./route/auth');
const app = express();

app.use('/api/auth', authRoutes);


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});