const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = () => {

    const User = require('../../db/user')();

    // POST /users/login
    router.post('/login', async (req, res) => {
        try {
            const {username, password} = req.body;
            const error = new Error();
            if (!(username && password)) {
                error.message = 'Invalid request';
                error.code = 'MissingCredentials';
                throw error;
            }

            const result = await User.get(username);

            if (result === null) {
                error.message = 'Invalid username or password';
                error.code = 'UserDoesntExist';
                throw error;
            }

            const match = await bcrypt.compare(password, result.password);
            if (match) {
                const payload = {
                    user: username
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRATION_TIME});
                res.status(200).json({token,username});
            }
            else {
                error.message = 'Invalid username or password';
                error.code = 'InvalidCredentials';
                throw error;
            }
        } catch (e) {
            console.error(e);
            if (e.code === 'MissingCredentials') {
                res.status(400);
            }
            else if (['UserDoesntExist', 'InvalidCredentials'].includes(e.code)) {
                res.status(401);
            }
            else {
                res.status(500);
            }
            res.json({message: e.message});
        }
    });

    // POST /user/signup
    router.post('/signup', async (req, res) => {
        try {
            const {username, password} = req.body;

            const error = new Error();
            if (!(username && password)) {
                error.message = 'Invalid request';
                error.code = 'MissingCredentials';
                throw error;
            }

            const user = await User.get(username);
            if(!user){
                const salt = await bcrypt.genSalt(+process.env.SALT_ROUNDS);
                const hash = await bcrypt.hash(password, salt);
                const result = await User.create(username,hash);
                res.status(201).json({message: "User Created"});
            } else {
                error.message = 'User Already Exists';
                error.code = 'UserAlreadyExists';
                throw error;
            }
        } catch (e) {
            console.error(e);
            if (e.code === 'MissingCredentials') {
                res.status(400);
            }
            else if (e.code === 'UserAlreadyExists') {
                res.status(409);
            } 
            else {
                res.status(500);
            }
            res.json({message: e.message});
        }
    });

    return router;

};