
require('dotenv').config()
const express = require('express');
const app = express();
const mongoose= require('mongoose');
const morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));

app.use(require('./Routes/Auth/RegisterRoute'))
app.use(require('./Routes/Auth/LoginRoute'))
app.use(require('./Routes/Auth/SendOtpRoute'))
app.use(require('./Routes/Auth/VerifyOtpRoute'))
app.use(require('./Routes/Admin/AdminRoutes'))
app.use(require('./Routes/User/uerRoutes'))

const port = process.env.PORT || 3600;

const url = process.env.MONGODB_CONNECTION_URL
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected',(err)=>{
    if(err){
        console.log("failed to connect connect mongodb")
    }else{
        console.log("mongodb connected successfully")
    }
})

app.listen(port,()=>{
    console.log(`server started on ${port}`)
});

app.get('/',(req,res)=>{
res.json("welcome to Express")
})
