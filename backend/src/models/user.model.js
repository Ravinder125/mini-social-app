import bcrypt, { hash } from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    if (!enteredPassword) throw new Error("Entered password is required")
    const isMatch = await bcrypt.compare(enteredPassword, hash)
    return isMatch
}

const User = mongoose.model("User", userSchema)

export default User