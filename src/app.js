import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());
app.use(router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});
