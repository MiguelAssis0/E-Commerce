"use client"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full flex items-center py-2 px-8 justify-between z-50 bg-slate-800 text-gray-300">
      <Link href="/" className="uppercase font-bold text-md h-12 flex items-center">
        Next Store
      </Link>
      <div className="flex items-center gap-8">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center">
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  )
}