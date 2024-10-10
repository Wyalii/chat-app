import React from "react";
import Lottie from 'react-lottie'
import { animationDefaultOptions } from "@/lib/utils";
import HoneyPie from "@/assets/honey-pie.gif"
const EmptyChatContainer = () =>{
    return(
        <div className="flex-1 md:flex flex-col justify-center items-center hidden duration-1000 transition-all bg-[url(/src/assets/city.jpg)] bg-cover">
           <img src={HoneyPie} alt="Honey Pie Gif" className="h-[100px] rounded-full cursor-pointer xs:h-[70px]"></img>
           <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-200 text-center">
              <h3 className="poppins-medium">
                 Hi <span className="text-purple-500">!</span> <span>Welcome to </span>
                 <span className="text-purple-500">Syncronus</span> <span>chat-app</span>
                 <span className="text-purple-500">.</span>
              </h3>
           </div>
        </div>

    )
}

export default EmptyChatContainer