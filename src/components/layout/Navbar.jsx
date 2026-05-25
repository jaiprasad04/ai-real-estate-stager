"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaCoins, FaUser, FaHome, FaSignOutAlt, FaGoogle, FaImages } from "react-icons/fa";
import clsx from "clsx";

const navLinks = [
  { name: "Room Stager", href: "/" },
  { name: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const links = [...navLinks];
  if (session?.user) {
    links.splice(1, 0, { name: "My Gallery", href: "/dashboard" });
  }

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-white border-b border-slate-100 shadow-sm flex-shrink-0">
      {/* Brand logo */}
      <div className="flex items-center gap-6 sm:gap-8 min-w-0">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-tight text-slate-900 flex-shrink-0">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <FaHome className="text-sm" />
          </div>
          <span className="text-sm sm:text-base leading-none">
            Estate<span className="text-indigo-600">Stager</span>
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden sm:flex items-center gap-5">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-xs sm:text-sm font-semibold transition-colors py-0.5",
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-slate-500 hover:text-slate-800"
                )}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right toolbar items */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 flex-shrink-0">
        {session?.user ? (
          <>
            {/* Credits badge */}
            <span className="flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full shadow-inner">
              <FaCoins className="text-amber-500 text-xs animate-pulse" />
              <span>{session.user.credits ?? 0} Credits</span>
            </span>

            {/* User Profile info */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center flex-shrink-0">
                {session.user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={session.user.image} alt={session.user.name} className="h-full w-full object-cover" />
                ) : (
                  <FaUser className="text-xs text-slate-400" />
                )}
              </div>
              <span className="hidden lg:inline text-xs font-bold text-slate-700 max-w-[80px] truncate">
                {session.user.name?.split(" ")[0]}
              </span>
            </div>

            {/* Log out */}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-red-500 hover:bg-red-50/50 transition-all cursor-pointer"
              title="Sign out"
            >
              <FaSignOutAlt className="text-xs" />
              <span className="hidden md:inline">Sign out</span>
            </button>
          </>
        ) : (
          /* Sign in with Google */
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-md shadow-indigo-100 hover:shadow-lg transition-all cursor-pointer"
          >
            <FaGoogle className="text-[10px]" />
            <span>Sign in</span>
          </button>
        )}
      </div>
    </nav>
  );
}
