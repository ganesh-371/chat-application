// 'use client'
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { useState } from "react"
// import { register } from "@/utils/APICalls"
// import { useRouter } from "next/navigation"

// export function SignupForm() {
//   const router = useRouter()
  
//   const [form, setForm] = useState({
//     name: "",
//     // username: "",
//     email: "",
//     domain: "",
//     confirmdomain:"",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     name: "",
//     // username: "",
//     email: "",
//     domain: "",
//     confirmdomain:"",
//     password: "",
//     confirmPassword: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: any) => {

//     console.log(e.target.name, e.target.value);

//     setForm((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));

//     setErrors((prevState) => ({
//       ...prevState,
//       [e.target.name]: "",
//     }));
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     setLoading(true);

//     // Validation for password and confirm password
//     if (form.password !== form.confirmPassword) {
//       alert("Passwords do not match.");
//       setLoading(false);
//       return;
//     }

//     // Validation for domain and confirm domain
//     if (form.domain !== form.confirmdomain) {
//       alert("Domain names do not match.");
//       setLoading(false);
//       return;
//     }

//     console.log(form);

//     const response = await register(
//       form.email,
//       form.password,
//       // form.username,
//       form.name,
//       form.domain
//     );

//     setLoading(false);

//     if (response) {
//       alert("Account created successfully, please verify");
//       router.push("/login");
//     } else {
//       alert("Failed to create account. Please try again.");
//     }
//   };


//   return (
//     <div className="relative group">
//       {/* Animated border background */}
//       <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl blur opacity-60 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>

//       <Card className="relative mx-auto max-w-3xl bg-gradient-to-br from-slate-50 to-white backdrop-blur-xl">
//         <CardHeader className="text-center">
//           <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
//             Create Account
//           </CardTitle>
//           <CardDescription className="text-slate-600 text-lg">
//             Get started with creating your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name" className="text-slate-700">Full Name</Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="John Doe"
//                   required
//                   name="name"
//                   onChange={handleChange}
//                   className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="email" className="text-slate-700">Email</Label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                   name="email"
//                   onChange={handleChange}
//                   className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="company" className="text-slate-700">Domain Name</Label>
//                 <Input
//                   id="domain"
//                   type="text"
//                   placeholder="Acme Inc."
//                   required
//                   name="domain"
//                   onChange={handleChange}
//                   className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="company" className="text-slate-700">Confirm Domain Name</Label>
//                 <Input
//                   id="confirmdomain"
//                   type="text"
//                   placeholder="Acme Inc."
//                   required
//                   name="confirmdomain"
//                   onChange={handleChange}
//                   className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="password" className="text-slate-700">Password</Label>
//                 <Input
//                   id="password"
//                   type="password"
//                   required
//                   name="password"
//                   onChange={handleChange}
//                   className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="confirmPassword" className="text-slate-700">Confirm Password</Label>
//                 <Input
//                   id="confirmPassword"
//                   type="password"
//                   required
//                   name="confirmPassword"
//                   onChange={handleChange}
//                   className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col gap-3 mt-2">
//               <Button
//                 type="submit"
//                 onClick={handleSubmit}
//                 className="w-full py-6 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-200 animate-gradient-x"
//               >
//                 Create Account
//               </Button>
//               {/* <Button 
//                 variant="outline" 
//                 className="w-full py-6 text-lg font-semibold rounded-lg border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
//               >
//                  <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" /> 
//                 Sign up with Google
//               </Button> */}
//             </div>

//             <div className="mt-6 text-center text-sm text-slate-600">
//               Already have an account?{" "}
//               <Link href="/login" className="font-medium text-blue-600 hover:text-indigo-600 hover:underline transition-colors duration-200">
//                 Login
//               </Link>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// } 

'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { register } from "@/utils/APICalls"; // Make sure this is correct and accessible
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

interface FormState {
  name: string;
  email: string;
  domain: string;
  confirmdomain: string;
  password: string;
  confirmPassword: string;
}

interface PasswordStrength {
  hasLength: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

interface ValidationState {
  domainMatch: boolean;
  passwordMatch: boolean;
  passwordStrength: PasswordStrength;
  isDomainValid: boolean;
}

export function SignupForm() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    domain: "",
    confirmdomain: "",
    password: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState<ValidationState>({
    domainMatch: false,
    passwordMatch: false,
    passwordStrength: {
      hasLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    },
    isDomainValid: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password strength validation
  const validatePassword = (password: string): PasswordStrength => {
    return {
      hasLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
  };

  // Domain validation
  const validateDomain = (domain: string): boolean => {
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/;
    return domainRegex.test(domain);
  };

  // Real-time validation effect
  useEffect(() => {
    setValidation((prev: ValidationState) => ({
      ...prev,
      domainMatch:
        Boolean(form.domain) &&
        Boolean(form.confirmdomain) &&
        form.domain === form.confirmdomain,
      passwordMatch:
        Boolean(form.password) &&
        Boolean(form.confirmPassword) &&
        form.password === form.confirmPassword,
      passwordStrength: validatePassword(form.password),
      isDomainValid: Boolean(form.domain) && validateDomain(form.domain),
    }));
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setError(null); // Reset error on input change
  };

  const resetForm = () => {
    // Reset form fields
    setForm({
      name: "",
      email: "",
      domain: "",
      confirmdomain: "",
      password: "",
      confirmPassword: "",
    });

    // Reset validation state
    setValidation({
      domainMatch: false,
      passwordMatch: false,
      passwordStrength: {
        hasLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
      },
      isDomainValid: false,
    });

    // Reset error and loading states
    setError(null);
    setLoading(false);

    // Manually reset input fields
    const form = document.querySelector('form');
    if (form) {
      const inputs = form.querySelectorAll('input');
      inputs.forEach((input: HTMLInputElement) => {
        input.value = '';
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("")
    setLoading(true);

    // Validation checks before API call
    if (!validation.passwordMatch) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!validation.domainMatch) {
      setError("Domain names do not match.");
      setLoading(false);
      return;
    }

    if (!validation.isDomainValid) {
      setError("Invalid domain name format.");
      setLoading(false);
      return;
    }

    const isPasswordStrong = Object.values(validation.passwordStrength).every(Boolean);
    if (!isPasswordStrong) {
      setError("Password does not meet strength requirements.");
      setLoading(false);
      return;
    }

    try {
      // Make sure the API URL is correct and the server is running
      const response = await register(
        form.email,
        form.password,
        form.name,
        form.domain
      );

      if (response) {
        alert("Account created successfully, please verify");
        router.push("/login");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } catch (err: any) {
      // Log the full error to diagnose the network error
      console.error("Registration error:", err);
      if (err.response) {
        // Server response exists but is an error

        if (err.response.status === 400 && 
          err.response.data?.detail === "This domain is already registered. Please choose a different one.") {
        setError("This domain is already in use. Please choose a different domain.");
        return;
      }
        setError(`Error: ${err.response.data?.message || 'Something went wrong'}`);
      } else if (err.request) {
        // No response from server
        setError("Network Error: Failed to reach server. Please check your connection or try again later.");
      } else {
        // Other errors
        setError(`Error: ${err.message}`);
      }
    }finally{
      setLoading(false);
    }

   
  };


  const getValidationColor = (isValid: boolean): string =>
    isValid ? "text-green-500" : "text-red-500";

  return (
    <div className="relative group">
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
          <form onSubmit={handleSubmit}>
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
                  <Label htmlFor="domain" className="text-slate-700">Domain Name</Label>
                  <Input
                    id="domain"
                    type="text"
                    placeholder="Acme Inc."
                    required
                    name="domain"
                    onChange={handleChange}
                    className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                  />
                  <div className="text-sm mt-1">
                    {form.domain && (
                      <div className={getValidationColor(validation.isDomainValid)}>
                        {validation.isDomainValid ? (
                          <div className="flex items-center">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Valid domain format
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <XCircle className="w-4 h-4 mr-1" />
                            Only letters, numbers, hyphens, and dots allowed
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmdomain" className="text-slate-700">Confirm Domain Name</Label>
                  <Input
                    id="confirmdomain"
                    type="text"
                    placeholder="Acme Inc."
                    required
                    name="confirmdomain"
                    onChange={handleChange}
                    className="rounded-lg border-slate-200 focus:border-blue-500 focus:ring-blue-500 transition-colors duration-200"
                  />
                  {form.confirmdomain && (
                    <div className={`text-sm mt-1 ${getValidationColor(validation.domainMatch)}`}>
                      {validation.domainMatch ? (
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Domains match
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          Domains do not match
                        </div>
                      )}
                    </div>
                  )}
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
                  {form.password && (
                    <div className="space-y-1 text-sm mt-1">
                      <div className={getValidationColor(validation.passwordStrength.hasLength)}>
                        <CheckCircle className={`w-4 h-4 inline mr-1 ${validation.passwordStrength.hasLength ? 'text-green-500' : 'text-red-500'}`} />
                        At least 8 characters
                      </div>
                      <div className={getValidationColor(validation.passwordStrength.hasUpperCase)}>
                        <CheckCircle className={`w-4 h-4 inline mr-1 ${validation.passwordStrength.hasUpperCase ? 'text-green-500' : 'text-red-500'}`} />
                        One uppercase letter
                      </div>
                      <div className={getValidationColor(validation.passwordStrength.hasLowerCase)}>
                        <CheckCircle className={`w-4 h-4 inline mr-1 ${validation.passwordStrength.hasLowerCase ? 'text-green-500' : 'text-red-500'}`} />
                        One lowercase letter
                      </div>
                      <div className={getValidationColor(validation.passwordStrength.hasNumber)}>
                        <CheckCircle className={`w-4 h-4 inline mr-1 ${validation.passwordStrength.hasNumber ? 'text-green-500' : 'text-red-500'}`} />
                        One number
                      </div>
                      <div className={getValidationColor(validation.passwordStrength.hasSpecialChar)}>
                        <CheckCircle className={`w-4 h-4 inline mr-1 ${validation.passwordStrength.hasSpecialChar ? 'text-green-500' : 'text-red-500'}`} />
                        One special character
                      </div>
                    </div>
                  )}
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
                  {form.confirmPassword && (
                    <div className={`text-sm mt-1 ${getValidationColor(validation.passwordMatch)}`}>
                      {validation.passwordMatch ? (
                        <div className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Passwords match
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <XCircle className="w-4 h-4 mr-1" />
                          Passwords do not match
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-center mt-4">
                  {error}
                </div>
              )}

              {/*<div className="flex flex-col gap-3 mt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-200 animate-gradient-x"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>*/}

              <div className="flex flex-col md:flex-row gap-3 mt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 text-lg font-semibold rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-200 animate-gradient-x"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="w-full py-6 text-lg font-semibold rounded-lg border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
                >
                  Reset Form
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-blue-600 hover:text-indigo-600 hover:underline transition-colors duration-200">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default SignupForm;
