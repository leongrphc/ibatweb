"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useAnnouncements } from "@/context/AnnouncementContext";

const navigation = [
  { href: "/shop", label: "Koleksiyon" },
  { href: "/shop?category=BEBE", label: "Bebe", sizes: "22–25" },
  { href: "/shop?category=PAT%C4%B0K", label: "Patik", sizes: "26–30" },
  { href: "/shop?category=F%C4%B0LET", label: "Filet", sizes: "31–35" },
  { href: "/shop?filter=new", label: "Yeni gelenler" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { getActiveAnnouncements } = useAnnouncements();
  const announcements = getActiveAnnouncements();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (searchOpen) {
        setSearchOpen(false);
        searchButton.current?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen, searchOpen]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        İçeriğe geç
      </a>
      {announcements.length > 0 && (
        <div className="store-announcement">
          <div className="container-custom">
            <p>{announcements[0].text}</p>
            <span>Minik adımlara, büyük özen.</span>
          </div>
        </div>
      )}
      <div className="container-custom header-main">
        <Link
          href="/"
          className="brand-lockup"
          aria-label="İbat Ayakkabı ana sayfa"
        >
          <span>
            İBAT<span className="logo-dot">.</span>
          </span>
          <small>küçük adımlar, büyük keşifler</small>
        </Link>
        <nav className="desktop-navigation" aria-label="Ana menü">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/shop?filter=sale" className="sale-link">
            İndirim
          </Link>
        </nav>
        <div className="header-tools">
          <button
            ref={searchButton}
            type="button"
            className="header-search-toggle"
            aria-label={searchOpen ? "Aramayı kapat" : "Ürün ara"}
            aria-expanded={searchOpen}
            aria-controls="store-search"
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMenuOpen(false);
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
            <span>Ara</span>
          </button>
          <button
            ref={menuButton}
            type="button"
            className="mobile-menu-toggle"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setSearchOpen(false);
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                d={
                  menuOpen ? "M6 6l12 12M6 18 18 6" : "M4 7h16M4 12h16M4 17h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>
      {searchOpen && (
        <div id="store-search" className="header-search-panel">
          <form
            action="/shop"
            method="get"
            role="search"
            className="container-custom"
          >
            <label htmlFor="catalog-search">Koleksiyonda ara</label>
            <div>
              <input
                autoFocus
                id="catalog-search"
                name="q"
                type="search"
                required
                placeholder="Ürün adı, marka veya renk…"
                className="input"
              />
              <button type="submit" className="btn-primary">
                Ara <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </div>
      )}
      {menuOpen && (
        <nav
          id="mobile-navigation"
          className="mobile-navigation container-custom"
          aria-label="Mobil menü"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
              {item.sizes && <small>{item.sizes} numara</small>}
            </Link>
          ))}
          <Link
            href="/shop?filter=sale"
            className="sale-link"
            onClick={() => setMenuOpen(false)}
          >
            İndirimli ürünler
          </Link>
        </nav>
      )}
    </header>
  );
}
