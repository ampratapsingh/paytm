const {JWT_SECRET} = require("./config")
const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
    return res.status(403).json({
      message: "Unauthorized"
    })
  }

  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token, JWT_SECRET);

    req.userId = decoded.userId;

    next();
  }catch(err){
    return res.status(403).json({
      message: "Unauthorized"
    })
  }
}

module.exports = {authMiddleware}






// What req.userId = decoded.userId; does
// Every Express request handler has a req object.
// By default, req contains things like headers, body, query, etc.
// But you can also attach your own data to it.

// Here:
// decoded.userId comes from the JWT payload.
// req.userId = decoded.userId; attaches that user’s ID to the request.

// 👉 In short:
// req.userId = decoded.userId; is storing the logged-in user’s ID on the request object, so that later routes know who is making the request.