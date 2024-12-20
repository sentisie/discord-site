const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { Pool } = require('pg');
require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());

const pool = new Pool({
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
	ssl: {
		rejectUnauthorized: false,
	 },
});

app.use(bodyParser.json());

app.post('/submit_form', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, subject, message]
    );
    res.status(200).json({ message: 'Form submitted successfully', id: result.rows[0].id });
  } catch (err) {
    console.error('Error inserting data into database:', err);
    res.status(500).json({ error: 'An error occurred while saving the data' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
