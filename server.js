import express from 'express';
import initMongoClient from "./utilities/mongoConnect.js";
import dotenv from "dotenv";
import cryptoRoutes from './routes/cryptoRoutes.js';
import {startCryptoJob} from './jobs/cryptoJob.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

await initMongoClient();

// Start the background job
startCryptoJob();

app.get('/', (req, res) => {
    res.send(
        `Welcome by Jaimin Detroja :) \nMy Portfolio Link : https://jaimin-detroja.vercel.app`);
});

// Use crypto routes
app.use('/', cryptoRoutes);

app.use("*", (req, res) => {
    res.status(404).send('Not Found');
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).send(error.message || 'Unknown error');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
