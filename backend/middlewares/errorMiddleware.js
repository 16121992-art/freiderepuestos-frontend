/ backend/middlewares/errorMiddleware.js

// Middleware para manejar rutas no encontradas (404)
export const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Middleware general para manejo de errores
export const errorHandler = (err, req, res, next) => {
  // Si el status no está definido, asumimos 500 (error interno)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // Solo mostrar stack trace en desarrollo
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};