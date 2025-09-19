const express = require("express")
const mainRouter = require("./routes/index")
const cors = require("cors")
const app = express()


app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/api/v1", mainRouter)

app.listen(3000);














// Final Connection (full path flow)
// Request comes in: /api/v1/user/signup
// app.js → sends /api/v1/... to mainRouter.
// index.js → sees /user/..., forwards to userRouter.
// user.js → sees /signup, runs the POST handler.