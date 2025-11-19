import userModel from "../models/userModel.js";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const loginUser = async(req,res) =>{
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Not Registered"});
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Enter Valid id and password"})
        }

        const token = createToken(user)
        return res.json({success:true,token,user:{
            role:user.role,
            _id:user._id
        }})
        
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Login Error"})
        
    }
}

const createToken = (user) => {
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET);
}

const registerUser = async(req,res) =>{
    const {name,password,email,role,adminKey} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"User Already Exist"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Please Enter valid email'})
        }

        if(password.length<8){
            return res.json({success:false,message:'Password Must be atleast 8 characters'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        let finalRole = 'user';
        if(role === 'admin'){
            if(adminKey&&adminKey === process.env.ADMIN_KEY){
                finalRole = 'admin'
            }
            else{
                return res.json({success:false,message:"Invalid Admin Key"})
            }
        }
        if(role === 'superAdmin'){
            if(adminKey&&adminKey === process.env.SUPER_ADMIN_KEY){
                finalRole = 'superAdmin'
            }
            else{
                return res.json({success:false,message:"Invalid Super Admin Key"})
            }
        }

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            role:finalRole
        })

        const user = await newUser.save();
        const token = createToken(user);

        return res.json({success:true,token,user:{
            _id:user._id,
            role:user.role
        }})

        
    } catch (error) {
        return res.json({success:false,message:"This is Error"})
        console.log(error);
        
    }
}

export {loginUser,registerUser}