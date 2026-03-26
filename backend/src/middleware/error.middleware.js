const errorHandler = (err, req, res, next) => {

    let statusCode = res.statusCode ?? 500;

    console.log(err)
    return res
        .status(statusCode)
        .json({
            message: err.message,
            stack: process.env.NODE_ENV === "production"
                ? null
                : err.stack

        });

};

export default errorHandler;