import mongoose from "mongoose"

export const connection = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("DB Connected"))
        .catch(() => console.log("DB Failed"))
}