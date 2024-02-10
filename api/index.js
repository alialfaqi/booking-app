import express from "express"
import cors from "cors"
import { connection } from "./db.js";
import * as dotenv from 'dotenv'
import { userModel } from "./models/user.model.js";
import bcrypt from "bcryptjs"
import multer from "multer";
import cookieParser from "cookie-parser";
import download from "image-downloader"
import userRouter from "./routes/user.router.js"
dotenv.config();
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from "fs"
import { placeModel } from "./models/Place.model.js";

const app = express();
const port = 4000;
connection();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const bcryptSalt = bcrypt.genSaltSync(10)

app.use(express.json())
app.use(express.urlencoded({ extended: true })) //for parsing form-data
app.use(cookieParser())
app.use("/uploads", express.static(__dirname + "/uploads"))
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

const photosMiddleware = multer({ dest: "uploads/" })

const upload = multer({ dest: "uploads/" })
app.post('/upload', upload.array("photos", 100), (req, res, next) => {
    const uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const parts = originalname.split(".");
        const extension = parts[parts.length - 1]
        const newPath = path + "." + extension
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace("uploads\\", ""))
    }

    res.json(uploadedFiles)
})

app.post("/places", async (req, res, next) => {
    const data = req.body;
    const result = await placeModel.create(data)
    res.json(result)
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