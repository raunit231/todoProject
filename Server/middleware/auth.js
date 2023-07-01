import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
	try {
		const token = req.header("Authorization");

		if (!token) {
			return res.status(403).json({ message: "Access Denied" });
		}
		if (token.includes("Bearer")) {
			token = token.slice(7, token.length).trimLeft();
		}
		const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
	} catch (error) {
    res.status(500).json({error:error.message});
  }
};
