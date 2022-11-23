const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 8000;
const cors = require('cors');
const userCreate = require('./models/User');
require("./db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//console.log(process.env.MONGO_URL);
app.use("/users", require("./routes/users"));
app.use("/interviews", require("./routes/interview"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
//userCreate.createUser();
app.listen(port, () => {
  console.log("app is running on port 8000");
});
