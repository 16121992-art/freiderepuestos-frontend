// backend/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ mensaje: 'Acceso denegado: Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // opcional, por si necesitas acceder al email
    next();
  } catch (error) {
    res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
}

module.exports = authMiddleware;