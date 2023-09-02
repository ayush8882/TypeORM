import AppDataSource from "./data-source";
const express = require("express");
import companyRouter from './routes/company'
// import productRouter from './routes/'
const app = express();
app.use(express.json());

app.use('/', companyRouter);
app.listen(3000, () => {
  console.log("Listening at port 3000");
});
