const express=require("express")
const router=express.Router()
const {CREATEPOST, GETALLPOSTS, DELETEPOST, LIKEUNLIKEPOST, COMMENTONPOST}=require("../controllers/postController")
const {protectRoute}=require('../middlewares/protect')


router.post("/create",protectRoute,CREATEPOST)
router.get("/all",protectRoute,GETALLPOSTS)
router.delete("/delete/:id",protectRoute,DELETEPOST)
router.post("/like/:id",protectRoute,LIKEUNLIKEPOST)
router.post("/comment/:id",protectRoute,COMMENTONPOST)



module.exports=router