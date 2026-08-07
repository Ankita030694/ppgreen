"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/adminlogin");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/adminlogin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 mr-4">
                <Link href="/admin" className="flex items-center">
                  <Image
                    src="/PP-Green Logo.svg"
                    alt="PP Green City Logo"
                    width={160}
                    height={30}
                    className="h-6 sm:h-7 w-auto object-contain invert"
                    priority
                  />
                </Link>
                <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                <span className="hidden sm:block font-bold text-lg sm:text-xl text-gray-900 tracking-tight">
                  Admin Panel
                </span>
              </div>
              
              <div className="hidden sm:flex space-x-1">
                <a href="/admin/leads" className="text-gray-600 hover:text-green-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Leads
                </a>
                <a href="/admin/blogs" className="text-gray-600 hover:text-green-600 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  Blogs
                </a>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="h-full"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
