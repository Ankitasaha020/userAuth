import jwt from "jasonwebtoken";
import UserModel from "../models/User.js";

var checkUserAuth = async(req,res,next)=>{
    let token;
    const {authorization}=req.headers;
}