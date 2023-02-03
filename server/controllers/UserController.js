import UserModel from '../models/User.js';
import bcrypt from "bcrypt";//decryption and encryption
import jwt from 'jsonwebtoken';


class UserController {
    static userResgistration = async (req, res) => {
        const { name, email, password, password_confirmation } = req.body
        const user = await UserModel.findOne({ email: email })//to check if user is already registered by this email
        if (user) {
            res.status(409).send({ status: "failed", message: "Email already exists" });
        }
        else{
            if(name && email && password && password_confirmation){
                if(password == password_confirmation)
                {
                    try{
                        const salt = await bcrypt.genSalt(10);
                        console.log(salt)
                        const hashPassword = await bcrypt.hash(password,salt);
                        console.log(hashPassword)
                        const user = new UserModel({
                            name: name,
                            email: email,
                            password: hashPassword,
                        })
                        await user.save();
                        //generate jwt token
                        const saved_user = await UserModel.findOne({ email:email });
                        const token = jwt.sign({userID: saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
                        
                        res.status(201).send({sataus:"success",message:" successfully registered",token:token});

                    }
                    catch(e){
                        console.log(e);
                        res.status(500).send({status: "failed", message:"Uable to register"});
                    }
                }
                else{
                    res.status(400).send({status: "failed", message:"password should be match"});
                }

            }
            else{
                res.status(400).send({ status: "bad request", message: "All fields are required" });
            }
        }
    }

    //login function
    static userLogin = async(req,res)=>{
        try {
            const {email,password} = req.body;
            if(email && password){
                const user = await UserModel.findOne({email:email});
                if(user!=null)
                {
                    const isMatch= await bcrypt.compare(password, user.password);
                    console.log(isMatch)
                    if( (user.email===email) && isMatch){
                        const token = jwt.sign({userID: user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
                        res.status(200).send({status:"success",message:"successfully logged in",token:token});
                    }
                    else{
                        res.status(404).send({status: "failed", message:"email or password is incorrect"});
                    }
                }
                else
                {
                    res.status(404).send({status: "failed", message:"You are not registered user"});
                }
            }
            else{
                res.status(400).send({status: "failed", message:"All filled are requeried"});
            }
            
        } catch (error) {
            res.status(500).send({status: "failed", message:"unable to login"});
        }
    }
}


export default UserController;