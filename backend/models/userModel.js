import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    }
}, { minimize: false })
//if we do'nt add this false in that case this cart data will not be created b/c we have not provided any data here that is why we have added minimize false so that card data entry will be created without any data 


const userModel = mongoose.models.user || mongoose.model("user", userSchema);
//if the model is already created that model will be used, if the model is not created it will create the model


export default userModel;

//!user model has been created successfully