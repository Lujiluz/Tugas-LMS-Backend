import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const mongoUri: string = process.env.MONGO_URI as string;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoUri)
        console.log('Koneksi ke database berhasil, cuyy!🚀')
    } catch (err) {
        console.error('Koneksi ke database gagal, wak!😞', err)
    }
}

export default connectToDatabase