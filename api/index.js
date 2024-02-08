import express from "express"
import cors from "cors"
import { connection } from "./db.js";
import * as dotenv from 'dotenv'
import { userModel } from "./models/user.model.js";
import bcrypt from "bcryptjs"
import userRouter from "./routes/user.router.js"
import cookieParser from "cookie-parser";
import download from "image-downloader"

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const app = express();
const port = 4000;
connection();

export const bcryptSalt = bcrypt.genSaltSync(10)

app.use(express.json())
app.use(cookieParser())
app.use(cors());
// app.use(cors({ credentials: true, origin: "http://localhost:5173/" }))



app.use("/", userRouter)

app.post('/upload-by-link', async (req, res, next) => {
    const { link } = req.body
    const newName = Date.now() + ".jpg"
    await download.image({
        url: link,
        dest: __dirname + "/uploads/" + newName
    })
    res.send({ fileName: newName })
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).send({
        status: err?.statusCode,
        message: err?.message || "Internal Server Error",
        errors: err?.errors || []
    })
})

process.on("unhandledRejection", (err) => {
    console.log(err)
})


app.listen(port, () => console.log(`app is listening on port ${port}`))