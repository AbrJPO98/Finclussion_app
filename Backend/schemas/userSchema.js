const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10,
  moment = require("moment");

//Track how many times a unique url has been opened
const UserSchema = new Schema({
  userId: String,
  name: String,
  lastname: String,
  secondLastname: String,
  email: { type: String, required: true, index: { unique: true } },
  phone: String,
  userName: String,
  password: String,
  otp: String,
  ip: String,
  userAgent: String,
  isActive: String,
  userType: String,
  licenseStart: String,
  licenseFirstPay: String,
  licenseEnds: String,
  idType: String,
  createdAt: { type: Date, default: function(){return moment()} },  
  filePath:String
});

UserSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = async function (candidatePassword, cb) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (e) {
    return false;
  }
};

module.exports = UserSchema;
