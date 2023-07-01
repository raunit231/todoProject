import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/task.js';
import mongoose from 'mongoose';
import {verifyUser} from './middleware/auth.js'

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy : "cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json({limit: '30mb', extended:true}));
app.use(bodyParser.urlencoded({ limit:'30mb', extended:true}));
app.use(cors());

// Routes

app.use("/auth",authRoutes);
app.use("/task",verifyUser,taskRoutes);

// Mongoose setup 
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}  and Mongoose connected:${mongoose.connection.host}`)))
.catch((error) => console.log(`${error} did not connect`));