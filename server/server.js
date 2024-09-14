require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const dbConnect = require("./dbConnect");
const placeRoutes = require("./route/places");
const userRoutes = require("./route/user");

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", placeRoutes);
app.use("/api/auth", userRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
