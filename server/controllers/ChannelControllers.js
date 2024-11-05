import { response } from "express";
import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";


export const createChannel = async (request,response)=>{
   try {
    
     const {name,members} = request.body;
     const userId = request.userId;

     const admin = await User.findById(userId)

     if(!admin)
     {
      return response.status(400).send("Adming user not found.")
     }

     const validMembers = await User.find({_id:{$in: members}})

     if(validMembers.length !== members.length)
     {
      return response.status(400).send("some members are not valid.")
     }

     const newChannel = new Channel({
        name,
        members,
        admin:userId,
     })

     await newChannel.save()
     return response.status(201).json({channel:newChannel})

   } catch (error) {
      console.log({error})
   }
}