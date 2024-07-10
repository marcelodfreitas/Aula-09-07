const express = require("express");
const cors = require("cors");

const port = 3000;

const app = express();
const userRouter = require("./routes/users");

app.use(express.json());
app.use(cors());

// Use the userRouter for the /users endpoint
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

