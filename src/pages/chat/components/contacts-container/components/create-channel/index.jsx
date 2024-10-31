import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
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
import { GET_ALL_CONTACTS_ROUTES, SEARCH_CONTACTS_ROUTES } from "@/utils/constants"
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button"
import MultipleSelector from "@/components/ui/multiselect"

const CreateChannel = () => {
    const {setSelectedChatType,setSelectedChatData} = useAppStore()
    const [newChannelModal,setNewChannelModal] = useState(false)
    const [searchedContacts, setSearchedContacts] = useState([])
    const [allContacts,setAllContacts] = useState([])
    const [selectedContacts,setSelectedContacts] = useState([])
    const [channelName,setChannelName] = useState("")

    useEffect(()=>{
       const getData = async () => 
       {
         const response = await apiClient.get(GET_ALL_CONTACTS_ROUTES, {withCredentials:true})
         setAllContacts(response.data.contacts)
       }

       getData()
    },[])
    
    
    const createChannel = async ()=>
    {

    }

    return(
        <>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger><FaPlus className="text-neutral-400 font-light text-opacity-90 text-small hover:text-neutral-100 cursor-pointer transition-all duration-300" onClick={()=> setNewChannelModal(true)}/></TooltipTrigger>
            <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
              Create New Channel
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog open={newChannelModal} onOpenChange={setNewChannelModal}>
          <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
           <DialogHeader>
            <DialogTitle>fill up details for channel</DialogTitle>
            <DialogDescription>
               
            </DialogDescription>
           </DialogHeader>
           <div>
            <Input placeholder="Channel Name" className="rounded-lg p-6 bg-[#2c2e3b] border-none" onChange={(e)=> setChannelName(e.target.value)} value = {channelName}/>
           </div>


           <div>
             <MultipleSelector className="rounded-lg p-6 border-none py-2 text-white" defaultOptions={allContacts} placeholder="search contacts" value={selectedContacts} onChange={setSelectedContacts} emptyIndicator ={<p className="text-black">no results found.</p>}/>
           </div>

           <div>
             <Button className = "w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300" onClick={createChannel}>Create Channel</Button>
           </div>

          </DialogContent>
        </Dialog>


        </>
    )
}

export default CreateChannel