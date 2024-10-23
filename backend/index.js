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
app.use(cors({ 
  origin: 'http://localhost:4200',  // Allow only Angular frontend
  methods: ['GET', 'POST', 'OPTIONS'],  // Allow required methods
  allowedHeaders: ['Content-Type'],  // Allow required headers
  credentials: true  // If cookies or auth headers are needed
}));


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

app.post('/login', (req, res) => {
  console.log('Received login request with data:', req.body);  // Log incoming data

  const { email, password } = req.body;  // Adjust field names if needed

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }

  const query = 'SELECT * FROM UserList WHERE email=? AND password=?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (results.length > 0) {
      return res.status(201).json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  });
});
