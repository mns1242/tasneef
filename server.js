import express from 'express';
import cookieParser from "cookie-parser"
import cors from "cors";
import projectsRoute from './routes/projectsRoute.js';
import adminRoute from './routes/adminRoute.js';
import homeRoute from './routes/homeRoute.js';
import servicesRoute from './routes/servicesRoute.js';
import offersRoute from './routes/offersRoute.js';
import contactRoute from './routes/contactRoute.js';
import { ENV_VARS } from './config/envVars.js';

const app = express();

app.use(cors());
app.use(express.json()); 
app.set("view engine", "ejs");
app.use(cookieParser())
app.use(express.static("public"));

app.use("/home",homeRoute);
app.use("/services",servicesRoute);
app.use("/contact",contactRoute);
app.use("/offers",offersRoute);
app.use('/projects', projectsRoute);
app.use('/admin', adminRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the ES6 Node.js and Express Server!');
});

app.listen(ENV_VARS.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${ENV_VARS.PORT}`);
});