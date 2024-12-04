import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { plans } from "@/components/PaymentPlan/planData";
import Link from "next/link";
import { Check, CheckCircle2, Star } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentPlan = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<{
    fullName: string;
    fullDomain: string;
    email: string;
  } | null>(null);

  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    // Check for user data in localStorage
    if (typeof window === "undefined" || !localStorage) {
      setLoading(false);
      return;
    }

    const storedUserData = localStorage.getItem("userData");

    try {
      if (storedUserData) {
        const parsedUserData = JSON.parse(storedUserData);

        // More flexible validation
                if (parsedUserData && 
          parsedUserData.fullName &&
          parsedUserData.email &&
                    parsedUserData.fullDomain) {
          setUserData(parsedUserData);
        } else {
                    console.error('Incomplete user data', parsedUserData);
                    router.push('/signup');
        }
      } else {
        // If no user data, redirect to signup
        // router.push('/signup');
      }
    } catch (error) {
            console.error('Error parsing user data', error);
            router.push('/signup');
    } finally {
      setLoading(false);
    }

    // Load the Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      console.log("Razorpay script loaded successfully");
    };
    script.onerror = () => {
      console.error("Failed to load the Razorpay script");
    };
    document.body.appendChild(script);
  }, [router]);

  const handleLogin = async () => {
    if (!userData) return;

    try {
            const response = await fetch("https://chatbot.brainwave-labs.com/chat_bot/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.email,
            full_domain: userData.fullDomain,
          }),
            });

      const data = await response.json();

      if (data.status === 1) {
        // Login successful
        // Store login token or user info in localStorage if needed
                if (typeof window !== 'undefined' && localStorage) {
                localStorage.setItem('loginToken', data.token);
                localStorage.setItem('userInfo', JSON.stringify(data.user));
        }

        // Redirect to dashboard or home page
                router.push('/dashboard');
      } else {
        // Login failed
        alert(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  const handleSelectPlan = async (planId: number) => {
    setSelectedPlan(planId);
    setLoadingPayment(true);

    try {
            const response = await fetch("https://chatbot.brainwave-labs.com/chat_bot/create-subscription/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
                    plan_id: planId === 1 ? "plan_Onu0RyHj2tYSjj" : "plan_OoJKHhDNNzIA9E",
            email: userData?.email,
            name: userData?.fullName,
          }),
            });

      const data = await response.json();
      console.log("create-subscription data: ", data);

      const options = {
        key: "rzp_test_QkHHKMlOcZ0HTb",
        subscription_id: data.subscription_id,
        name: "BuddyLearn",
        description: "Educational App",
        handler: async function (response: any) {
                    alert("Payment successful! Payment ID: " + response.razorpay_payment_id);

          // Attempt to log in after successful payment
          await handleLogin();
        },
        prefill: {
          name: userData?.fullName,
          email: userData?.email,
        },
        theme: {
          color: "#FEFEFE",
        },
        modal: {
          ondismiss: function () {
            // If the payment window is closed by the user
            alert("Payment process was interrupted. Please try again.");
                        setLoadingPayment(false);  // Re-enable the buttons
            setSelectedPlan(null);
          },
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay SDK failed to load. Please try again later.");
                setLoadingPayment(false);  // Re-enable the buttons
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Please try again.");
            setLoadingPayment(false);  // Re-enable the buttons
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No user data found</h2>
                    <p className="text-gray-600 mb-6">Please return to the signup page or login page to start over.</p>

          <div className="flex justify-center space-x-4">
            <Link
              href="/signup"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Go to Signup
            </Link>
            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 relative flex items-center justify-center">
      {/* Navigation */}
      <div className="absolute top-6 left-6 z-10">
        <Link
    href='/login' 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-1 shadow-lg hover:shadow-xl inline-flex items-center space-x-2"
        >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Login</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <h1 className="text-center text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-12 tracking-tight">
          Hello {userData.fullName}, Choose Your Plan
        </h1>

  <div className={`
    grid gap-8 
    ${plans.length === 2 
      ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
      : 'grid-cols-1 md:grid-cols-3'}
  `}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`
          relative rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform 
          ${selectedPlan === plan.id 
            ? 'scale-105 ring-4 ring-blue-400' 
            : 'hover:scale-105 hover:shadow-2xl'}
          ${plan.recommended 
            ? 'bg-gradient-to-br from-indigo-50 via-white to-blue-100' 
            : 'bg-white'}
          p-6 text-center
        `}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-1.5 text-xs font-bold uppercase transform rotate-45 origin-top-right -translate-y-1/2 translate-x-1/2 shadow-lg z-10">
                  <Star className="inline-block mr-1 h-3 w-3 -mt-0.5" />
                  Recommended
                </div>
              )}

              <div className="relative z-20">
          <h2 className={`
            text-2xl md:text-3xl font-bold mb-4 
            ${plan.recommended 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600' 
              : 'text-gray-800'}
          `}>
                  {plan.name}
                </h2>

                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-blue-600">
                    Rs. {plan.price}
                    <span className="text-sm text-gray-500 font-normal ml-2">
                {plan.price === 0 ? '/7 days' : '/month'}
                    </span>
                  </span>
                </div>

                <ul className="space-y-3 mb-6 text-left">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-gray-700 space-x-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm md:text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={loadingPayment}
            className={`
              w-full py-3.5 rounded-xl text-white font-bold uppercase tracking-wider transition-all duration-300 ease-in-out
              ${selectedPlan === plan.id 
                ? 'bg-blue-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl'}
              ${loadingPayment && selectedPlan === plan.id ? 'opacity-50' : ''}
              focus:outline-none focus:ring-4 focus:ring-blue-300
            `}
                >
            {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  {loadingPayment && selectedPlan === plan.id && (
                    <span className="ml-2 inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-white"></span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentPlan;