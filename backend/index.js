require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const diagnoseRoute = require("./routes/diagnoseRoute");
const symptomRoutes = require("./routes/symptoms");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.use("/api/symptoms", symptomRoutes); 
app.use("/api/diagnose", diagnoseRoute);


app.listen(5000, () => console.log("Server running on port 5000"));