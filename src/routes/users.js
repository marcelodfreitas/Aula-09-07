const express = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { validateUserRegistration } = require("../middlewares/validation");

const router = express.Router();
const users = [];

// User registration
router.post("/signup", validateUserRegistration, async (request, response) => {
  const { name, email, password } = request.body;

  const emailAlreadyRegistered = users.find((user) => user.email === email);

  if (emailAlreadyRegistered) {
    return response.status(400).json({ message: "Email já cadastrado" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  users.push(newUser);

  response
    .status(201)
    .json({ message: "Conta criada com sucesso", user: newUser });
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;

  const user = users.find((user) => user.email === email);

  if (!user) {
    return response.status(404).json({
      message: "Usuário não encontrado",
    });
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return response.status(400).json({
      message: "Credenciais inválidas"
    });
  }

  response.status(200).json({
    message: "Login feito com sucesso",
    userId: user.id,
  });
});

module.exports = router;
