import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center bg-fuchsia-50">
      {/* MAIN CONTAINER */}
      <div className="h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[80%] md:w-full lg:w-[70%] 2xl:w-1/2 overflow-hidden bg-white">
        
        {/* LEFT SIDE: IMAGE */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png.png" alt="Login Background" fill className="object-cover"/>
        </div>

        {/* RIGHT SIDE: CLERK SIGN-IN */}
        <div className="p-4 md:p-10 flex flex-col items-center justify-center gap-4 md:w-1/2 overflow-y-auto">
          <h1 className="font-bold text-xl xl:text-3xl text-red-500 uppercase">Welcome Back</h1>
          <p className="text-gray-500 text-sm text-center mb-4">Login to your account</p>
          
          <SignIn 
            path="/sign-in" // Ye line Localhost par redirect fix karti hai
            routing="path"
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                rootBox: "w-full flex justify-center",
                card: "shadow-none border-none p-0 w-full",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                footer: "hidden",
                formButtonPrimary: "bg-red-500 hover:bg-red-600 text-sm normal-case",
              },
            }}
          />

          <p className="text-xs mt-4">
            New here? <Link className="underline text-red-500" href="/sign-up">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;