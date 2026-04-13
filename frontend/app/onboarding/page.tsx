"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Select from "@/components/UI/Select";
import { useMutation } from "@tanstack/react-query";
import { submitOnboarding } from "@/services/onboardingService";
import Input from "@/components/UI/Input";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    intent: "",
    propertyType: "",
    propertyCount: "",
    bhk: "",
    city: "",
    mobile: ""
  });
  
  const intentOptions = [
    { label: "Landlord", value: "landlord" },
  ];
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onboardingMutation = useMutation({
    mutationFn: () => submitOnboarding(form),

    onSuccess: () => {
      router.push("/pending");
    },

    onError: (err) => {
      console.log("Onboarding failed:", err);
    },
  });

  const handleSubmit = () => {
    onboardingMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-6xl grid md:grid-cols-2 gap-10 rounded-2xl shadow-2xl p-8 space-y-6">
        {/* LEFT SIDE - INFO + IMAGES */}
        <div className="text-black space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            Set Up Your <br /> Property Profile 🏠
          </h1>

          <p className="text-gray-500">
            Help us personalize your Rent Reminder experience. Manage tenants,
            track rent, and automate payments with ease.
          </p>

          {/* IMAGE GRID */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <Image
              src="https://images.unsplash.com/photo-1560184897-502a475f7a0d"
              alt="property"
              width={250}
              height={180}
              className="rounded-xl object-cover"
            />

            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="apartment"
              width={250}
              height={180}
              className="rounded-xl object-cover"
            />

            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
              alt="home"
              width={250}
              height={180}
              className="rounded-xl object-cover"
            />

            <Image
              src="https://images.unsplash.com/photo-1570129477492-45c003edd2be"
              alt="building"
              width={250}
              height={180}
              className="rounded-xl object-cover"
            />
          </div>

          <p className="text-sm text-gray-500">
            🚀 Join landlords who reduced manual rent tracking by 90%
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Complete Your Profile
          </h2>

          <p className="text-gray-500 text-sm">
            Just a few details to personalize your dashboard
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 transition-all"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          {/* STEP TITLE */}
          <h1 className="text-2xl font-bold text-gray-800">
            {step === 1 && "Tell us your intent"}
            {step === 2 && "Property details"}
            {step === 3 && "Where are your properties located?"}
            {step === 4 && "Contact Details"}
          </h1>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4">
              <Select
                options={intentOptions}
                value={form.intent}
                onChange={(value) => setForm({ ...form, intent: value })}
              />

              <button
                disabled={!form.intent}
                onClick={nextStep}
                className="w-full bg-indigo-600 text-white p-3 rounded-lg disabled:opacity-50 cursor-pointer"
              >
                Continue →
              </button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4">
              {/* PROPERTY TYPE */}
              <Select
                label="Property Type"
                options={[
                  { label: "Apartment", value: "apartment" },
                  { label: "Independent House", value: "house" },
                  { label: "Villa", value: "villa" },
                  { label: "Commercial", value: "commercial" },
                ]}
                value={form.propertyType}
                onChange={(value) => setForm({ ...form, propertyType: value })}
              />

              {/* BHK CONFIGURATION */}
              <Select
                label="Configuration"
                options={[
                  { label: "1 BHK", value: "1bhk" },
                  { label: "2 BHK", value: "2bhk" },
                  { label: "3 BHK", value: "3bhk" },
                  { label: "4+ BHK", value: "4bhk+" },
                  { label: "Studio", value: "studio" },
                ]}
                value={form.bhk}
                onChange={(value) => setForm({ ...form, bhk: value })}
              />

              {/* PROPERTY COUNT */}
              <Input 
                type="numeric"
                label="Number of Properties"
                placeholder="How many properties ?"
                value={form.propertyCount}
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                }}
                onChange={(e) => setForm({ ...form, propertyCount: e.target.value })}
              />

              <div className="flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/2 border p-3 rounded-lg cursor-pointer"
                >
                  Back
                </button>

                <button
                  disabled={
                    !form.propertyType || !form.propertyCount || !form.bhk
                  }
                  onClick={nextStep}
                  className="w-1/2 bg-indigo-600 text-white p-3 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}
          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4">
              {/* CITY SELECT */}
              <Select
                label="City"
                options={[
                  { label: "Patna", value: "patna" },
                  { label: "Delhi", value: "delhi" },
                  { label: "Mumbai", value: "mumbai" },
                  { label: "Bangalore", value: "bangalore" },
                  { label: "Kolkata", value: "kolkata" },
                  { label: "Hyderabad", value: "hyderabad" },
                  { label: "Pune", value: "pune" },
                  { label: "Chennai", value: "chennai" },
                ]}
                value={form.city}
                onChange={(value) => setForm({ ...form, city: value })}
              />

              {/* BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/2 border p-3 rounded-lg cursor-pointer"
                >
                  Back
                </button>

                <button
                  disabled={!form.city}
                  onClick={nextStep}
                  className="w-1/2 bg-indigo-600 text-white p-3 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              {/* Contact Details */}
              <Input 
                label="Mobile"
                type="tel"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="Enter mobile number"
                onInput={(e) => {
                  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
                }}
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              />

              {/* BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={prevStep}
                  className="w-1/2 border p-3 rounded-lg cursor-pointer"
                >
                  Back
                </button>

                <button
                  disabled={!form.mobile}
                  onClick={handleSubmit}
                  className="w-1/2 bg-green-600 text-white p-3 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                  Finish 🎉
                </button>
              </div>
            </div>
          )}

          {/* FOOTNOTE */}
          <p className="text-xs text-gray-400 text-center">
            Step {step} of 4 — Quick setup takes less than 1 minute
          </p>
        </div>
      </div>
    </div>
  );
}
