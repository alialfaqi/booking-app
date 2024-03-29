import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { userModel } from "../models/user.model.js"
import { bcryptSalt } from "../index.js";
import AppError from "../utils/AppError.js";
import catchAsyncError from "../middlewares/cathcAsyncError.js";

const getAllUsers = async (req, res) => {
    const users = await userModel.find();
    res.json(users)
}

const signUp = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;
    const foundedUser = await userModel.findOne({ email })
    foundedUser && next(new AppError("Email is already exist", 409))
    const addedUser = await userModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.send({ addedUser, message: "success" })

})


const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const foundedUser = await userModel.findOne({ email })
    if (!foundedUser) return next(new AppError("User not Found", 500))
    const matched = bcrypt.compareSync(password, foundedUser.password)
    if (!matched) return next(new AppError("Wrong Password", 401))
    const token = jwt.sign({ id: foundedUser?._id, name: foundedUser?.name, email: foundedUser?.email }, "secretKey")
    res.cookie("token", token).json({ message: "success", token })
}

export {
    getAllUsers,
    signIn,
    signUp,
}



