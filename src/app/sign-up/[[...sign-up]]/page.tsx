import { SignUp } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center bg-fuchsia-50">
      {/* BOX */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[85%] md:w-full lg:w-[70%] 2xl:w-1/2 overflow-hidden bg-white">
        
        {/* LEFT SIDE: IMAGE CONTAINER */}
        <div className="relative h-1/4 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png.png" alt="Signup Background" fill className="object-cover"/>
        </div>

        {/* RIGHT SIDE: CLERK SIGN-UP FORM */}
        <div className="p-4 md:p-8 flex flex-col items-center justify-center gap-2 md:w-1/2 overflow-y-auto">
          <h1 className="font-bold text-xl xl:text-3xl text-red-500 uppercase mt-2">Create Account</h1>
          <p className="text-gray-400 text-xs text-center mb-2">Join Massimo Restaurant family today!</p>
          
          {/* ASLI CLERK SIGN-UP COMPONENT */}
          <SignUp 
            appearance={{
              elements: {
                rootBox: "w-full flex justify-center scale-90 md:scale-100", // Mobile par thora chota kiya taake fit aaye
                card: "shadow-none border-none p-0 w-full",
                headerTitle: "hidden", 
                headerSubtitle: "hidden",
                footer: "hidden", 
                formButtonPrimary: "bg-red-500 hover:bg-red-600 text-sm normal-case",
                socialButtonsBlockButton: "border-gray-200 hover:bg-fuchsia-50",
              },
            }}
          />

          <p className="text-xs mt-2">
            Already have an account? <Link className="underline text-red-500" href="/sign-in">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;