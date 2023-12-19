const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 
const User = require('./models/userSchema');

const SECRET_KEY = 'secretkey';

const dbRUI = DB_URI='mongodb+srv://mikulasstec:notSoSafePassword01@cluster0.7ntingm.mongodb.net/UserDB?retryWrites=true&w=majority'
const app = express();

mongoose
.connect(dbRUI, {})
.then(() => {
    console.log('Connected to MongoDB')
    app.listen(3001, () => console.log('Server running on port 3001'))
})
.catch(err => console.log(err))

// middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/register', async (req, res) => {
    try {
        const {email, username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({email, username, password: hashedPassword});
        await newUser.save();
        res.status(201).json({message: 'User created successfully'}); 
    } catch (err) { 
        res.status(500).json({message: err.message});
    } 
})

app.get('/register', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
})

app.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body; 
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({userId: user._id}, SECRET_KEY, {expiresIn: '1h'});
        res.json({message: 'Login successful'})
    } 
    catch (err) {
        res.status(500).json({error: err.message});
    }
 })