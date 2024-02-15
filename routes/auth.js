const express=require("express");

const authcontroller=require("../controller/auth");
const router=express.Router();


router.post("/register", authcontroller.register);

module.exports=router;