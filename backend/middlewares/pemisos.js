
export const checkPermissions = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['role'];
      if (allowedRoles.includes(userRole)) {
        next();
      } else {
        console.log('Acceso denegado: Permiso insuficiente.')
        res.status(403).json({ message: "Acceso denegado: Permiso insuficiente." });
      }
    };
  };