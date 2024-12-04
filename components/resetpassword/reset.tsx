

'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { resetPassword } from "@/utils/APICalls";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ResetPassword({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const email = localStorage.getItem('email') || '';
  const domain=localStorage.getItem('domain') || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const response = await resetPassword(params.token, newPassword,domain);
      
      if (response.status === 1) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error(response.message || "Failed to reset password");
      }
    } catch (err: any) {
      console.error("Reset password error:", err);
      setError(
        err.response?.data?.message || 
        err.message || 
        "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-md relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
        
        <Card className="relative shadow-2xl border-0">
          <CardHeader className="space-y-4 pb-8">
            <CardTitle className="text-3xl sm:text-4xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Reset Password
            </CardTitle>
            <CardDescription className="text-slate-600 text-base sm:text-lg text-center px-4">
              Enter a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {success && (
              <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
                <AlertDescription className="text-center font-medium">
                  Password reset successfully! Redirecting to login...
                </AlertDescription>
              </Alert>
            )}

            {error && (
              <Alert variant="destructive" className="bg-red-50 text-red-700 border-red-200">
                <AlertDescription className="text-center font-medium">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">

              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              disabled
              className="h-12 rounded-xl border-slate-200 bg-white/50 backdrop-blur-sm"
              placeholder="Your email"
        />
                <Label htmlFor="newPassword" className="text-sm font-medium text-slate-700">
                  New Password
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your new password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 rounded-xl border-slate-200 bg-white/50 backdrop-blur-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                  placeholder="Confirm your new password"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || success}
                className="w-full h-12 text-base sm:text-lg font-semibold rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-[1.02]"
              >
                {loading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Resetting Password...</span>
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>

              <div className="text-center text-sm text-slate-600">
                Remembered your password?{" "}
                <Link 
                  href="/login" 
                  className="font-medium text-blue-600 hover:text-indigo-600 hover:underline transition-colors duration-200"
                >
                  Login
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}