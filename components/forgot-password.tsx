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
import { forgotPassword } from "@/utils/APICalls" // Assuming you have a function to send reset link
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

 function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [domain, setDomain] = useState("");

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleDomainChange = (e: any) => {
    setDomain(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailPattern.test(email)){
      alert("please enter valid email address")
      return;
    }
    if(!domain){
      alert("please enter domain name")
      return;
    }

    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("email", email);
      localStorage.setItem("domain", domain);
    }

    const response=await forgotPassword(email,domain)
    


    if (response.status===1) {
      // Handle success (e.g., show a message or redirect)
      alert("Reset link sent to your email!");
      // router.push("/login"); // Redirect to login after sending the link
    }
    else{
      alert("failed to send reset link")
    }
  };

  return (
    <div className="relative group">
      {/* Animated border background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl blur opacity-60 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>

      <Card className="relative mx-auto max-w-sm bg-gradient-to-br from-slate-50 to-white backdrop-blur-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-slate-600">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={handleChange}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="domain" className="text-slate-700">Domain Name</Label>
              <Input
                id="domain"
                type="text"
                placeholder="example.com"
                required
                onChange={handleDomainChange}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
              />
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-5 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-200 animate-gradient-x"
            >
              Send Reset Link
            </Button>
            <div className="mt-6 text-center text-sm text-slate-600">
              Remembered your password?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-indigo-600 hover:underline transition-colors duration-200">
                Login
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export default ForgotPasswordForm;