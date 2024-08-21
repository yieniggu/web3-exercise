const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");
require("dotenv").config();

const app = express();

dbConnection();

app.use(express.json());
app.use(cors());
app.options('*', cors())

app.use("/buyer", require("./routes/buyer"))
// app.use("/seller", require("./routes/seller"))
app.use("/history", require("./routes/history"))

// Listen requests
app.listen(process.env.PORT, () => {
  console.log("[SV] Server running on port", process.env.PORT);
});