const express = require("express");
const currencyController = require("../controllers/currencyController");
const router = express.Router();

router.get("/currencies", currencyController.currency_get);
router.post("/currency", currencyController.activeCurrency_post);
 
module.exports = router;
