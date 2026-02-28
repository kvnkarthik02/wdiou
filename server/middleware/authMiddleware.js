const jwt = require('jsonwebtoken');
// code tutorial from https://towardsdev.com/jwt-middleware-in-express-apps-a-simple-guide-to-secure-authorization-a49d7e4c365a


module.exports = function auth(req,res, next){
    try {
        const header = req.headers.authorization || req.headers.Authorization
        if (!header) {
            return res.status(401).json({
                message: 'Unauthorized, header unavailable.'
            });
        }

          const token = header && header.split(' ')[1];
          if (!token){
            return res.status(401).json({
                message: 'Unauthorized, invalid token.'
            });
          }
          const payload = jwt.verify(token, process.env.JWT_TOKEN);
          req.userID = payload.userID;
          req.user = payload;
          next();
    }catch(err){
        console.error('Authentication Middleware Error (JWT error)', err);
        return res.status(401).json({
            message: 'Invalid/Expired JWT Token'
        });
    }
};
