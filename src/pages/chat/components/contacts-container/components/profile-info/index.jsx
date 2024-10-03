import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import { Tooltip,TooltipProvider,TooltipContent,TooltipTrigger } from "@/components/ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ProfileInfo = ()=>{
    const {userInfo} = useAppStore()
    const navigate = useNavigate();
    return(
        <div className="absolute bottom-0 h-16 flex items-center justify-center px-10 w-full bg-[#2a2b33] gap-10">
            <div className="flex gap-3 items-center justify-center">
                <div className="w-12 h-12 relative">
                <Avatar className = "h-12 w-12 rounded-full overflow-hidden">
                        {
                           userInfo.image ? (<AvatarImage src = {`${HOST}/${userInfo.image}`} alt = "Profile" className = "object-cover w-full h-full bg-black"></AvatarImage> ) :( 
                           <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo.color)}`}>
                             {userInfo.firstName ? userInfo.firstName.split("").shift() :userInfo.email.split("").shift()}
                           </div>
                        )}
                    </Avatar>
                </div>
                <div>
                    {
                        userInfo.firstName && userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : ""
                    }
                </div>
            </div>
            <div className="flex gap-5">
              <TooltipProvider>
               <Tooltip>
                 <TooltipTrigger><FiEdit2 className="text-purple-500 text-xl font-medium" onClick={()=> navigate('/profile')}/></TooltipTrigger>
                  <TooltipContent className="b-[#1c1b1e] border-none text-white">
                    Edit Profile
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

            </div>
        </div>
    )
}


export default ProfileInfo

