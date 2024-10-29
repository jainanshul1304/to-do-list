require("dotenv").config();
const Port = process.env.PORT;
const mailRoutes = require("./routes/mailRoutes");
const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
const {dbConnect}  = require("./db/db");
app.use(
  cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    contentType: "application/json",
  })
);
app.listen(Port, () => {
  console.log(`App is listening at ${Port}`);
  dbConnect();
});

app.use("/users", loginRoutes);

app.use("/users", registerRoutes);

app.use("/api/emails", mailRoutes);
