import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import multer from 'multer';

const PORT = 3000; // port number

const app = express(); // create express app server instance

const upload = multer();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.use('/api', apiRouter);// If the url starts with /api then the request is forwarded to the apiRouter

app.get('/ping', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    return res.json({ message: 'pong' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
