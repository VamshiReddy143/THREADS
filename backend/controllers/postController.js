const postModel = require("../models/postModel");
const userModel = require("../models/authModel");
const cloudinary = require("../config/cloudinary");
notificationModel=require("../models/notificationModel")

exports.CREATEPOST = async (req, res, next) => {
  try {
    const { text, img: rawImg } = req.body;
    const userId = req.user._id;

    // Validate input
    if (!text) {
      return res.status(400).json({ message: "Post text is required" });
    }

    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Handle image upload if provided
    let img = null;
    if (rawImg) {
      try {
        const uploadResponse = await cloudinary.uploader.upload(rawImg);
        img = uploadResponse.secure_url;
      } catch (uploadError) {
        return res
          .status(500)
          .json({ message: "Image upload failed", error: uploadError.message });
      }
    }

    // Create and save the post
    const newPost = new postModel({
      user: userId,
      text,
      img,
    });

    await newPost.save();

    return res.status(201).json({ message: "New post added", newPost });
  } catch (error) {
    next(error);
  }
};

exports.GETALLPOSTS = async (req, res, next) => {
  try {
    const { userId, filterType } = req.query; // filterType can be 'following' or 'foryou'

    let posts;

    //* Fetch posts from followed users
    if (filterType === "following") {
      const user = await userModel.findById(userId);
      const followingUsers = user.following;

      posts = await postModel
        .find({ user: { $in: followingUsers } })
        .sort({ createdAt: -1 })
        .populate({ path: "user", select: "-password" })
        .populate({ path: "comments.user", select: "-password" });
    } else {
      //* Fetch all posts for "For You"
      posts = await postModel
        .find({})
        .sort({ createdAt: -1 })
        .populate({ path: "user", select: "-password" })
        .populate({ path: "comments.user", select: "-password" });
    }

    if (posts.length === 0) {
      // while fetching posts if we do not have posts it will throw an error that why we are using it
      return res.status(200).json([]);
    }

    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

exports.DELETEPOST = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    console.log(post);

    if (!post) {
      return res.status(400).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You are not authorized to delete this post" });
    }

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imgId);
    }

    await postModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.LIKEUNLIKEPOST = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id: postId } = req.params;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const User_Liked_Post = post.likes.includes(userId);

    if (User_Liked_Post) {
      await postModel.updateOne({ _id: postId }, { $pull: { likes: userId } }); //*this is for likes

      const updatedLikes=await userModel.updateOne(
        { _id: userId },
        { $pull: { likedPosts: postId } }
      ); //*this is for removing posts from user liked posts

    //    const updatedLikes = post.likes.filter(
    //     (id) => id.toString() !== userId.toString()
    //   ); //*removing the user id from postid  (optional)

      res.status(200).json({message:"post disliked",updatedLikes});
    } else {
      post.likes.push(userId);

      await userModel.updateOne(
        { _id: userId },
        { $push: { likedPosts: postId } }
      );

      await post.save();

//*for notifications
      const notification = new notificationModel({
        from: userId,
        to: post.user,
        type: "like",
      });
      await notification.save();

      const updatesLikes = post.likes;
      res.status(200).json({message:"post LIKED" ,updatesLikes});
    }
  } catch (error) {
    console.log("Error in likeUnlikePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.COMMENTONPOST = async (req, res) => {
    try {
   
      const { text } = req.body;
      const {id:postId }= req.params;
     ;
      const userId = req.user._id;
      
  
      if (!text) {
        return res.status(400).json({ error: "Text field is required" });
      }
      
      const post = await postModel.findById(postId)
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const comment = { user: userId, text,createdAt: new Date() };
  
      post.comments.push(comment);
  
      await post.save();
  
      const populatedPost = await postModel
      .findById(postId)
      .populate("comments.user", "username")
      
      const newComment = populatedPost.comments[populatedPost.comments.length - 1];
  
      res.status(200).json({message:"commented on apost",comment:newComment,success:true});
    } catch (error) {
      console.log("Error in commentOnPost controller: ", error.stack);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
