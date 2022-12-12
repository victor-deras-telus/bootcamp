const express = require("express");
const accountsController = require("../controllers/accountsController");
const router = express.Router();

router.get("/accounts", accountsController.accounts_get);
router.get("/accounttypes", accountsController.accountTypes_get);
router.post("/account", accountsController.accounts_post);
router.post("/account/delete/:accountId", accountsController.account_delete);
router.post("/account/update", accountsController.account_update);

//router.get("/categories/sum", categoriesController.categories_transaction_sum);

module.exports = router;
