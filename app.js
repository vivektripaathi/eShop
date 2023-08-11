const app = require('express')(); 
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose')
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')
require('dotenv/config')
const api = process.env.API_URL

// Cors allows any type of application to request api
app.use(cors());
app.options('*', cors());

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler());

//Routes
const productRouter = require('./routes/product')
const categoriesRoute = require('./routes/categories')
const userRoute = require('./routes/user')

app.use(`${api}/products`, productRouter)
app.use(`${api}/categories`, categoriesRoute)
app.use(`${api}/users`, userRoute)

// Database Connection
mongoose
.connect(process.env.CONNECTION_STRING, {useNewUrlParser: true})
.then(()=>{
    console.log("Connected to DB")
})
.catch(err => console.log(err))

// Server
app.listen(3000, ()=>{
    console.log("PORT : 3000")
});

