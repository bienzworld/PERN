const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.post("/query", async (req, res) => {
  try {
    const { description } = req.body;
    const newQuery = await pool.query(
      "INSERT INTO query (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newQuery.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/query", async (req, res) => {
  try {
    const allQuery = await pool.query("SELECT * FROM query");
    res.json(allQuery.rows);
  } catch (err) {
    console.error(err.message);
  }
});


app.get("/query/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = await pool.query("SELECT * FROM query WHERE query_id = $1", [
      id
    ]);

    res.json(query.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a query

app.put("/query/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateQuery = await pool.query(
      "UPDATE query SET description = $1 WHERE query_id = $2",
      [description, id]
    );

    res.json("Query was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a query

app.delete("/query/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteQuery = await pool.query("DELETE FROM query WHERE query_id = $1", [
      id
    ]);
    res.json("Query was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
