import { redirect } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Props {
  params: {
    token: string;
  };
}

async function VerifyPage({ params }: Props) {
 
  const isSuccess = false;

  if (!isSuccess) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Verification Failed</h1>
          <p className="mt-2 text-gray-600">Static error message for testing</p>
          <Link href="/login">
            <Button className="mt-4">
              Return to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-green-600">Email Verified! id:{params.token}</h1>
        <p className="mt-2 text-gray-600">Your email has been successfully verified.</p>
        <Link href="/login">
          <Button className="mt-4">
            Proceed to Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default VerifyPage; 