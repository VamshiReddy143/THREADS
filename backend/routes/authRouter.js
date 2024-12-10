const express=require("express")
const router=express.Router()
const {REGISTER, LOGIN, LOGOUT, GETME}=require("../controllers/authController")
const {protectRoute}=require('../middlewares/protect')


router.post("/register",REGISTER)
router.post("/login",LOGIN)
router.get("/logout",LOGOUT)
router.get("/me",protectRoute,GETME)


module.exports=router