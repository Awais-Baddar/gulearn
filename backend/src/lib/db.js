import mongoose from 'mongoose'


export const connectDB= async ()=>{

    try {
        const dbConnect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database Successfully Connected : ${dbConnect.connection.host}`)
        
    } catch (error) {
        console.log('Not Connected',error)
        process.exit(1)
    }
}