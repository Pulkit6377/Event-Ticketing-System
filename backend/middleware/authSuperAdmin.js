export const authSuperAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "superAdmin") {
    return res.status(403).json({ message: "Access Denied. Super Admin Only" });
  }
  next();
};


