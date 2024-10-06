import express from 'express';
import connectDB from './config/dbConfig.js';
import { createPost } from './controllers/postController.js';
import { s3uploader } from './config/multerConfig.js';

const PORT = 3000; // port number

const app = express(); // create express app server instance

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

app.get('/ping', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    return res.json({ message: 'pong' });
});

app.post('/posts', s3uploader.single('image'), createPost);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
