const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "it's just a secret",
      (err, decodedToken) => {
        if (err) {
          console.log(err);
          res.status(401).json({
            message: "not verified"
          });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      }
    );
  } else {
    res.status(400).json({
      message: "no token provided"
    });
  }
};

// function restrictedAuth() {
//   return async (req, res, next) => {
//     const authError = {
//       message: "Invalid Credentials"
//     };
//     try {
//       const token = req.cookies.token;
//       if (!token) {
//         return res.status(401).json({ token: authError });
//       }
//       jwt.verify(
//         token,
//         process.env.TOKEN_SECRET || "it's just a secret",
//         (err, decodedPayload) => {
//           req.token = decodedPayload;
//           if (err) {
//             console.log("err", err);
//             return res.status(401).json(authError);
//           }
//           next();
//         }
//       );
//     } catch (err) {
//       console.log("restrictedAuth", err);
//       next(err);
//     }
//   };
// }
