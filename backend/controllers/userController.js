const userModel = require("../models/authModel");
const cloudinary = require("../config/cloudinary");
notificationModel=require("../models/notificationModel")


exports.GET_USER_PROFILE = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await userModel.findById(id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (error) {
    console.log("Error in getUserProfile: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.FOLLOW = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const userToFollowId = req.params.id;

    const userToFollow = await userModel.findById(userToFollowId);
    const currentUser = await userModel.findById(loggedInUserId);

    if (!userToFollow || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the current user is already following the user
    if (!userToFollow.followers.includes(loggedInUserId)) {
      // User is not following, so proceed with following the user
      await userToFollow.updateOne({ $push: { followers: loggedInUserId } });
      await currentUser.updateOne({ $push: { following: userToFollowId } });


//*for notifications
      const notification = new notificationModel({
        from: loggedInUserId,
        to: userToFollowId,
        type: "follow",
      });
      await notification.save();



      // Send a single response after the update is done
      return res.status(200).json({ message: "Followed successfully" });
    } else {
      // User is already following, return an appropriate message
      return res.status(400).json({
        message: `You are already following ${userToFollow.username}`,
      });
    }
  } catch (error) {
    console.log("Error in followUser: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.UNFOLLOW = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const userToFollowId = req.params.id;

    const userToFollow = await userModel.findById(userToFollowId);
    const currentUser = await userModel.findById(loggedInUserId);

    if (!userToFollow || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check if the user is already following the other user
    if (userToFollow.followers.includes(loggedInUserId)) {
      // User is following, proceed with unfollowing
      await userToFollow.updateOne({ $pull: { followers: loggedInUserId } });
      await currentUser.updateOne({ $pull: { following: userToFollowId } });

      // Send a single response after the update is done
      return res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      // If the user is not following, return an appropriate message
      return res.status(400).json({
        message: `You are not following ${userToFollow.username}`,
      });
    }
  } catch (error) {
    console.log("Error in UnfollowUser: ", error.message);
    return res.status(500).json({ error: error.message });
  }
};

exports.GET_SUGESTED_USERS = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Received user ID: ", id);

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const otherUsers = await userModel
      .find({ id: { $ne: id } })
      .select("-password");

     console.log(otherUsers)
     // Check if no other users exist
     if (otherUsers.length === 0) {
      return res.status(404).json({
        message: "Currently, no other users are available to follow.",
      });
    }
    return res.status(200).json({
      otherUsers,
    });
  } catch (error) {
    console.log("Error in getSuggestedUsers: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.UPDATE_PROFILE = async (req, res) => {
  const { fullName, email, username, currentPassword, newPassword, bio, link } =
    req.body;
  let { profileImg, coverImg, ...otherData } = req.body;

  const userId = req.user._id;

  try {
    const updatedFields = { ...otherData };
    let user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(400)
        .json({
          error: "Please provide both current password and new password",
        });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ error: "Current password is incorrect" });
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
    }

    if (profileImg) {
      if (user.profileImg) {
        // https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }

      const uploadedResponse = await cloudinary.uploader.upload(coverImg);
      coverImg = uploadedResponse.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();

    // password should be null in response
    user.password = null;

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updatedFields,
      {
        new: true,
      }
    );

    return res.status(200).json({
      message: "profile updated successfully",
      updatedUser,
    });
    
  } catch (error) {
    console.log("Error in updateUser: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.SEARCH_USERS = async (req, res) => {
  try {
    const { query } = req.query; // Get the search term from the query parameters

    // Search for users by username or full name
    const users = await userModel.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { fullName: { $regex: query, $options: "i" } },
      ],
    }).select("-password");

    // Return matching users
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }

    return res.status(200).json({ users });
  } catch (error) {
    console.error("Error in searchUsers: ", error.message);
    res.status(500).json({ error: error.message });
  }
};



exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await notificationModel
      .find({ to: userId })
      .populate("from", "username profileImg")
      .sort({ createdAt: -1 });

    res.status(200).json({ notifications });
  } catch (error) {
    console.log("Error fetching notifications: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

