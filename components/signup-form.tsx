'use client'
import Link from "next/link"
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
import { useState } from "react"
import { register } from "@/utils/APICalls"
import { useRouter } from "next/navigation"

export function SignupForm() {
  const router = useRouter()
  
  const [form, setForm] = useState({
    name: "",
    // username: "",
    email: "",
    domain: "",
    confirmdomain:"",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    // username: "",
    email: "",
    domain: "",
    confirmdomain:"",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {

    console.log(e.target.name, e.target.value);

    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    setErrors((prevState) => ({
      ...prevState,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    console.log(form);

    const response = await register(
      form.email,
      form.password,
      // form.username,
      form.name,
      form.domain
    );

    setLoading(false);

    if (response) {
      alert("Account created successfully,please verify");
      router.push("/login");
    }else {
      
      alert("Failed to create account. Please try again.");
    }

  };


  return (
    <div className="relative group">
      {/* Animated border background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl blur opacity-60 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>

      <Card className="relative mx-auto max-w-3xl bg-gradient-to-br from-slate-50 to-white backdrop-blur-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Create Account
          </CardTitle>
          <CardDescription className="text-slate-600 text-lg">
            Get started with creating your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-700">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  name="name"
                  onChange={handleChange}
                  className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  onChange={handleChange}
                  className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-700">Domain Name</Label>
                <Input
                  id="domain"
                  type="text"
                  placeholder="Acme Inc."
                  required
                  name="domain"
                  onChange={handleChange}
                  className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-slate-700">Confirm Domain Name</Label>
                <Input
                  id="confirmdomain"
                  type="text"
                  placeholder="Acme Inc."
                  required
                  name="confirmdomain"
                  onChange={handleChange}
                  className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  onChange={handleChange}
                  className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  name="confirmPassword"
                  onChange={handleChange}
                  className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <Button
                type="submit"
                onClick={handleSubmit}
                className="w-full py-6 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-200 animate-gradient-x"
              >
                Create Account
              </Button>
              {/* <Button 
                variant="outline" 
                className="w-full py-6 text-lg font-semibold rounded-lg border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
              >
                 <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" /> 
                Sign up with Google
              </Button> */}
            </div>

            <div className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
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