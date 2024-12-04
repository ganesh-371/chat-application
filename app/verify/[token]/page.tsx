'use client'
import { redirect } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { verify } from "@/utils/APICalls";
import { useEffect ,useState} from "react";

interface Props {
  params: {
    token: string;
  };
}

async function VerifyPage({ params }: Props) {
  const { token } = params;
  const [res, setRes] = useState<{ status: number; data?: any } | null>(null); // State to hold the response
  useEffect(() => {
    const verifyUser = async () => {
      const response = await verify(token);
      console.log("verify page response:", response);
      console.log("Response details:", JSON.stringify(response, null, 2));
      if (typeof Window !== "undefined") {
        if (response.status === 1) {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              fullName: response.data.full_name,
              fullDomain: response.data.full_domain,
              email: response.data.email,
            })
          );
        }
      }
    };

    verifyUser(); // Call the verification function
  }, [token]);

  if (res && res.status === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Verification Failed
          </h1>
          <p className="mt-2 text-gray-600">Static error message for testing</p>
          <Link href="/signup">
            <Button className="mt-4">Return to Signup</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        {/* <h1 className="text-2xl font-bold text-green-600">Email Verified! id:{params.token}</h1> */}
        <p className="mt-2 text-gray-600">
          Your email has been successfully verified.
        </p>
        <Link href="/login">
          <Button className="mt-4">login</Button>
        </Link>
      </div>
    </div>
  );
}

export default VerifyPage;
