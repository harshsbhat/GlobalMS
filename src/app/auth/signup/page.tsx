"use client"
import HankoAuth from "@/components/HankoAuth";


export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="flex flex-col justify-center items-center lg:flex-row max-w-7xl mx-auto px-6 min-h-[calc(100vh-88px)] gap-12">
        <div className="flex-1 flex justify-center w-full lg:w-auto">
          <div className="max-w-md sm: flex items-center justify-center">
            <HankoAuth />
          </div>
        </div>
        <div className="hidden lg:flex flex-1 lg:border-l lg:border-zinc-500 lg:pl-12">
          <div className="space-y-6 max-w-lg">
            <blockquote className="text-4xl font-light leading-relaxed bg-gradient-to-r from-zinc-800 to-zinc-500 bg-clip-text text-transparent">
              GlobalMS: Monitor your APIs and Services from 18 regions.
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}
