import { AppWindowIcon, CodeIcon, Loader } from "lucide-react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useLoginUserMutation, useRegisterUserMutation } from "../app/api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [registerUser, {data:registerData, error:registerError, isLoading:registerIsLoading, isSuccess:registerIsSuccess}] = useRegisterUserMutation();
  const [loginUser, {data:loginData, error:loginError, isLoading:loginIsLoading, isSuccess:loginIsSuccess}] = useLoginUserMutation();

  const navigate = useNavigate()
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    }

    if (type === "login") {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = async(type)=>{
    const inputData = type === "signup" ? signupInput : loginInput
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
    console.log(inputData)

  }

  useEffect(()=>{
   if(registerIsSuccess && registerData){
     toast.success(registerData.message)
     navigate('/login')
   }
   if(registerError){
     toast.error(registerError.data.message)
   }
    if(loginIsSuccess && loginData){
     toast.success(loginData.message)
     navigate('/')
   }
   if(loginError){
     toast.error(loginError.data.message)
   }
   
  },[loginIsLoading, registerIsLoading, loginData, registerData, loginIsSuccess, registerIsSuccess, loginError, registerError, navigate])

  return (
    <div className="flex w-full items-center justify-center bg-zinc-900 text-white min-h-screen">
      <Tabs className="w-100">
        <TabsList className="bg-zinc-800 text-white ml-30">
          <TabsTrigger
            value="signup"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Signup
          </TabsTrigger>
          <TabsTrigger
            value="login"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Login
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signup">
          <Card className="bg-zinc-800 text-white">
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription className=" font-light text-gray-400 drop-shadow-2xl">
                Create a new account and click signup when you are finished.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name" className="text-white">
                  Name
                </Label>
                <Input
                  id="tabs-demo-name"
                  className="bg-zinc-700 text-white border-none placeholder:text-zinc-400"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-email" className="text-white">
                  Email
                </Label>
                <Input
                  id="tabs-demo-email"
                  className="bg-zinc-700 text-white border-none placeholder:text-zinc-400"
                  name="email"
                  value={signupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-password" className="text-white">
                  Password
                </Label>
                <Input
                  id="tabs-demo-password"
                  className="bg-zinc-700 text-white border-none placeholder:text-zinc-400"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={()=>handleRegistration("signup")} className="bg-zinc-700 cursor-pointer hover:bg-zinc-800">
               {
                 registerIsLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                 ) : "Signup"
               }
                
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card className="bg-zinc-800 text-white">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription className="text-sm font-light text-gray-400">
                login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current" className="text-white">
                  Email
                </Label>
                <Input
                  id="tabs-demo-current"
                  type="email"
                  className="bg-zinc-700 text-white border-none placeholder:text-zinc-400"
                  name="email"
                  value={loginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new" className="text-white">
                  Password
                </Label>
                <Input
                  id="tabs-demo-new"
                  type="password"
                  className="bg-zinc-700 text-white border-none placeholder:text-zinc-400"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={()=>handleRegistration("login")}  className="bg-zinc-700 cursor-pointer hover:bg-zinc-800">
               {loginIsLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
               ) : "Login"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
