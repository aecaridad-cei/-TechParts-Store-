const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada (404)",
    message: `No existe el endpoint ${req.method} ${req.originalUrl}`,
  });
};

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || err.status || 500;
  let message = err.message || "Error interno del servidor";

  if (err.name === "CastError") {
    statusCode = 400;
    message = `Formato de ID inválido: ${err.value}`;
  }

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((validationError) => validationError.message)
      .join(", ");
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "A record with the provided unique value already exists";
  }

  res.status(statusCode).json({
    success: false,
    error: statusCode >= 500 ? "Internal Server Error" : "Bad Request",
    message: message,
  });
};

export { notFound, errorHandler };
