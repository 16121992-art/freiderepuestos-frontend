// backend/routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Usuario hardcodeado para admin
const ADMIN_USER = {
  email: 'admin@freiderepuestos.com',
  password: 'admin1234' // Usa una contraseña segura en producción
};

// Login - devuelve un token JWT
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }

  res.status(401).json({ mensaje: 'Credenciales inválidas' });
});

module.exports = router;
