const MONGODB_URI = process.env.MONGODB_URI as string

if(!MONGODB_URI){
    throw new Error("")
}