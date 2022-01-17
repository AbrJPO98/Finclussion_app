const mongoose = require("mongoose");
const leadSchema = require("../schemas/leadSchema");
const { v4: uuidv4 } = require("uuid");

const registerLead = async (req, res) => {
  let lead = mongoose.model("lead", leadSchema);

  const lead_user = new lead({
    userId: uuidv4(),
    name: req.body.name,
    lastname: req.body.lastname,
    secondLastname: req.body.secondLastname,
    email: req.body.email,
    phone: req.body.phone,
    isClient: req.body.isClient,
  });

  const existMail = await lead.findOne({ email: req.body.email });
  if (existMail)
    return res.json({ success: false, msg: "Ya existe ese email" });

  const existPhone = await lead.findOne({ phone: req.body.phone });
  if (existPhone)
    return res.json({ success: false, msg: "Ya existe ese teléfono" });

  try {
    await lead_user.save();
    return res.json({ success: true, msg: "valid lead" });
  } catch (e) {
    console.log("error creating createNewKyc", e);
    return res.json({ success: false, msg: "invalid lead" });
  }
};

const updateLead = async (req, res) => {
  let lead = mongoose.model("lead", leadSchema);

  try {
    await lead.findOneAndUpdate(
      { email: req.body.email },
      { isClient: true },
      { new: false }
    );
    return res.json({ success: true, msg: "valid updated" });
  } catch (error) {
    return res.json({ success: false, msg: "invalid update", error });
  }
};

module.exports = {
  registerLead,
  updateLead,
};
