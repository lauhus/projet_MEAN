const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  
    var decoded = jwt.verify(token,"TOKEN");
    next();
    } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};