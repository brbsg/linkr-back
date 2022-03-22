import express, { json } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(json())

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Running on ${PORT}`);
});
