const express = require('express');
const mongoose = require('mongoose');
const authenticate = require('./authorize/authorization.js');
const cors = require('cors');
require('dotenv').config()
const app = express();
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true
}).then((connec)=>{
    console.log("Successfull connection to db");
}).catch((err)=>{
    console.log(err);
    console.log("Error connecting to db");
});
const corsOptions = {
    origin: '*',
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use('/user',require("./routes/loginroute.js"));
app.use('/budget',authenticate,require("./routes/budgetroute.js"));
app.use('/expense',authenticate,require("./routes/expenseroute.js"))
app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port ${process.env.PORT}`)
});
