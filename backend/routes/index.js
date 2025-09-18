const express = require("express");
const userRouter = require("./user");
const accountRouter = require("./account");

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter)

module.exports = router;










// /api/v1/user
// /api/v1/transaction
//we could do app.use("api/v1/user/balance") but to structure it better we use router