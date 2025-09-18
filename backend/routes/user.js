const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtokken");
const JWT_SECRET = require("../config")
const { authMiddleware } = require("../middleware");

const signupShema=zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
})

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
})

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
})

router.post("/signup", async(req, res) =>{
  const body = req.body;
  const {success} = signupShema.safeParse(body);
  if(!success){
    return res.json({
      message: "Email taken / Enter valid inputs"
    })
  }

  const user = await User.findOne({
    username: req.body.username
  })

  const userId = user._id

  if(userId){
    return res.status(411).json({
      message: "Email taken / Enter valid inputs"
    })
  }

  const dbUser = await User.create(body);

  //New accoount
  await Account.create({
    userId,
    balance: 1+Math.random()*1000
  })

  const token = jwt.sign({
    userId
  },JWT_SECRET)

  return res.json({
    message: "User created successfully",
    token: token
    })
})


router.post("/signin", async(req, res) =>{
 const {success} = signinBody.safeParse(req.body);
 if(!success){
  return res.status(411).json({
    message: "Enter valid inputs"
  })
 }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password
  })

  if(!user){
    return res.json({
      message: "User not found"
    })
  }

  if(user){
    const token = jwt.sign({
      userId: user._id
    },JWT_SECRET)
    return res.json({
      message: "User signed in successfully",
      token
    })
  }

})

router.put("/", authMiddleware, async(req,res) => {
  const {success} = updateBody.safeParse(req.body);
  if(!success){
    return res.status(411).json({
      message: "Enter valid inputs"
    })
  }

  await User.updateOne({_id:req.userId}, {$set: req.body})

  return res.json({
    message: "User updated successfully"
  })
})

router.get("/bulk", async(req, res) => {
  const filter = req.query.filter || "";     //e.g GET /products?filter=books&sort=asc

  const users = await User.find({
    $or: [{
      firstName: {
        $regex: filter,
      }
    },{
      lastName: {
        $regex: filter,
      }
    }]
  })

  res.json({
    user: users.map(user => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: users._id
    }))
  })
})

module.exports = router;
