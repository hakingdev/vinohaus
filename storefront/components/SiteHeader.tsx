"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/#events", label: "Events" },
  { href: "/#news", label: "Blog" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-40 bg-cream">
      <div className="mx-auto flex w-full max-w-[1806px] items-center justify-between px-5 py-5 lg:px-[6%] lg:py-8">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src="/landing/logo.svg"
            alt="Vin Rouge"
            width={424}
            height={108}
            priority
            className="h-10 w-auto lg:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-10 font-display text-xl text-bark xl:flex">
          {nav.map((item) => (
            <Link key={item.label} href={item.href} className="transition-colors hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/account/login"
            aria-label="Konto"
            className="hidden size-12 items-center justify-center border-[1.5px] border-bark transition-colors hover:border-gold lg:flex"
          >
            <Image src="/landing/icon-user.svg" alt="" width={22} height={22} />
          </Link>
          <Link
            href="/cart"
            aria-label="Warenkorb"
            className="flex size-11 items-center justify-center border-[1.5px] border-bark transition-colors hover:border-gold lg:size-12"
          >
            <Image src="/landing/icon-cart.svg" alt="" width={26} height={26} />
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex size-11 items-center justify-center border-[1.5px] border-bark transition-colors hover:border-gold lg:size-12 xl:hidden"
          >
            {menuOpen ? (
              <span className="font-body text-2xl leading-none text-bark">×</span>
            ) : (
              <Image src="/landing/icon-burger.svg" alt="" width={22} height={22} />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="absolute inset-x-0 top-full z-50 border-y border-gold/30 bg-cream px-6 py-8 shadow-lg xl:hidden">
          <ul className="space-y-6">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-2xl text-bark transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
