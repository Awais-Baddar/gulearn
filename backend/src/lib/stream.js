import {StreamChat} from "stream-chat"
import "dotenv/config"


// getting crdentials from stream storing it in DotEnv --1

const apiKey= process.env.STREAM_API_KEY
const apiSecret= process.env.STREAM_API_SEC

// agar nai mila tau chevk kro
if(!apiKey || !apiSecret){
    console.error("Stream Api undefined")
 }

 const streamClient = new StreamChat.getInstance(apiKey, apiSecret)


 export const upsertStreamUser = async (userData )=> {

    try {
        await streamClient.upsertUsers([userData])
        return userData

    } catch (error) {
        console.error("error upserting user",error)
        
    }
 }


 export const generateStreamToken=(userId)=>{

    try {
        const userIdStr= userId.toString();
        return streamClient.createToken(userIdStr);

        
    } catch (error) {
      console.log("error in generating stream token") 
    }
 }  