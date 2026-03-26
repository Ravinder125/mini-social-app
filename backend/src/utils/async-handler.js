const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next)
    } catch (error) {
        const message = error.message ?? "Internal Server Error"
        const code = error.status ?? 500
        res.status(code).json({
            success: false,
            message: message,
            data: null,
        })
    }
}