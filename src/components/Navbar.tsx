"use client"
import React from "react";
import Menu from "./menu"; // Check karein agar ye folder name bhi small hai
import Link from "next/link";
import CartIcon from "./CartIcon";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'

const Navbar = () => {
    const { isSignedIn, user } = useUser();
    
    // Admin check logic
    const isAdmin =
    isSignedIn &&
    user?.primaryEmailAddress?.emailAddress ===
      process.env.NEXT_PUBLIC_ADMIN_EMAIL;
    
    return (
        <div className="h-12 text-red-500 gap-3 p-4 flex items-center md:h-24 justify-between border-b-2 border-b-red-500 uppercase lg:px-20 xl:px-40">
            {/* LEFT LINKS */}
            <div className="hidden md:flex gap-4 flex-1">
                <Link href="/">HomePage</Link>
                <Link href="/menu">Menu</Link>
                <Link href="/">Contact</Link>
                {/* ✅ Paths changed to lowercase */}
                {isAdmin && <Link href="/admin">Admin</Link>}
                {isAdmin && <Link href="/order">Order</Link>}
            </div>

            {/* LOGO */}
            <div className="text-xl md:font-bold flex-1 md:text-center">
                <Link href="/">Massimo</Link>
            </div>

            {/* MOBILE MENU */}
            <div className="md:hidden"> 
                <Menu/>
            </div>

            {/* RIGHT LINKS */}
            <div className="hidden md:flex justify-end gap-4 items-center flex-1">
                <div className="md:absolute top-3 r-2 lg:static flex items-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md">
                    <Image src="/phone.png" alt="phone" width={20} height={20} />
                    <span className="text-xs lg:text-sm">123 456 78</span>
                </div>
                
                <CartIcon/>

                <div className="mt-0">
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </div>
        </div>
    )
}

export default Navbar;