const express = require("express");
const router = express.Router();
const userRouter = require("./user");

router.use("/user", userRouter);

module.exports = router;










// /api/v1/user
// /api/v1/transaction
//we could do app.use("api/v1/user/balance") but to structure it better we use router