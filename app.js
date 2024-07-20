require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const auth = require('./middleware/jwt-auth');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT||3000;

app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect to MongoDB', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Public routes that don't require authentication
app.use('/user', require('./routes/user'));

//routes
app.use('/task', auth, require('./routes/index'));
app.get('/', (req, res) => {
    res.redirect('/task');
});

// Set view engine
app.set('view engine', 'ejs');


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
