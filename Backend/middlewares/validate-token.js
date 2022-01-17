const jwt = require("jsonwebtoken");
const redis_client = require("../redis_connect");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token)
    return res.status(401).json({ success: false, error: "Acceso denegado" });

  try {
    const verify = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verify;

    req.token = token;

    //verify blacklisted token
    redis_client.get("BL_" + verify.toString()),
      (err, data) => {
        if (err) throw err;

        if (data === token)
          res
            .status(400)
            .json({ success: false, error: "blacklisted token", data: error });
      };
    next();
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: "token no es válido", data: error });
  }
};

const verifyRefreshToken = (req, res, next) => {
  const token = req.body.token;

  if (token === null)
    return res.status(401).json({ success: false, msg: "invalid token" });
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_REFRESH);
    req.userData = decoded;
    next();
    /*redis_client.get(decoded, (err, data) => {
            if(err) throw err;

            if(data === null) return res.status(401).json({success: false, msg: "invalid request, token is not in store"});
            if(JSON.parse(data).token != token) return res.status(401).json({success: false, msg: "invalid request, token is not in store"});

            next();
        })*/
    } catch (error) {
        return res.status(401).json({success: false, msg: "Your session is not valid", data: error});
    }
}

module.exports = {
  verifyToken,
  verifyRefreshToken,
};

//fecha de expiracion de tokens, que sea configurable
//45 min expiracion
//refrescarse un token: cada que un usuario haga algo, de un endpoint a otro el token debe refrescarse (stateless apps)
