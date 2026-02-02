import { axiosInstance } from "./axios"

 export const signup = async(signupData)=>{
    const response = await axiosInstance.post("/auth/signup",signupData)
    return response.data
 }
 export const completeOnboarding = async(userdata)=>{
    const response = await axiosInstance.post("/auth/onboarding",userdata)
    return response.data
 }
 export const login = async(loginData)=>{
    const response = await axiosInstance.post("/auth/login",loginData)
    return response.data
 }
 export const logout = async()=>{
    const response = await axiosInstance.post("/auth/logout")
    return response.data
 }


 export const getAuthUser = async ()=>{
  

    try {
       const res= await axiosInstance.get("/auth/me")
    return res.data;
      
    } catch (error) {
      return null
      
    }
  };

  //friends 

  export async function getUsersFriends (){
    const response = await axiosInstance.get("/users/friends")
    return response.data
 }
export async function getRecommendedUsers (){
    const response = await axiosInstance.get("/users")
    return response.data
 }
export async function getOutgoingFriendReqs(){
    const response = await axiosInstance.get("/users/outgoing-friend-requests")
    return response.data
 }
export async function sendFriendReq (userId){
    const response = await axiosInstance.post(`/users/friend-requests/${userId}`)
    return response.data
 }
