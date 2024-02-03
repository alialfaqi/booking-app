import express from "express"
import { getAllUsers, signIn, signUp } from "../controller/user.controller.js"

const router = express.Router()

router.get("/", getAllUsers)
router.post("/register", signUp)
router.post("/login", signIn)


export default router