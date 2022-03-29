const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectToMongo();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/product", require("./routes/product"));
app.use("/api/order", require("./routes/order"));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
