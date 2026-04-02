import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI! 

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}
// console.log("MONGODB_URI", MONGODB_URI)

interface MongooseConnection {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

let cached: MongooseConnection = {
  conn: null,
  promise: null,
}   

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  } 
    if (!cached.promise) {  
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose
        })
    }
    cached.conn = await cached.promise
    return cached.conn
}

export default connectToDatabase