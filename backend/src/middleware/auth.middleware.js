import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/api-error';
import User from '../models/user.model';

export const protect = asyncHandler(async (req, res, next) => {
    const headers = req.headers?.authorization.startsWith("Bearer")

    if (!headers) throw new ApiError(401, "Unauthorized request")

    const token = req.headers.authorization.split(" ")[1];

    if (!token) throw new ApiError(401, "Unauthorized request")

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
    )

    if (!decoded) throw new ApiError(401, "Unauthorized request")
    const user = await User.findById(decoded.id)

    if (!user) throw new ApiError(401, "Unauthorized request")

    req.user = user;
    next()
})