// Request logger middleware
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  
  if (Object.keys(req.body).length > 0) {
    console.log('Body:', req.body);
  }
  
  next();
};

module.exports = requestLogger;