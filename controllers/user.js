const userModel = require('../models/User');

class User{
    static async addUsers(req,res,next){
        try{
            console.log(req.body.name);
            const user = await userModel.create(req.body);

            if(!user){
                console.log("Failed to add the user");
                res.status(400).json({success:false, error:"Failed to add the user"});
            }
            const token = user.getSignedJwtToken();
            res.status(200).json({success: true, data: "User Added Successfully", token: token});
        }catch(err){
            console.log(err.message);
            res.status(400).json({ success: false, error: err.message});
        }
    }

    static async getUsers(req,res,next){
        try{
            const user = await userModel.find();
            console.log(user);
            
            if(!user){
                console.log("Failed to add the user");
                res.status(400).json({success:false, error:"Failed to add the user"});
            }
            
            res.status(200).json({success: true, data: user});
        }catch(err){
            console.log(err.message);
            res.status(400).json({ success: false, error: err.message});
        }
    }

    static async getUserByName(req,res,next){
        try{
            console.log(req.params.name);
            let user = await userModel.find({ name: req.params.name });
            console.log(user);
            if(!user){
                console.log("Failed to add the user");
                res.status(400).json({success:false, error:"Failed to add the user"});
            }
            
            res.status(200).json({success: true, data: user});
        }catch(err){
            console.log(err.message);
            res.status(400).json({ success: false, error: err.message});
        }
    }

    static async signInUser(req,res,next){
        try{
            const {email, password} = req.body;
            console.log(email);
            console.log(password);

            // Validate Email & Password
            if(!email || !password){
                res.status(400).json({ success:false, error:"Bro, provide email and password"});
            }

            // Check for user
            const user = await userModel.findOne({email: email});
            if(!user){
                res.status(400).json({ success:false, error:"Bro, No Such user Is there "});
            }

            // Check for password
            const isMatch = await user.matchPassword(password);
            if(!isMatch){
                res.status(400).json({ success:false, error:"Bro, Password is Invalid "});
            }
            
            const token = user.getSignedJwtToken();
            res.status(200).json({success: true, token: token});
        }catch(err){
            console.log(err);
            res.status(400).json({ success: false, error: err.message});
        }
    }
}

module.exports = User;