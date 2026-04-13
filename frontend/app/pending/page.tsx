"use client";

import { useRouter } from "next/navigation";

export default function PendingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 px-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center text-white">
        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-2">Account Under Review</h1>

        {/* DESCRIPTION */}
        <p className="text-sm text-white/80 leading-relaxed">
          Your account has been successfully created and is currently being
          reviewed by our admin team. You will get access once your account is
          approved.
        </p>

        <p className="text-sm text-white/80 mt-2">
          ⏳ Typical review time:{" "}
          <span className="font-semibold text-white">24–48 hours</span>
        </p>
        {/* BUTTON */}
        <button
          onClick={() => router.replace("/")}
          className="mt-6 w-full px-5 py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition shadow-lg cursor-pointer"
        >
          Explore Public Page
        </button>

        {/* FOOTNOTE */}
        <p className="text-xs text-white/60 mt-4">
          You can safely leave this page. We’ll notify you once approved.
        </p>
      </div>
    </div>
  );
}
