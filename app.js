const express = require('express');
const users = require('./utils/users')

const app = express();
const { PORT = 3000} = process.env;

app.listen(PORT, ()=>{
  console.log('Server is running')
})

app.get('/users', (req,res)=>{
  res.send(users)
})