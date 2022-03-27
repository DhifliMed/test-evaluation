// JWT middleware to verify header and validity of the brearer token
const jwt = require("jsonwebtoken");
const secret = sails.config.jwtSecret || process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    let token;

    if (req.headers && req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
      if (token.length <= 0) return res.status(401).json( {err: 'Format is Authorization: Bearer [token]'});
  
    } else if (req.param('authorization')) {
      token = req.param('authorization');
      // We delete the token from param to not mess with blueprints
      delete req.query.authorization;
    } else {
      return res.json(401, {err: 'No Authorization header was found'});
    }
    jwt.verify(
        token,
        secret,
        {}, 
        (err, token)=>{
            if (err) return res.json(401, {err: err});
            req.token = token; // This is the decrypted token or the payload you provided
            next();
        } 
      );
    
  };