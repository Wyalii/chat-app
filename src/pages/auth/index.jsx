import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Background from "../../assets/loginLogo.jpg"
import HoneyPie from '../../assets/honey-pie.gif'
import HoneyPieMP3 from '../../assets/HoneyPie.mp3'
import { useState,useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { apiClient } from "@/lib/api-client.js"
import { LOGIN_ROUTE, SIGNUP_ROUTE } from "@/utils/constants.js"
import { useNavigate } from "react-router-dom"
import { useAppStore } from "@/store"
const Auth = () =>{
    const audioRef = useRef(new Audio(HoneyPieMP3));
    const [isPlaying, setIsPlaying] = useState(false);
    const [analyser, setAnalyser] = useState(null);
    const [dataArray, setDataArray] = useState([]);
    const canvasRef = useRef(null);
    const navigate = useNavigate()
    const {setUserInfo} = useAppStore()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const validateLogin = () =>{
        if(!email.length){
            toast.error("Email is required.")
            return false;
        }

        if(!password.length){
            toast.error("Password is required.")
            return false
        }
        return true;

        
    }

    const validateSignup = () =>{
        if(!email.length){
            toast.error("Email is required.")
            return false;
        }

        if(!password.length){
            toast.error("Password is required.")
            return false
        }

        if(password !== confirmPassword){
            toast.error("passowrd and confirm password should be same.")
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        if(validateLogin()){
            const response = await apiClient.post(LOGIN_ROUTE,{email,password},{withCredentials:true})
            console.log({response})

            if(response.data.user.id){
                setUserInfo(response.data.user)
                if(response.data.user.profileSetup){
                    navigate("/chat")
                }else{
                    navigate("/profile")
                }
            }

        }
    }

    const handleSignup = async () => {
        if(validateSignup()){
            const response = await apiClient.post(SIGNUP_ROUTE,{email,password},{withCredentials:true})
            console.log({response})
            if(response.status ===201){
                setUserInfo(response.data.user)
                navigate("/profile")
            }
        }
    }

    const handlePlayMusic = () => {
        if(isPlaying){
            audioRef.current.pause()
            setIsPlaying(false)
        }else{
            audioRef.current.play()
            setIsPlaying(true)
        }
    };
    
    return(
        <div className=" h-[100vh] w-[100vw] flex justify-center items-center bg-[url(/src/assets/background2.jpg)] bg-cover" >
            <div className="h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90] lg:w-[70] xl:w-[60wv] rounded-3xl grid xl:grid-cols-2 opacity-95">
                <div className="flex flex-col gap-10 items-center justify-center">
                    <div className="flex items-center justify-center flex-col">
                        <div className="flex items-center justify-center">
                            <h1 className="text-5xl font-bold md:text-6xl sm:text-4xl">Welcome</h1>
                            <img src={HoneyPie} alt="Honey Pie Gif" className="h-[100px] rounded-full cursor-pointer xs:h-[70px]" onClick={handlePlayMusic}></img>
                        </div>
                        <p className="font-medium text-center ">Fill in the details to get started with chat-app!</p>
                    </div>
                    <div className="flex items-center justify-center w-full">
                        <Tabs className="w-3/4" defaultValue="login">
                            <TabsList className="bg-transparent rounded-none w-full ">
                                <TabsTrigger value="login" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Login</TabsTrigger>
                                <TabsTrigger value="signup" className="data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-purple-500 p-3 transition-all duration-300">Signup</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login" className="flex flex-col gap-5 mt-10 ">
                                <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={e=>{setEmail(e.target.value)}}></Input>
                                <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={e=>{setPassword(e.target.value)}}></Input>
                                 <Button className="rounded-full p-6" onClick={handleLogin}>Login</Button>
                            </TabsContent>
                            <TabsContent value="signup" className="flex flex-col gap-5">
                            <Input placeholder="Email" type="email" className="rounded-full p-6" value={email} onChange={e=>{setEmail(e.target.value)}}></Input>
                            <Input placeholder="Password" type="password" className="rounded-full p-6" value={password} onChange={e=>{setPassword(e.target.value)}}></Input>
                            <Input placeholder="Confirm Password" type="password" className="rounded-full p-6" value={confirmPassword} onChange={e=>{setConfirmPassword(e.target.value)}}></Input>
                            <Button className="rounded-full p-6" onClick={handleSignup}>Signup</Button>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
                <div className="hidden xl:flex items-center justify-center">
                    <img src={Background} alt="background" className="h-[600px] "></img>
                </div>
            </div>
        </div>
    )
}

export default Auth
