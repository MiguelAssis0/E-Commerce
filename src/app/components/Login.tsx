"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Login() {
    return(
        <div>
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
    )
}