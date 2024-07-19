import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import fs from 'fs';
import mongoose from 'mongoose';
import https from 'https';
import http from 'http';


const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT); 

app.get('/', (req, res) => {
    res.send('Running API');
});

const options = {
    key: fs.readFileSync('./key.pem', 'utf8'),
    cert: fs.readFileSync('./cert.pem', 'utf8')
};
const httpsServer = https.createServer(options, app);

/*app.listen(PORT, function(err){
    if (err) console.log("Error in server setup");
    console.log("Server listening on Port", PORT);
})*/

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connection success");
    httpsServer.listen(PORT, '0.0.0.0', () => {
        console.log("Server listening at port "+PORT);
    });
}).catch(() => {
    console.log("MongoDB connection failed");
});