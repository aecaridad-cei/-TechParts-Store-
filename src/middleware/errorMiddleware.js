const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        error: "Ruta no encontrada (404)",
        message: `No existe el endpoint ${req.method} ${req.originalUrl}`
    })
}

const errorHandler = (err, req, res, next) => {
    
    let statusCode = errorHandler.statusCode || 500
    let message = errorHandler.message || "Error interno del servidor"

    if(err.name === "CastError"){
        statusCode = 400
        message = `Formato de ID invalido: ${err.values}`
    }

    if(err.name === "ValidationError"){
        statusCode = 400
        message = Object.values(err.errors)
        .map((val)=>val.message)
        .join(", ")
    }

    res.status(statusCode).json({
        success: false,
        error: statusCode === 500 ? "Internal Server Error" : "Bad Request",
        message: message
    })
}
export { notFound, errorHandler}