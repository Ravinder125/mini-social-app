import mongoose from "mongoose"
import { ApiError } from "./api-error"

export const validateObjectId = (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid ID")
    }
}