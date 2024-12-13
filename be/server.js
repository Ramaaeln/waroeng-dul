const express = require('express')
const app = express()
const pool = require('./connection')
const cors = require('cors');
app.use(cors());

app.get("/menu", async (request, response) => {
  try {
    const data = await pool.query(`SELECT * FROM menu`);

    let dataMenu = data.rows;

    response.json(dataMenu);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
});


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})  