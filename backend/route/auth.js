const express = require('express');

const authRouter = express.Router();

authRouter.get('/signup', (req, res) => {
    res.send('Hello Worldsss!');
  
});


module.exports=authRouter;
