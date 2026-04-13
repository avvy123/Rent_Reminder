"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  // countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // redirect
  useEffect(() => {
    if (countdown === 0) {
      router.replace("/auth/login");
    }
  }, [countdown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Access Denied</h1>

        <p className="text-white/90">
          You are not authorized to view this page.
        </p>

        <p className="text-white/80">
          Redirecting to login in{" "}
          <span className="font-bold text-lg">{countdown}</span>{" "}
          {countdown === 1 ? "second" : "seconds"}...
        </p>

        {/* Loader */}
        <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mt-4"></div>

        <button
          onClick={() => router.replace("/auth/login")}
          className="mt-4 px-6 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Go to Login Now
        </button>
      </div>
    </div>
  );
}