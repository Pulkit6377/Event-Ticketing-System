
export const authAdminMiddleware = async(req,res,next) =>{
    
    if(req.user.role === 'admin' || req.user.role === 'superAdmin'){
        next();
    }
    else{
        return res.json({success:false,message:"Access Denied. Admins Only"})
    }
}