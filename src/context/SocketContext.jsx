import { useAppStore } from "@/store"
import { HOST } from "@/utils/constants"
import { Children, createContex, useContext, useEffect, useRef} from "react"
import { Socket } from "socket.io"
const SocketContext = createContext(null)

export const useSocket = () =>{
    return useContext(SocketContext)
}

export const SocketProvider = ({children}) =>{
  const socket = useRef();
  const {userInfo} = useAppStore();
  
  useEffect(()=>{

    if(userInfo){
        socket.current = io(HOST, {
            withCredentials:true,
            query:{userId: userInfo.id},
        })

        socket.current.on("connect",()=>{
            console.log("connected to socket server")
        })
    }

    return ()=>{
        socket.current.disconnect()
    }

  },[userInfo])
}
