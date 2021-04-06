const Bootcamp = require('../models/Bootcamp');

// Description - Get All Bootcamps
// Access - Public
exports.getBootcamps = async(req,res,next) => {
    try{
        const bootcamp = await Bootcamp.find();
        res.status(200).json({ success: true, count: bootcamp.length , data: bootcamp});
    }catch(err){
        console.log(err.message);
        res.status(400).json({ success: false, error: err.message});
    }
}

// Description - Get Particular Bootcamp
// Access - Public
exports.getBootcampWithId = async(req,res,next) => {
    try{
        const bootcamp = await Bootcamp.findById(req.params.id);
        if(!bootcamp){
            res.status(400).json({success:false}); 
        }

        res.status(200).json({success:true, data: bootcamp});
    }catch(err){
        console.log(err.message);
        res.status(400).json({success:false, error: err.message});
    }
}

// Description - Create New Bootcamp
// Access - Private
exports.createBootcamp = async (req,res,next) => {
    try{
        const bootcamp = await Bootcamp.create(req.body);
        
        res.status(201).json({
            success: true,
            data: bootcamp
        });
    }catch(err){
        console.log(err.message);
        res.status(400).json({ success: false, error: err.message});
    }
}

// Description - Update Bootcamp
// Access - Private
exports.updateBootcamp = async(req,res,next) => {
    try{
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
    
        if(!bootcamp){
            return res.status(400).json({success:false});
        }
    
        res.status(200).json({ success:true, data: bootcamp});
    }catch(err){
        console.log(err.message);
        res.status(400).json({ success: false, error: err.message});
    }

}

// Description - Delete Bootcamp
// Access - Private
exports.deleteBootcamp = async(req,res,next) => {
    try{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        
        if(!bootcamp){
            return res.status(400).json({success:false});
        }

        res.status(200).json({ success:true, data:{} });
    }catch(err){
        console.log(err.message);
        res.status(400).json({ success: false, error: err.message});
    }
}