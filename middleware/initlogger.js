const logger = (req , res , next) => {
    console.log('starting point for every hit' );
    next();
}
module.exports=logger;