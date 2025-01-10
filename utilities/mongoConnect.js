import mongoose from "mongoose";

const initMongoClient = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log("Error to connect mongodb : ", err);
    })
}

export default initMongoClient;
