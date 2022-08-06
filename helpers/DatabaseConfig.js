const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database: connectedToDatabase");
  })
  .catch((error) => {
    console.error("Database-error:", error);
  });

mongoose.connection.on("connected", () => {
  console.log("Database.connection.connected: Mongoose conected to db.");
});

mongoose.connection.on("error", error => {
  console.log("Database.connection.error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database.connection.disconnected: Mongoose disconnected from db.");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});