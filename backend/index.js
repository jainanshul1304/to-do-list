require("dotenv").config();
const db = require("./db/db");
const express = require("express");
const Port = process.env.PORT;
const mailRoutes = require("./routes/mailRoutes");
const loginRoutes = require("./routes/loginRoutes");
const registerRoutes = require("./routes/registerRoutes");
const cors = require("cors");
const { consumer, mailStatus } = require("./services/queueService");
const app = express();

app.use(express.json());

app.use(cors(
  {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    contentType: "application/json"
  }
));

app.listen(Port, () => {
  console.log(`App is listening at ${Port}`);
});

app.use("/api/emails", mailRoutes);

app.use("/users",loginRoutes);

app.use("/users",registerRoutes);
