require('dotenv').config();
const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysecret = process.env.SECRET_KEY;

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const {username , password} = req.body;
        if(!username || !password){
            return res.status(400).send('All fields are required').redirect('/user/register');
        }
        let hashpassword = await bcrypt.hash(password, 10);
        const hashedPassword = await bcrypt.hash(password, 10);
        // console.log(hashpassword); 
        const user = new User({username, password: hashedPassword});
        // console.log(username);
        // console.log(password); 
        await user.save();
        // Redirect with a query parameter
        res.redirect('/user/login?message=User registered successfully');
        } catch (err) {
            console.log(err);
            // Redirect with a query parameter
            res.redirect('/user/login?message=User registration was unsuccessful');
        }
    });
router.get('/login', (req, res) => {
    res.render('login');
});
router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        
        if (!user || !(await bcrypt.compare(password, user.password))) {

            res.redirect('/user/login?message="Invalid username or password"');
        }
        else{
            const token = jwt.sign({userId: user._id}, mysecret,{ expiresIn: '10m' });
            console.log(token);
            res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 600000 }); // 300000 ms = 5 minutes
            res.redirect('/task/');
        }
        } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
        }
    });

module.exports = router;    