const server = require("./src/app.js");
const { conn } = require("./src/database.js");

// Syncing all the models at once.
server.listen("3001", async () => {
  await conn.sync({ alter: true });
  console.log("%s listening at 3001");
});
