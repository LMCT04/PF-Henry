const server = require("./src/app.js");
const { conn } = require("./src/database.js");
const PORT = process.env.PORT || 3001;

// Syncing all the models at once.
server.listen(PORT, async () => {
  await conn.sync({ alter: true });
  console.log("%s listening at 3001");
}); 
