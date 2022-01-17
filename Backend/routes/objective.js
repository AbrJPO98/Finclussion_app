const express = require("express");
const router = express.Router();
const objectiveController = require("../controllers/objectiveController");

router.post("/registerObjective", objectiveController.registerObjective);
router.get("/consultObjective", objectiveController.consultObjective);
router.put("/updateObjective", objectiveController.updateObjective);
router.delete("/deleteObjective", objectiveController.delObjective);

module.exports = router;
