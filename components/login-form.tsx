'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/utils/APICalls"
import { isAuthenticated } from "@/utils/Authentication"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function LoginForm() {
  const router = useRouter();

  const [loginDetails, setLoginDetails] = useState({
    domain: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setLoginDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await login(
      loginDetails.domain,
      loginDetails.password
    );
    console.log("response:",response);

    if (response.status===1) {
      if (typeof window !== "undefined") {
        localStorage.setItem('domain', response.data);
        // localStorage.setItem('username', response.data.username);
        // localStorage.setItem('user_id', response.data.user_id);
        localStorage.setItem('auth', "true");
      }
      router.push("/dashboard/Home");
    }
    else{
      alert("incorrect username or password")
    }
   

  };

  return (
    <div className="relative group">
      {/* Animated border background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl blur opacity-60 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>

      <Card className="relative mx-auto max-w-sm bg-gradient-to-br from-slate-50 to-white backdrop-blur-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Login to Dashboard
          </CardTitle>
          <CardDescription className="text-slate-600">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="domain" className="text-slate-700">Domain name</Label>
              <Input
                id="domain"
                type="text"
                placeholder="www.example.com"
                required
                name="domain"
                onChange={handleChange}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm text-blue-600 hover:text-indigo-600 transition-colors duration-200">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                required
                name="password"
                onChange={handleChange}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-5 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-200 animate-gradient-x"
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="w-full py-5 text-lg font-semibold rounded-lg border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
            >
              {/* <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" /> */}
              Login with Google
            </Button>
          </div>
          <div className="mt-6 text-center text-sm text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-indigo-600 hover:underline transition-colors duration-200">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
