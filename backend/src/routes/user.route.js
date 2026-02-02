import express from "express"
import { protectRoute } from "../../middleware/auth.middleware.js"
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequests, getRecommendedUsers, sendFriendRequest } from "../controllers/user.controller.js"

const router = express.Router()

router.use(protectRoute) // to applying middleware to all 
router.get('/',getRecommendedUsers)
router.get('/friends',getMyFriends)
router.post('/friend-requests/:id' ,sendFriendRequest)
router.put('/friend-requests/:id/accept' ,acceptFriendRequest)
router.get('/friend-requests/',getFriendRequests)
router.get('/outgoing-friend-requests/',getOutgoingFriendRequests)

export default router;