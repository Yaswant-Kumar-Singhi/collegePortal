//require global files
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const fs = require("fs")

// app
const app = express();

const db = require("./config/mongoose")
/* const authRoute = require("./routes/auth")*/

//app.use('/api',authRoute)

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());


//autoroutes
fs.readdirSync('./routes').map((r)=>{
    app.use('/api',require('./routes/' + r))
})


// port
const port = 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
