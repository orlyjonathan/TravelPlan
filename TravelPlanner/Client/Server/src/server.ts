import express from 'express';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'; 
import 'dotenv/config';
import cors from 'cors'; //npm install cors

const app = express()
const port = process.env.PORT || 3000;
const dbPassword=process.env.DBPASSWORD as string;

app.use(cors());
app.use(express.json());
app.use(express.static('client/build'));
app.use(cookieParser());


//DB
const DBurl = process.env.DB_URL;
const database = process.env.DB_NAME;
console.log(DBurl,database)

//connection
mongoose.connect(`${DBurl}/${database}`).then(()=>{
    console.info("DB connected")
}).catch((err)=>{
    console.error(err)
});

//routes
import authRoutes from './routes/authRoutes';
app.use("/api/auth", authRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

