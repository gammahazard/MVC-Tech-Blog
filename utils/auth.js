// 
const enableAuth = (req, res, next) => {
// redirect to login page if no login session detected
    
    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      // if login session detected redirect to dashboard page
      //next() check for auth 
      next();
    }
  };
  
  module.exports = enableAuth;
  