const pool = require("./connection");

let createTableMenu = `
  CREATE TABLE Menu (
  "id" SERIAL PRIMARY KEY, 
  "nama" VARCHAR(50),
  "description" TEXT,
  "imageURL" TEXT, 
  "harga" INT, 
  "tagmenu" VARCHAR(10)
);
`;

async function runSetup() {
  try {
    await pool.query(createTableMenu);
    console.log("Success setup table Menu");
  } catch (error) {
    console.log(error);
  }
}

runSetup();
