const express=require("express")
const router=express.Router()
const {protectRoute}=require("../middlewares/protect")

const {FOLLOW,UNFOLLOW,UPDATE_PROFILE,GET_SUGESTED_USERS,GET_USER_PROFILE,SEARCH_USERS, getNotifications} = require("../controllers/userController")


router.get("/profile/:id",protectRoute,GET_USER_PROFILE)
router.get("/suggested/:id",protectRoute,GET_SUGESTED_USERS)
router.post("/follow/:id",protectRoute,FOLLOW)
router.post("/Unfollow/:id",protectRoute,UNFOLLOW)
router.post("/update",protectRoute,UPDATE_PROFILE)
router.get('/search', protectRoute,SEARCH_USERS);
router.get('/notifications', protectRoute,getNotifications);

// router.get("/notifications",protectRoute,getNotifications)

module.exports=router