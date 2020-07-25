const express = require("express");
const router = express.Router();

const columnController = require("../controllers/column-controller");

router.get("/", columnController.getAllColumns);
router.put("/:id", columnController.editColumnName);

module.exports = router;
