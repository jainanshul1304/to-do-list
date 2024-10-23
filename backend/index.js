require("dotenv").config();
const db = require("./db/db");
const express = require("express");
const app = express();
const Port = process.env.PORT;
app.use(express.json());
app.listen(Port, () => {
  console.log(`App is listening at ${Port}`);
});
const cors = require("cors");
app.use(cors());

app.post("/todo", (req, res) => {
  const { description, status, dateString } = req.body;
  const query = "INSERT INTO todo (description, done, date) VALUES (?,?,?)";
  const Values = [req.body.description, req.body.status, req.body.dateString];
  db.query(query, Values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res
      .status(201)
      .json({ id: data.insertId, description, status, dateString });
  });
});

app.get("/todo", (req, res) => {
  const query = "SELECT * FROM todo";

  db.query(query, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
});

app.post("/login", (req, res) => {
  const { email_id, password } = req.body;
  const query = "SELECT * FROM UserList WHERE email=? AND password=? ";
  const Values = [req.body.email_id, req.body.password];
  db.query(query, Values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    if (results.length > 0) {
      console.log("Authenticated!");
      return res.status(201).send(true);
    } else {
      console.log("I don't know you");
      return res.status(401).send(false);
    }
  });
});

app.post("/addUser",(req,res)=>{
  const {email_id, password} = req.body;
  console.log("Request Body:", req.body);
  const query = "INSERT INTO UserList (email,password) VALUES(?,?)";
  const Values = [req.body.email_id, req.body.password];

  db.query(query,Values, (err,results)=>{
    if(err){
      console.log(err);
    }
    return res.status(201).json({email_id,password});
  })
})