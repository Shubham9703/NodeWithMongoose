const jwt=require('jsonwebtoken');

    const authorization = (req,res,next)=>{
        let token= req.headers.authorization;
        if(token){
            // token.split(" ")[1];
            jwt.verify(token,"the-super-strong-secrect",(err,decoded)=>{
                if(err){
                    console.log(err);
                    return res.json({
                        status:404,
                        message:`Invalid or unauthorized token`
                    })      
                }
                req.id=decoded.id;
                req.email=decoded.email;
                next();
            })
        }else{
            console.log(token);
            return res.json({
                status:303,
                message:"please provide token"
            })
        }
    }


module.exports=authorization;