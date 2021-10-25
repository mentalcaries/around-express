const express = require("express");

const app = express();
const { PORT = 3000 } = process.env;
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");

app.listen(PORT, () => {
  console.log("Server is serving the servants");
});

app.use("/cards", cardRouter);

app.use("/users", userRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
