const mongoose = require("mongoose");
const adminSchema = require("../schemas/adminSchema");
const userSchema = require("../schemas/userSchema");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const redis_client = require("../redis_connect");
const leadSchema = require("../schemas/leadSchema");
const objSchema = require("../schemas/objectiveSchema");

// const login = async (req,res)=>{

// 	let User =  mongoose.model('User', userSchema);

//     return User.find({email: req.body.email, password: req.body.passowrd}).select(fields).sort({createdAt: -1}).exec();
// }

//metodo para registrar

/*const register = async (req, res) => {
  let Admin = mongoose.model("Admin", adminSchema);
  let lead = mongoose.model("Lead", leadSchema);

  const user_save = new Admin({
    userId: uuidv4(),
    name: req.body.name,
    lastname: req.body.lastname,
    secondLastname: req.body.secondLastname,
    email: req.body.email,
    phone: req.body.phone,
    userName: null,
    password: req.body.password,
    otp: null,
    ip: null,
    userAgent: null,
    isActive: true,
    userType: "regular",
    licenseStart: null,
    licenseFirstPay: null,
    licenseEnds: null
  });

  try {
    const existMail = await lead.findOne({ email: req.body.email });
    if (existMail) {
      await user_save.save();
      await lead.findOneAndUpdate(
        { email: req.body.email },
        { isClient: true },
        { new: false }
      );

      return res.json({ success: true, msg: "valid register" });
    } else {
      return res.json({ success: false, msg: "no existe el email" });
    }
  } catch (e) {
    console.log("error creating createNewKyc", e);
    return res.json({ success: false, msg: "invalid register" });
  }
};*/

const register = async (req, res) => {
  let User = mongoose.model("User", userSchema);
  let lead = mongoose.model("Lead", leadSchema);

  const user_save = new User({
    userId: uuidv4(),
    name: req.body.name,
    lastname: req.body.lastname,
    secondLastname: req.body.secondLastname,
    email: req.body.email,
    phone: req.body.phone,
    userName: null,
    password: req.body.password,
    otp: null,
    ip: null,
    userAgent: null,
    isActive: true,
    userType: "regular",
    licenseStart: null,
    licenseFirstPay: null,
    licenseEnds: null
  });

  try {
    const existMail = await lead.findOne({ email: req.body.email });
    if (existMail) {
      await user_save.save();
      await lead.findOneAndUpdate(
        { email: req.body.email },
        { isClient: true },
        { new: false }
      );

      return res.json({ success: true, msg: "valid register" });
    } else {
      return res.json({ success: false, msg: "no existe el email" });
    }
  } catch (e) {
    console.log("error creating createNewKyc", e);
    return res.json({ success: false, msg: "invalid register" });
  }
};

/*const login = async (req, res) => {
  try {
    let Admin = mongoose.model("Admin", adminSchema);
    const admin = await Admin.findOne({ email: req.body.email });

    if (admin) {
      let isPasswordValid = await admin.comparePassword(req.body.password);
      if (isPasswordValid) {
        // console.log(user['_doc'])
        const _user = {
          name: admin["_doc"].name,
          lastname: admin["_doc"].lastname,
          secondlastname: admin["_doc"].secondLastname,
          email: admin["_doc"].email,
          phone: admin["_doc"].phone,
          filePath: admin["_doc"].filePath,
        };
        req.session.admin = _user;

        const token = jwt.sign(
          {
            success: true,
            user: _user,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );

        const refreshToken = generateRefreshToken(_user);
        return res.header("auth-token", token, refreshToken).json({
          success: true,
          msg: "valid login",
          data: { token, refreshToken },
        });
      } else {
        return res.json({ success: false, msg: "invalid login" });
      }
    } else {
      return res.json({ success: false, msg: "invalid login" });
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false, error: e });
  }
};*/

const login = async (req, res) => {
  try {
    let User = mongoose.model("User", userSchema);
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      let isPasswordValid = await user.comparePassword(req.body.password);
      if (isPasswordValid) {
        const _user = {
          userId: user["_doc"].userId,
          name: user["_doc"].name,
          lastname: user["_doc"].lastname,
          secondlastname: user["_doc"].secondLastname,
          email: user["_doc"].email,
          phone: user["_doc"].phone,
          filePath: user["_doc"].filePath,
        };
        req.session.user = _user;

        const token = jwt.sign(
          {
            success: true,
            user: _user,
          },
          process.env.TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );

        const refreshToken = generateRefreshToken(_user);
        return res.header("auth-token", token, refreshToken).json({
          success: true,
          msg: "valid login",
          data: { token, refreshToken },
        });
      } else {
        return res.json({ success: false, msg: "invalid login" });
      }
    } else {
      return res.json({ success: false, msg: "invalid login" });
    }
  } catch (e) {
    console.log(e);
    return res.json({ success: false, error: e });
  }
};

//función de acción logout
async function logout(req, res) {
  const email = req.userData.email;
  const token = req.token;

  //remove the refresh token
  //await redis_client.del(email.toString());

  //blacklist current access token
  //await redis_client.set('BL_' + email, token);
  return res.json({ success: true, msg: "valid logout" });
}

//función para obtener un nuevo access token y un refresh token
function getAccessToken(req, res) {
  const user = req.userData;
  const token = jwt.sign(
    {
      success: true,
      sub: user,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "45m",
    }
  );

  const refreshToken = generateRefreshToken(user);
  return res.json({
    success: true,
    msg: "valid login",
    data: { token, refreshToken },
  });
}

//función para generar un refresh token
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(
    { success: true, sub: user },
    process.env.TOKEN_REFRESH,
    { expiresIn: "1d" }
  );
  /*redis_client.get(email, (err, data) => {
        if(err) throw err;

        redis_client.set(email, JSON.stringify({token: refreshToken}));
    })*/

  return refreshToken;
}

async function personalInformation(req, res) {
  let Admin = mongoose.model("Admin", adminSchema);

  var personalInfo = {
    lugarResidencia: req.body.lugarResidencia,
    numeroIdentificacion: req.body.numeroIdentificacion,
  };

  try {
    await Admin.update(
      { _id: req.body._id },
      { $push: { userInformation: personalInfo } },
      { new: false }
    );

    return res.json({ success: true, msg: "valid info" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, msg: "invalid info" });
  }
}

/*async function addPhoto(req, res) {
  console.log('3');
  let Admin = mongoose.model("Admin", adminSchema);
  const file = req.file.path;

  console.log(file);
  try {
    await Admin.update(
      { email: req.body.email },
      { filePath: file },
      { new: false }
    );
    return res.json({ success: true, msg: "valid upload" });
  } catch (error) {
    return res.status(400).json({ success: false, msg: "invalid upload" });
  }
}*/

async function addPhoto(req, res) {
  console.log('3');
  let User = mongoose.model("User", userSchema);
  const file = req.file.path;

  console.log("File------------------------------------",file);
  try {
    await User.update(
      { email: req.body.email },
      { filePath: file },
      { new: false }
    );
    return res.json({ success: true, msg: "valid upload", file:file});
  } catch (error) {
    return res.status(400).json({ success: false, msg: "invalid upload" });
  }
}

/*async function updateUserInfo(req, res) {
  let AdminUpdate = mongoose.model("Admin", adminSchema);

  const user_update = {
    name: req.body.name,
    lastname: req.body.lastname,
    secondLastname: req.body.secondLastname,
    phone: req.body.phone,
    userName: null,
    password: req.body.password,
    otp: null,
    ip: null,
    userAgent: null,
    isActive: true,
    userType: "regular",
    licenseStart: null,
    licenseFirstPay: null,
    licenseEnds: null,
    userInformation: req.body.userInformation,
  };

  try {
    await AdminUpdate.update({ email: req.body.email }, user_update, {
      new: false,
    });
    return res.json({ success: true, msg: "valid update" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, msg: "invalid update" });
  }
}*/

async function updateUserInfo(req, res) {
  let UserUpdate = mongoose.model("User", userSchema);

  const user_update = {
    name: req.body.name,
    lastname: req.body.lastname,
    secondLastname: req.body.secondLastname,
    phone: req.body.phone,
    userName: null,
    //password: req.body.password,
    otp: null,
    ip: null,
    userAgent: null,
    isActive: true,
    userType: "regular",
    licenseStart: null,
    licenseFirstPay: null,
    licenseEnds: null,
    //userInformation: req.body.userInformation,
  };

  try {
    await UserUpdate.update({ email: req.body.email }, user_update, {
      new: false,
    });
    return res.json({ success: true, msg: "valid update" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, msg: "invalid update" });
  }
}

module.exports = {
  register,
  login,
  logout,
  getAccessToken,
  personalInformation,
  addPhoto,
  updateUserInfo
};
