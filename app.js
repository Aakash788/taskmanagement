require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const methodOverride = require('method-override');


const app = express();
const port = process.env.PORT||3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect to MongoDB', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

//routes
app.use('/', require('./routes/index'));

// Set view engine
app.set('view engine', 'ejs');


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
