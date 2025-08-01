const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();

const dbPath = path.join(__dirname, "covid19India.db");
let db = null;

const InitializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server listening at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

InitializeDBAndServer();

app.get("/states", async (request, response) => {
  const getStatesQuery = `select * from state order by state_id;`;
  const states = await db.all(getStatesQuery);
  response.send(states);
});

app.get("/states/:stateId", async (request, response) => {
  const { stateId } = request.params;
  const getStateById = `
    select * from state where state_id=?;
    `;
  const state = await db.get(getStateById, stateId);
  response.send(state);
});
