/**
 * Role-Based Access Control (RBAC) Middleware
 * @param {...String} allowedRoles - The list of roles permitted to access the route
 */
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // 1. Check if the session exists and has a role
    if (!req.session || !req.session.role) {
      return res.status(401).json({ 
        success: false, 
        message: "Unauthenticated: No session found." 
      });
    }

    // 2. Check if the user's role is in the allowed list
    if (!allowedRoles.map(r => r.toLowerCase()).includes(req.session.role.toLowerCase())) {
      // 403 Forbidden: We know who you are, but you're not allowed here
      console.warn(`[Security Alert]: User ${req.session.username} (Role: ${req.session.role}) attempted to access a restricted route.`);
      
      return res.status(403).json({
        success: false,
        message: `Access Denied: Your role [${req.session.role}] does not have permission to perform this action.`
      });
    }

    // 3. Authorization successful, proceed to the next function
    next();
  };
};

module.exports = authorizeRoles;