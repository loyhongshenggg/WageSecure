require("dotenv").config();
const user = require("../db/models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const xrpl = require("xrpl")
const { createUserWallet } = require('../utils/wallet')

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN
    })
}

const signup = catchAsync(async (req, res, next) => {
    const body = req.body;

    // creates a cold wallet address
    const walletSeed = (await createUserWallet()).seed;
    
    const newUser = await user.create({
        userType: body.userType,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        confirmPassword: body.confirmPassword,
        walletSeed: walletSeed
    });

    if (!newUser) {
        return next(new AppError('Failed to create the user', 400));
    }

    const result = newUser.toJSON();

    delete result.password;
    delete result.deletedAt;

    result.token = generateToken({
        id: result.id
    })


    return res.status(201).json({
        status: 'success',
        data: result, // return JWT to user after registration
    });
    
});

const login = catchAsync( async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return next(new AppError('Please provide email and password', 400))
    }

    const result = await user.findOne({where: {email}});
    if (!result) {
        return next(new AppError("Incorrect Email or Password", 400))
    }

    const isPasswordMatched = await bcrypt.compare(password, result.password);
    if (!isPasswordMatched) {
        return next(new AppError("Incorrect Email or Password", 400))
    }

    const token = generateToken({
        id: result.id,
    })
    console.log(result.id);

    return res.json({
        status: "success",
        token
    })
})

// we will run authentication on all internal routes
const authentication = catchAsync(async (req, res, next) => {
    // 1. get the token from header
    // 2. verify the token
    // 3. return the user detail from db in request obj

    let idToken = '';
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // we split since what we get is Bearer sioehfioaw
        idToken = req.headers.authorization.split(' ')[1];

        if (!idToken) {
            return next(new AppError('Please login to get access'));
        }

        const tokenDetail = jwt.verify(idToken, process.env.JWT_SECRET);

        //if token invalid
        const freshUser = user.findByPk(tokenDetail.id)

        if (!freshUser) {
            return next(new AppError('User no longer exists', 400));
        }
        req.user = await freshUser;
        return next();
    } else {
        return next(new AppError('Please login to get access'));
    }
});

module.exports = { signup, login, authentication };
