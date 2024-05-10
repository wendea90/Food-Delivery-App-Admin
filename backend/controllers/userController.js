import userModel from "../models/userModel.js";
//create authentication
import jwt from "jsonwebtoken";
// to encrypt the user data and store in data base
import bcrypt from "bcrypt";
// using this validetor package we will check password / email id valid / not
import validator from "validator";



//create 2 fun

//! 1st login user
//USER registered API successfully working now we will create the API using that our registered user can login

const loginUser = async (req, res) => {
    //to login user we need 1st the user email and password fro req.body
    const { email, password } = req.body;

    try {
        //1st check whether user is avaliable with this email id, so if any user avali then that user account will be stored in this user variable
        const user = await userModel.findOne({ email });

        //2nd check we will get any user or not
        //if we do't have user return res.json({su..})
        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" })
        }


        //if we are getting the user we will match the password with strong pw in db
        const isMatch = await bcrypt.compare(password, user.password)

        //if mismatch
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        //if pw is matching - we will generete one token - we send users id and send it as a res
        const token = createToken(user._id);
        res.json({ success: true, token })

    } catch (error) {
        //in this all process if we get err
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

//now test -TC new req, post , url enter /login, body, {email&pw} send and res-successfully login return succ-true&token
//now we can allow user to login &create account on web page using this api






//create token for below, id is self gen't in mdb
const createToken = (id) => {
    //it will store id(as data) &provide salt using that our data will be encrypted for that in backend in .env file add jwt_secret & include in server.js for supp..
    return jwt.sign({ id }, process.env.JWT_SECRET)
}




//! 2nd register user
const registerUser = async (req, res) => {
    //1st destructure that name email and password from usermodel
    const { name, password, email } = req.body
    //wil be stored
    try {
        //checking is user already exists
        //1st check if any user exist with email any email user already availabe with this email id we will generete one res
        const exists = await userModel.findOne({ email });
        if (exists) {
            //if any email id is available in taht case return
            return res.json({ success: false, message: "User already exists" })
        }

        //validating email format and strong password
        if (!validator.isEmail(email)) {
            //if the email is not valid 
            return res.json({ success: false, message: "Please enter a valid email" })
        }

        //if email valid lets check password length
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        //if this if a statement is not excuted it means the email and pw is valid then create account before taht hash pw
        //hashing user pw
        const salt = await bcrypt.genSalt(10)
        //create encrypted pw
        const hashedPassword = await bcrypt.hash(password, salt);

        //create a new user
        const newUser = new userModel({
            //we will get this from req.body above
            name: name,
            email: email,
            //in password we will use hashed pw
            password: hashedPassword,
        })

        //save user in database 
        //so after saving this data we will store that user in this user var
        const user = await newUser.save()

        //create one token by usinguser id- we will send that token using res to the user, 1st create above fun
        const token = createToken(user._id)

        //send this token as response
        res.json({ success: true, token });


    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
//we have created API to create the usre to use this registered

//so lets test TC - new req - post - http.../4000/api/user/register, body -{name, emmail, password fill}
//USER registered API successfully working now we will create the API using that our registered user can login


export { loginUser, registerUser }