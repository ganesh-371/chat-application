import { redirect } from "next/navigation";

export default function VerifyPage() {
  // Redirect to login if someone tries to access /verify directly
  redirect('/login');
}