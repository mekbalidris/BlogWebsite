import mongoose from "mongoose"


export const ConnectDB = async () => {
    await mongoose.connect("mongodb+srv://mekbalidriss:idris2005@backenddb.7c6z7.mongodb.net/Blog-NextJS")
    console.log("DB connected")
}