import FriendRequest from "../models/FriendRequests.js";
import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { _id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("error in recommendations");
  }
}
export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate("friends", "fullName nativeLanguage learningLanguage");

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("error in friends ");
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;
    //prevent sending req to myself
    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "cant send friend requests to yourself" });
    }

    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "cant send friend requests to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(400).json({ message: "cant find user" });
    }

    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "already friends" });
    }

    //check if req already sent
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        {
          sender: recipientId,
          recipient: myId,
        },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "already friends request exists" });
    }
    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });
  } catch (error) {
    console.error("error in requesting ");
  }
}

export async function acceptFriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(400).json({ message: "cant find request" });
    }
    //verify current user is recipient

    if (friendRequest.recipient.toString() !== req.user.id) {
      return res.status(400).json({ message: "not authorized to acccpet" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.sender, {
      $addToSet: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $addToSet: { friends: friendRequest.sender },
    });
  } catch (error) {
    console.log("error in accpeting fr req controller");
  }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingRequests = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLangauge learningLangauge"
    );

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic  ");

    res.status(200).json({ incomingRequests, acceptedReqs });
  } catch (error) {
    console.log("error in getting pending friend req controller");
  }
}
export async function getOutgoingFriendRequests(req, res) {
  try {
    const outFriendReq = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic learningLangauge nativeLanguage"
    );
    res.status(200).json(outFriendReq);
  } catch (error) {
    console.log("error in outFrnd Req controller");
  }
}
