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
            
            res.status(200).json({success: true, data: "User Added Successfully"});
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

    static async getUserById(req,res,next){
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
}

module.exports = User;