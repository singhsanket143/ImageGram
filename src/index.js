
import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';
import multer from 'multer';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import {options} from './utils/swaggerOptions.js';
import ip from 'ip';

const PORT = process.env.PORT || 3000; // port number

const app = express(); // create express app server instance

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());

const swaggerDocs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/api", apiRouter); // If the url starts with /api then the request is forwarded to the apiRouter



app.get('/ping', (req, res) => {
    console.log(req.query);
    console.log(req.body);
    console.log(req.user);
    const ipaddr = ip.address();
    return res.json({ message: 'pong' + ipaddr });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});


// client. -----> LB ------> server1
//                   ------> server2                   