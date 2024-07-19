import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT); 

app.get('/', (req, res) => {
    res.send('Running API');
});

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connection success");
    app.listen(PORT, function(err){
        if (err) console.log("Error in server setup");
        console.log("Server listening on Port", PORT);
    })
}).catch(() => {
    console.log("MongoDB connection failed")
})