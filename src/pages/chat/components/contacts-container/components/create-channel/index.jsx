import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { apiClient } from "@/lib/api-client"
import { SEARCH_CONTACTS_ROUTES } from "@/utils/constants"
import { ScrollArea } from "@/components/ui/scroll-area"

import { getColor } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import Luffy from "@/assets/luffy1.webp"
import { HOST } from "@/utils/constants"
  
const CreateChannel = () => {
    const {setSelectedChatType,setSelectedChatData} = useAppStore()
    const [openNewContactModal,setOpenNewContactModal] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])
    
    const searchContacts = async (searchTerm) => {
       try {

         if(searchTerm.length >0){
           const response = await apiClient.post(SEARCH_CONTACTS_ROUTES,{searchTerm},{withCredentials:true})

           if(response.status === 200 && response.data.contacts){
            setSearchedContacts(response.data.contacts)
           }

         }else{
          setSearchedContacts([])
         } 
         
       } catch (error) {
         console.log([error])
       }
    }


    const selectNewContact = (contact) =>{
       setOpenNewContactModal(false);
       setSelectedChatType("contact")
       setSelectedChatData(contact)
       setSearchedContacts([])
    }
    return(
        <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><FaPlus className="text-neutral-400 font-light text-opacity-90 text-small hover:text-neutral-100 cursor-pointer transition-all duration-300" onClick={()=> setOpenNewContactModal(true)}/></TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
              Select New Contact
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
          <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
           <DialogHeader>
            <DialogTitle>please select a contact</DialogTitle>
            <DialogDescription>
               
            </DialogDescription>
           </DialogHeader>
           <div>
            <Input placeholder="search contacts" className="rounded-lg p-6 bg-[#2c2e3b] border-none" onChange={(e)=> searchContacts(e.target.value)}/>
           </div>

          </DialogContent>
        </Dialog>


        </>
    )
}

export default CreateChannel