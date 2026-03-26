import User from "../models/user.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import generateToken from "../utils/generateToken.js";

export const signup = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new ApiError(400, "User exists with email ")
    }

    const user = await User.create({
        name,
        email,
        password
    });

    const responseData = {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id)
    }

    return res
        .status(201)
        .json(new ApiResponse(201, responseData, "User created"));

});

export const login = asyncHandler(async (req, res) => {

});