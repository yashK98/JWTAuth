const userModel = require('../models/User');
const ErrorResponse = require('../utils/ErrorHandler');

class User{
    static async addUsers(req,res,next){
        try{
            console.log(req.body.name);
            const user = await userModel.create(req.body);

            if(!user){
                console.log("Failed to add the user");
                next(new ErrorResponse("Failed To Add User",404));
            }

            const token = user.getSignedJwtToken();
            res.status(200).json({success: true, data: "User Added Successfully", token: token});
        }catch(err){
            console.log(err.message);
            next(new ErrorResponse("Failed To Add User",404));
        }
    }

    static async getUsers(req,res,next){
        try{
            const user = await userModel.find();
            console.log(user);
            
            if(!user || user.length === 0){
                console.log("Failed to Fetch Users");
                next(new ErrorResponse("Failed To Fetch Users",404));
            }
            
            res.status(200).json({success: true, data: user});
        }catch(err){
            console.log(err.message);
            next(new ErrorResponse(err.message,404));
        }
    }

    static async getUserByName(req,res,next){
        try{
            let user = await userModel.findById(req.params.name);
            console.log(user);
            
            if(user === null){
                next(new ErrorResponse("User Not Found",404));
            }
    
            res.status(200).json({success: true, data: user});            
        }catch(err){
            console.log(err.message);
            //res.status(400).json({success:false, error:"Invalid Name"});
            next(new ErrorResponse("User not found",404));
        }

    }

    static async signInUser(req,res,next){
        try{
            const {email, password} = req.body;
            console.log(email);
            console.log(password);

            // Validate Email & Password
            if(!email || !password){
                next(new ErrorResponse("Provide Correct Email and Password",404));
            }

            // Check for user
            const user = await userModel.findOne({email: email});
            if(!user){
                next(new ErrorResponse("User Not Found",404));
            }

            // Check for password
            const isMatch = await user.matchPassword(password);
            if(!isMatch){
                next(new ErrorResponse("Invalid Password Bro",404));
            }
            
            const token = user.getSignedJwtToken();
            res.status(200).json({success: true, token: token});
        }catch(err){
            console.log(err);
            next(new ErrorResponse("Invalid Credentials",404));
        }
    }
}

module.exports = User;