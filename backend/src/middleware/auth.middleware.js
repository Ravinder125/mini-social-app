import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/api-error.js';
import User from '../models/user.model.js';
import { asyncHandler } from '../utils/async-handler.js';

export const protect = asyncHandler(async (req, _, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Unauthorized request")
    }

    const token = authHeader.split(" ")[1];

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