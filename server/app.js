require("dotenv").config();
const express = require("express")
const authRouter = require("./routes/authRoute")
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'sucess',
        message: "You have connected into WageSecure API",
    })
})

// all routes here
app.use('/api/v1/auth', authRouter);


app.use('*', (req, res, next) => { // to handle routes that do not appear
    res.status(404).json({
        status: 'fail',
        message: 'Route is not found'
    })
})


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});