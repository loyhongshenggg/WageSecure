require("dotenv").config();
const express = require("express")
const authRouter = require("./routes/authRoute");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const app = express();

app.use(express.json()); // converts data from req obj into json format


// all routes here
app.use('/api/v1/auth', authRouter);


app.use('*', catchAsync(async (req, res, next) => { // to handle routes that do not appear
    throw new AppError(`Can't find ${req.originalUrl} on this server`, 404) // next calls the next middleware, if put error, will call global error handler
    // res.status(404).json({
    //     status: 'fail',
    //     message: 'Route is not found'
    // })
}))

app.use(globalErrorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});