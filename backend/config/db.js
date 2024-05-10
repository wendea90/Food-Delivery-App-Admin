// //!open config folder and create db.js file - create logic that we can connect with the database
// //1.connect to mdb and 2.integrate in server.js
// import mongoose from "mongoose";

// export const connectDB = async () => {
//     await mongoose.connect('mongodb+srv://wendeawano90:e37enHNJV0ooKlJN@cluster0.47giv9i.mongodb.net/food-del').then(() => console.log("DB Connected"));
// }


import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
};

