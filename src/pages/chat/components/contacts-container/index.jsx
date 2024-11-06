import React, { useEffect } from "react";
import ProfileInfo from "./components/profile-info";
import NewDM from "./components/new-dm";
import Kaguya from "@/assets/kaguya.gif"
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES,GET_USER_CHANNELS_ROUTE } from "@/utils/constants.js";
import { useAppStore } from "@/store";
import ContactList from "@/components/ui/contacts-list";
import CreateChannel from "./components/create-channel";
const ContactsContainer = () =>{


  const {directMessagesContacts,setDirectMessagesContacts,channels,setChannels} = useAppStore()

    useEffect(()=>{
      
      const getContacts = async ()=>{
         const response = await apiClient.get(GET_DM_CONTACTS_ROUTES,{withCredentials:true})
        
         if(response.data.contacts){
           setDirectMessagesContacts(response.data.contacts)
         }
      }


      const getChannels = async ()=>{
        const response = await apiClient.get(GET_USER_CHANNELS_ROUTE,{withCredentials:true})
       
        if(response.data.channels){
          setChannels(response.data.channels)
        }
     }

      getContacts()
      getChannels()

    },[])

    return(
        <div className="relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full">
            <div className="pt-3 flex items-center justify-center">
            <img src={Kaguya} alt="Honey Pie Gif" className="h-[100px] rounded-full cursor-pointer xs:h-[70px]"></img> 
            <span className="text-purple-500 font-bold">Async Chat-App!</span>
            </div>

            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages"></Title>
                    <NewDM></NewDM>
                </div>
                <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
                  <ContactList contacts={directMessagesContacts}/>
                </div>
            </div>

            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Channels"></Title>
                    <CreateChannel/>
                </div>

                <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
                  <ContactList contacts={channels} isChannel={true}/>
                </div>

            </div>
            <ProfileInfo/>
        </div>
    )
}

export default ContactsContainer;


const Title = ({text}) =>{
    return (
        <h6 className="cursor-pointer uppercase tracking-widest text-neutral-400 pl-10 font-light text-opacity-90 text-sm">{text}</h6>
    )
}
