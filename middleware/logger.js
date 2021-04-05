// Middleware That shows all the Url Requests made
const logger = (req,res,next) => {
    let request_url = req.method + " " + req.protocol + "://" + req.get('host') + req.originalUrl;
    console.log(request_url);
    next();
};

module.exports = logger;