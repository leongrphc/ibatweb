"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAnnouncements } from "@/context/AnnouncementContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getActiveAnnouncements } = useAnnouncements();

  const activeAnnouncements = getActiveAnnouncements();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar */}
      {activeAnnouncements.length > 0 && (
        <div className="bg-primary text-white overflow-hidden">
          <div className="animate-marquee whitespace-nowrap py-2 text-sm font-medium">
            {/* Repeat announcements twice for seamless loop */}
            {[...activeAnnouncements, ...activeAnnouncements].map(
              (announcement, index) => (
                <span key={`${announcement.id}-${index}`}>
                  <span className="mx-8">{announcement.text}</span>
                  <span className="mx-8">*</span>
                </span>
              ),
            )}
          </div>
        </div>
      )}

      {/* Main Header */}
      <div
        className={`bg-white transition-all duration-300 ${isScrolled ? "shadow-card" : "border-b border-neutral-100"}`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Mobile Menu + Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 -ml-2 hover:bg-neutral-50 rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <span className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                  İBAT
                </span>
              </Link>
            </div>

            {/* Center: Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/shop"
                className="text-sm font-medium text-primary hover:text-neutral-600 transition-colors link-hover"
              >
                Tüm Ürünler
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-neutral-600 transition-colors">
                  Kategoriler
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute left-0 top-full pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-dropdown border border-neutral-100 p-2 min-w-[200px]">
                    <Link
                      href="/shop?category=BEBE"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent text-xs font-bold">
                        22-25
                      </span>
                      <div>
                        <div className="font-semibold text-sm">BEBE</div>
                        <div className="text-xs text-neutral-500">
                          İlk Adım Ayakkabıları
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/shop?category=PATİK"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs font-bold">
                        26-30
                      </span>
                      <div>
                        <div className="font-semibold text-sm">PATİK</div>
                        <div className="text-xs text-neutral-500">
                          Aktif Çocuklar İçin
                        </div>
                      </div>
                    </Link>
                    <Link
                      href="/shop?category=FİLET"
                      className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <span className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center text-success text-xs font-bold">
                        31-35
                      </span>
                      <div>
                        <div className="font-semibold text-sm">FİLET</div>
                        <div className="text-xs text-neutral-500">
                          Büyüyen Çocuklar
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <Link
                href="/shop?filter=new"
                className="text-sm font-medium text-primary hover:text-neutral-600 transition-colors link-hover flex items-center gap-1.5"
              >
                Yeni Gelenler
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow"></span>
              </Link>

              <Link
                href="/shop?filter=sale"
                className="text-sm font-medium text-error hover:text-error/80 transition-colors"
              >
                İndirimli Ürünler
              </Link>
            </nav>

            {/* Right: Search + Icons */}
            <div className="flex items-center gap-2">
              {/* Admin Panel */}
              <Link
                href="/admin"
                className="p-2.5 hover:bg-neutral-50 rounded-lg transition-colors hidden md:flex"
                aria-label="Admin Paneli"
                title="Admin Paneli"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </Link>

              {/* Search */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2.5 hover:bg-neutral-50 rounded-lg transition-colors"
                  aria-label="Ara"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* User / Account */}
              <Link
                href="#"
                className="p-2.5 hover:bg-neutral-50 rounded-lg transition-colors"
                aria-label="Hesabım"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </Link>

              {/* Favorites */}
              <button
                className="p-2.5 hover:bg-neutral-50 rounded-lg transition-colors hidden md:flex"
                aria-label="Favoriler"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>

              {/* Cart */}
              <button
                className="relative p-2.5 hover:bg-neutral-50 rounded-lg transition-colors"
                aria-label="Sepet"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="absolute inset-x-0 top-full bg-white border-b border-neutral-100 shadow-lg animate-fade-in">
            <div className="container-custom py-6">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Ürün, kategori veya marka ara..."
                  className="input-search pr-12"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-neutral-100 rounded transition-colors"
                >
                  <svg
                    className="w-5 h-5 text-neutral-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[104px] bg-white z-50 overflow-y-auto animate-fade-in">
          <nav className="container-custom py-6 space-y-1">
            <Link
              href="/shop"
              className="block py-3 text-lg font-medium border-b border-neutral-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Tüm Ürünler
            </Link>

            <div className="py-3 border-b border-neutral-100">
              <div className="text-lg font-medium mb-3">Kategoriler</div>
              <div className="space-y-2 pl-4">
                <Link
                  href="/shop?category=BEBE"
                  className="flex items-center gap-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center text-accent text-xs font-bold">
                    22-25
                  </span>
                  <span>BEBE</span>
                </Link>
                <Link
                  href="/shop?category=PATİK"
                  className="flex items-center gap-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs font-bold">
                    26-30
                  </span>
                  <span>PATİK</span>
                </Link>
                <Link
                  href="/shop?category=FİLET"
                  className="flex items-center gap-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center text-success text-xs font-bold">
                    31-35
                  </span>
                  <span>FİLET</span>
                </Link>
              </div>
            </div>

            <Link
              href="/shop?filter=new"
              className="flex items-center gap-2 py-3 text-lg font-medium border-b border-neutral-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Yeni Gelenler
              <span className="w-2 h-2 bg-accent rounded-full"></span>
            </Link>

            <Link
              href="/shop?filter=sale"
              className="block py-3 text-lg font-medium text-error border-b border-neutral-100"
              onClick={() => setIsMenuOpen(false)}
            >
              İndirimli Ürünler
            </Link>

            {/* Mobile Search */}
            <div className="pt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="input-search"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
