const pool = require("./connection");
const data = require("./data.json");

let newData = data.map((el) => {
  return `('${el.nama}', '${el.description}', '${el.imageURL}', '${el.harga}', '${el.tagmenu}')`;
});

let newDataToInsert = newData.join(",");

let seedDataQuery = `
  INSERT INTO Menu ("nama", "description", "imageURL", "harga", "tagmenu")
  VALUES ${newDataToInsert}
`;

async function runSeed() {
  try {
    await pool.query(seedDataQuery);
    console.log("Success seed table menu");
  } catch (error) {
    console.log(error);
  }
}

runSeed();
