"use client";

import Link from "next/link";
import { Bell, Users, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Person1 from "../public/Person1.png";
import Person2 from "../public/Person2.png";
import Person3 from "../public/Person3.png";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Smart Rent Reminder System
          </h1>

          <p className="mt-6 text-lg text-indigo-100 max-w-2xl mx-auto">
            Automate rent tracking, notify tenants on time, and help landlords
            manage properties without stress or manual follow-ups.
          </p>

          <div className="mt-8 flex gap-4 justify-center">
            <Link
              href="/auth/login"
              className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="px-6 py-3 bg-indigo-500 border border-white/30 rounded-xl hover:bg-indigo-400 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Rent Reminder?
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <Bell className="text-indigo-600 mb-3" />
            <h3 className="font-semibold text-lg">Automated Reminders</h3>
            <p className="text-gray-600 text-sm mt-2">
              Send rent reminders automatically every month to tenants without
              manual effort.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <Users className="text-indigo-600 mb-3" />
            <h3 className="font-semibold text-lg">Tenant Management</h3>
            <p className="text-gray-600 text-sm mt-2">
              Manage tenants, approvals, and rent history in one clean
              dashboard.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <ShieldCheck className="text-indigo-600 mb-3" />
            <h3 className="font-semibold text-lg">Secure System</h3>
            <p className="text-gray-600 text-sm mt-2">
              Role-based access for Admin, Landlord, and Tenants with JWT
              security.
            </p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-indigo-600">1</span>
              </div>
              <h3 className="mt-4 font-semibold">Register Account</h3>
              <p className="text-gray-600 text-sm mt-2">
                Users register as tenants or landlords. Admin verifies
                landlords.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-indigo-600">2</span>
              </div>
              <h3 className="mt-4 font-semibold">Admin Approval</h3>
              <p className="text-gray-600 text-sm mt-2">
                Admin approves landlord requests from dashboard.
              </p>
            </div>

            <div>
              <div className="w-12 h-12 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="font-bold text-indigo-600">3</span>
              </div>
              <h3 className="mt-4 font-semibold">Automated System</h3>
              <p className="text-gray-600 text-sm mt-2">
                Rent reminders are sent automatically every month.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODERN PROPERTY MANAGEMENT */}
      <div className="bg-white py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">
            Modern Property Management
          </h2>

          <p className="text-center text-gray-500 max-w-2xl mx-auto mb-12">
            Manage rental properties, tenants, and payments efficiently with a
            smart automated system designed for modern landlords.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* CARD 1 */}
            <div className="relative rounded-2xl overflow-hidden shadow group">
              <Image
                src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
                alt="house"
                width={400}
                height={300}
                className="object-cover w-full h-[250px]"
              />

              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 text-white">
                <h3 className="font-semibold text-lg">Independent Houses</h3>
                <p className="text-sm text-gray-200">
                  Track rent, tenants, and maintenance for individual rental
                  houses with ease.
                </p>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="relative rounded-2xl overflow-hidden shadow group">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
                alt="apartment"
                width={400}
                height={300}
                className="object-cover w-full h-[250px]"
              />

              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 text-white">
                <h3 className="font-semibold text-lg">Apartments & Flats</h3>
                <p className="text-sm text-gray-200">
                  Manage multiple tenants per building with automated monthly
                  rent reminders.
                </p>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="relative rounded-2xl overflow-hidden shadow group">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
                alt="modern home"
                width={400}
                height={300}
                className="object-cover w-full h-[250px]"
              />

              <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-4 text-white">
                <h3 className="font-semibold text-lg">Premium Properties</h3>
                <p className="text-sm text-gray-200">
                  Get insights on high-value properties with payment history and
                  analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Landlords Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <Image
                src={Person1.src}
                alt="modern home"
                width={400}
                height={300}
                className="rounded-2xl object-cover shadow"
              />
              <div className="flex flex-col pt-2 gap-2">
                <p className="text-gray-600 text-sm">
                  “This system reduced my manual follow-ups by 90%. I no longer
                  chase tenants for rent. It has completely changed how I manage
                  my properties and improved efficiency.”
                </p>
                <div className="font-semibold">— Rajesh Sharma</div>
                <div className="text-xs text-gray-500">Landlord</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <Image
                src={Person2.src}
                alt="modern home"
                width={400}
                height={300}
                className="rounded-2xl object-cover shadow"
              />
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-gray-600 text-sm">
                  “Very simple dashboard. Approval system makes tenant
                  management easy.”
                </p>
                <div className="font-semibold">— Anjali Verma</div>
                <div className="text-xs text-gray-500">Landlord</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow">
              <Image
                src={Person3.src}
                alt="modern home"
                width={400}
                height={300}
                className="rounded-2xl object-fit shadow"
              />
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-gray-600 text-sm">
                  “Reminders are always on time. I never forget rent due dates
                  anymore.”
                </p>
                <div className="font-semibold">— Amit Kumar</div>
                <div className="text-xs text-gray-500">Landlord</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold">
          Start Managing Rent Smarter Today
        </h2>
        <p className="text-indigo-100 mt-3">
          Join landlords and tenants using automated rent reminders.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/auth/register"
            className="px-6 py-3 bg-white text-indigo-700 font-semibold rounded-xl"
          >
            Get Started
          </Link>

          <Link
            href="/auth/login"
            className="px-6 py-3 border border-white/40 rounded-xl"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
