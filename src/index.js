import dotenv from 'dotenv';
import express from 'express'
import cors from 'cors';
import fs from 'fs';
import https from 'https';
import mongoose from 'mongoose';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = isNaN(parseInt(process.env.PORT)) ? 3000 : parseInt(process.env.PORT); 

app.get('/', (req, res) => {
    res.send('Running API');
});

const options = {
    key: fs.readFileSync('./localhost-key.pem', 'utf8'),
    cert: fs.readFileSync('./localhost.pem', 'utf8')
};
const httpsServer = https.createServer(options, app);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("MongoDB connection success");
    httpsServer.listen(PORT, () => {
        console.log("Server listening at port "+PORT);
    });
}).catch(() => {
    console.log("MongoDB connection failed")
}).catch(() => {
    console.log("MongoDB connection failed");
})