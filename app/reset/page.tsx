import { redirect } from "next/navigation";

export default function LoginPage() {
  // Redirect to login if someone tries to access /verify directly
  redirect('/login');
}