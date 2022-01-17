const mongoose = require("mongoose"), moment = require("moment");
const objSchema = require("../schemas/objectiveSchema");
const userSchema = require("../schemas/userSchema");
const { v4: uuidv4 } = require("uuid");
var Float = require("mongoose-float").loadType(mongoose);

const registerObjective = async (req, res) => {
  let Objective = mongoose.model("Objective", objSchema.objectiveSchema);
  const _objective = await Objective.findOne({objectiveId: req.body.id});

  switch (req.body.type) {
    /*
    ##########################################################################################################################################################################
    ###########################################------------------------Compra------------------------#########################################################################
    ##########################################################################################################################################################################
    */
    case "Compra":

      switch (req.body.step) {
        case 1:
          const id = uuidv4();

          const objective = new Objective({
            userId: req.body.userId,
            objectiveId: id,
            name: req.body.name,
            description: req.body.description,
            type: req.body.type,
            progress: 0,
            metaData: req.body.metaData,
          });
          try{
            await objective.save();
            var objectiveType = {
              costBuy: Float,
              totalSaved: Float,
              totalPaymentPerMonth: Float,
            };
            Objective.findByIdAndUpdate(
              { objectiveId: id },
              { $push: { metaData: objectiveType } },
              { new: false }
            );
            return res.json({ success: true, msg: "Objetivo creado con éxito", id:id });
          } catch (error) {
            return res.json({ success: false, msg: "No se ha podido crear el objetivo"});
          }
        break;
      //##########################################################################################################################################################################
        case 2:
          if(_objective){
            const nMetaData = [..._objective.metaData];
            const floatCoast = parseFloat(req.body.cost).toFixed(2);
            if (nMetaData[0]===undefined) {
              nMetaData.push({'costBuy':floatCoast});
            } else {
              nMetaData[0] = {'costBuy':floatCoast};
            }
            try {
              await Objective.update(
                {objectiveId: req.body.id},
                {metaData: nMetaData},
                {new:false}
              );
              return res.json({ success:true, msg: "Costo asignado con éxito." });
            } catch (error) {
              return res.json({ success:false, msg: "No se pudo asignar el costo." });
            }
          } else {
            return res.json({ success:false, msg: "No se ha encontrado el objetivo." });
          }
        break;
      //##########################################################################################################################################################################
        case 3:
          if(_objective){
            const nMetaData = [..._objective.metaData];
            const floatSaved = parseFloat(req.body.moneySaved).toFixed(2);
            if (nMetaData[1]===undefined) {
              nMetaData.push({'totalSaved':floatSaved});
            } else {
              nMetaData[1] = {'totalSaved':floatSaved};
            }
            try {
              await Objective.update(
                {objectiveId: req.body.id},
                {metaData: nMetaData},
                {new:false}
              );
              return res.json({ success:true, msg: "Ahorro definido con éxito." });
            } catch (error) {
              return res.json({ success:false, msg: "No se pudo definir el ahorro." });
            }
          } else {
            return res.json({ success:false, msg: "No se ha encontrado el objetivo." });
          }
        break;
      //##########################################################################################################################################################################
        case 4:
          if(_objective){
            const nMetaData = [..._objective.metaData];
            const floatMoneyPerMonth = parseFloat(req.body.moneyPerMonth).toFixed(2);
            if (nMetaData[2]===undefined) {
              nMetaData.push({'totalPaymentPerMonth':floatMoneyPerMonth});
            } else {
              nMetaData[2] = {'totalPaymentPerMonth':floatMoneyPerMonth};
            }
            try {
              await Objective.update(
                {objectiveId: req.body.id},
                {metaData: nMetaData},
                {new:false}
              );
              return res.json({ success:true, msg: "Dinero mensual definido con éxito." });
            } catch (error) {
              return res.json({ success:false, msg: "No se pudo definir el dinero mensual." });
            }
          } else {
            return res.json({ success:false, msg: "No se ha encontrado el objetivo." });
          }
        break;
      }
    break;

    /*
    ##########################################################################################################################################################################
    ###########################################------------------------Ahorro------------------------#########################################################################
    ##########################################################################################################################################################################
    */

    case "Ahorro":
    break;
  }
}


const ObjReg = async (req, res) => {
  /*let Objective_reg = mongoose.model("Objective", objSchema.objectiveSchema);
  
  //let User = mongoose.model("User", userSchema);
  //const _user = await User.findOne({email: req.body.email})

  const objective = new Objective_reg({
    userId: uuidv4(),
    name: req.body.name,
    type: req.body.type,
    metaData: req.body.metaData,
    updatedBy: req.body.updatedBy,
    createdBy: req.body.createdBy,
  });

  try {
    await objective.save();
    const type = req.body.type;
    if (type === "mejora credito") {
      var objectiveType = {
        bankName: String,
        totalAmount: Float,
        monthlyPayment: Float,
        months: Number,
        startCreditDate: Date,
        monthlyInterest: Float,
        totalPaid: Float,
        isUptodate: Boolean,
        intentions: [String],
      };
    }
    if (type === "ahorro") {
      var objectiveType = {
        totalGoal: Float,
        totalPaymentPerMonth: Float,
      };
    }
    if (type === "compra") {
      var objectiveType = {
        costBuy: Float,
        totalSaved: Float,
        totalPaymentPerMonth: Float,
      };
    }
    Objective_reg.findByIdAndUpdate(
      { _id: req.body.id },
      { $push: { metaData: objectiveType } },
      { new: false }
    );
    return res.json({ success: true, msg: "valid register" });
  } catch (e) {
    console.log("error creating createNewKyc", e);
    return res.json({ success: false, msg: "invalid register" });
  }*/
};

const consultObjective = async (req, res) => {
  let Objective = mongoose.model("Objective", objSchema.objectiveSchema);
  const _objectives = await Objective.find({userId: req.query.id});
  if(_objectives){
    var totalObjectives = [];
    for (let i = 0; i < _objectives.length; i++) {
      totalObjectives.push({
        metaData: _objectives[i].metaData,
        userId: _objectives[i].userId,
        objectiveId: _objectives[i].objectiveId,
        name: _objectives[i].name,
        description: _objectives[i].description,
        type: _objectives[i].type,
        progress: _objectives[i].progress,
        updatedAT: _objectives[i].updatedAT,
        createdAt: _objectives[i].createdAt,
      })
    }
    return res.json({success:true, msg:'Se encontraron objetivos para este usuario', objectives:totalObjectives.reverse()});
  } else {
    return res.json({success:false, msg:'No se encontraron objetivos para este usuario'})
  }
};

const updateObjective = async (req, res) => {
  let Objective = mongoose.model("Objective", objSchema.objectiveSchema);
  
  switch (req.body.type) {
    /*
    ##########################################################################################################################################################################
    ###########################################------------------------Compra------------------------#########################################################################
    ##########################################################################################################################################################################
    */
    case 'Compra':
      switch (req.body.step) {
        case 1:
          try {
            await Objective.update(
              {objectiveId: req.body.id},
              {name:req.body.nName, description:req.body.nDescription, updatedAT:moment()},
              {new:false}
            );
            return res.json({ success:true, msg: "Información actualizada con éxito." });
          } catch (error) {
            return res.json({ success:false, msg: "No se pudo actualizar la información." });
          }
        break;
        //##########################################################################################################################################################################
        case 2:
          try {
            const obj = await Objective.findOne({objectiveId: req.body.id});
            const nCostBuy = [...obj.metaData];
            const floatCoast = parseFloat(req.body.nCostBuy).toFixed(2);
            nCostBuy[0] = {"costBuy":floatCoast};
            await Objective.update(
              {objectiveId: req.body.id},
              {metaData:nCostBuy, updatedAT:moment()},
              {new:false}
            );
            return res.json({ success:true, msg: "Información actualizada con éxito." });
          } catch (error) {
            return res.json({ success:false, msg: "No se pudo actualizar la información." });
          }
        break;
        //##########################################################################################################################################################################
        case 3:
          try {
            const obj = await Objective.findOne({objectiveId: req.body.id});
            const nSaved = [...obj.metaData];
            const floatSaved = parseFloat(req.body.nMoneySaved).toFixed(2);
            nSaved[1] = {"totalSaved":floatSaved};
            await Objective.update(
              {objectiveId: req.body.id},
              {metaData:nSaved, updatedAT:moment()},
              {new:false}
            );
            return res.json({ success:true, msg: "Información actualizada con éxito." });
          } catch (error) {
            return res.json({ success:false, msg: "No se pudo actualizar la información." });
          }
        break;
        //##########################################################################################################################################################################
        case 4:
          try {
            const obj = await Objective.findOne({objectiveId: req.body.id});
            const nDinMes = [...obj.metaData];
            const floatMoneyPerMonth = parseFloat(req.body.nTotalMoneyPerMonth).toFixed(2);
            nDinMes[2] = {"totalPaymentPerMonth":floatMoneyPerMonth};
            await Objective.update(
              {objectiveId: req.body.id},
              {metaData:nDinMes, updatedAT:moment()},
              {new:false}
            );
            return res.json({ success:true, msg: "Información actualizada con éxito." });
          } catch (error) {
            return res.json({ success:false, msg: "No se pudo actualizar la información." });
          }
        break;
      }
    break;
    /*
    ##########################################################################################################################################################################
    ###########################################------------------------Ahorro------------------------#########################################################################
    ##########################################################################################################################################################################
    */
    case 'Ahorro':
      
    break;
    /*
    ##########################################################################################################################################################################
    ###########################################------------------------Credito------------------------########################################################################
    ##########################################################################################################################################################################
    */
    case 'Credito':
      
    break;
  }
  return res.json({ success: false, msg: "Has hecho una petición"});
};

const delObjective = async (req, res) => {
  /*let Objective_del = mongoose.model("Objective", objSchema.objectiveSchema);

  await Objective_del.findByIdAndDelete({ _id: req.body._id });
  return res.json({ success: true, msg: "valid delete" });*/
};

module.exports = {
  registerObjective,
  consultObjective,
  updateObjective,
  delObjective,
};
