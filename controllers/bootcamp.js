// Description - Get All Bootcamps
// Access - Public
exports.getBootcamps = (req,res,next) => {
    res.status(200).json({ 
        success : true,
        msg : "Show all bootcamps"
    });
}

// Description - Get Particular Bootcamp
// Access - Public
exports.getBootcampWithId = (req,res,next) => {
    res.status(200).json({ 
        success : true,
        msg : "Bootcamp " + req.params.name
    });
}

// Description - Create New Bootcamp
// Access - Private
exports.createBootcamp = (req,res,next) => {
    res.status(200).json({ 
        success : true,
        msg : "Create new bootcamp"
    });
}

// Description - Update Bootcamp
// Access - Private
exports.updateBootcamp = (req,res,next) => {
    res.status(200).json({ 
        success : true,
        msg : "Update bootcamp "+req.params.name
    });
}

// Description - Delete Bootcamp
// Access - Private
exports.deleteBootcamp = (req,res,next) => {
    res.status(200).json({ 
        success : true,
        msg : "Delete bootcamp "+req.params.name
    });
}