require("dotenv").config();
const user = require("../db/models/user");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRES_IN
    })
}

const signup = catchAsync(async (req, res, next) => {
    const body = req.body;

    
        const newUser = await user.create({
            userType: body.userType,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            confirmPassword: body.confirmPassword
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

    return res.json({
        status: "success",
        token
    })
})

module.exports = { signup, login };
