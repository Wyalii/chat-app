import { useAppStore } from "@/store";
import {Avatar} from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
const ContactList = ({contacts, isChannel = false})=>{

   const {selectedChatData, setSelectedChatData, selectedChatType, setSelectedChatType,setSelectedChatMessages} = useAppStore()

   const handleClick = (contact) =>{
      if(isChannel){
        setSelectedChatType("channel")
      }else{
        setSelectedChatType("contact")
      }

      setSelectedChatData(contact)

      if(selectedChatData && selectedChatData._id !== contact.id){
         setSelectedChatMessages([])
      }
   }

    return(
        <div className="mt-5">
            {
                contacts.map(contact => (<div key={contact._id} onClick={() => handleClick(contact)} className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${selectedChatData && selectedChatData._id === contact._id ? "bg-[#8417ff] hover:bg-[#8417ff]" : "hover:bg-[#f1f1f111]"}`}>
                    <div className="flex gap-5 items-center justify-start text-neutral-300 ">
                        {
                            !isChannel && <Avatar className = "h-10 w-10 rounded-full overflow-hidden">
                            {
                               contact.image ? (<AvatarImage src = {`${HOST}/${contact.image}`} alt = "Profile" className = "object-cover w-full h-full bg-black"></AvatarImage> ) :( 
                               <div className={`uppercase h-10 w-10 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)}`}>
                                 {contact.firstName ? contact.firstName.split("").shift() :contact.email.split("").shift()}
                               </div>
                            )}
                        </Avatar>
                        }
                    </div>
                </div>))
            }
        </div>
    )
}

export default ContactList;