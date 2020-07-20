// Dependencies
const express = require('express')
const mongoose = require('mongoose')
const app = express();
const db = mongoose.connection

// Middleware
app.use(express.json()); //use .json(), not .urlencoded()

// Environment Variables (getting ready for Heroku)
const PORT = process.env.PORT || 3000
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/merncrud'

// Connect to Mongo
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('MongoDB connection established:', mongoURI)
)

// Error / Disconnection
db.on('error', err => console.log(err.message + ' is Mongod not running?'))
db.on('disconnected', () => console.log('mongo disconnected'))

// Routes
const todosController = require('./controllers/todos.js');
app.use('/todos', todosController);
const usersController = require('./controllers/users.js');
app.use('/users', usersController);

app.listen(PORT, () => {
    console.log('Let\'s get things done on port', PORT)
})


