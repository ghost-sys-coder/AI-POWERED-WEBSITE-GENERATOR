import React from "react";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = await auth(); // Ensure the auth context is initialized

  if (isAuthenticated) return redirect("/");

  return (
    <main className="flex min-h-screen">
      {/* Left section — always visible */}
      <div className="hidden md:flex flex-col flex-1 items-center justify-center bg-gray-50 p-10 sticky top-0 h-screen">
        <h1 className="text-3xl font-bold mb-6">Welcome to AstraPages</h1>
        <Image
          src="/images/auth_image.svg"
          alt="auth image"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>

      {/* Right section — scrollable content */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="max-w-md mx-auto min-h-full flex flex-col justify-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
