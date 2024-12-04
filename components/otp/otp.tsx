"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { verifyOTP } from "@/utils/APICalls"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

function InputOTPForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await verifyOTP(data.pin) // API call with input OTP
      console.log("response for login", response)
      if (response?.status === 1) {
        toast({
          title: "Login Successful",
          description: "Redirecting to the dashboard...",
        })

        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('domain', response.data.website);
          localStorage.setItem('username', response.data.email);
          localStorage.setItem('fullname', response.data.full_name);
        }

        router.push("/dashboard/Home")  // Redirect on successful OTP verification
      } else {
        toast({
          title: "OTP Verification Failed",
          description: response.message || "Please try again.",
          // status: "error",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during OTP verification. Please try again.",
        // status: "error",
      })
      console.error("OTP verification error:", error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> {/* Centering the form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      {/* <InputOTPSlot index={6} /> */}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
          <Button type="button" className="mt-4 ml-3">Resend OTP</Button> {/* Added Resend OTP button */}
        </form>
      </Form>
    </div>
  )
}
export default InputOTPForm;
