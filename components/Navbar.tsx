"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navbar() {
  // Keep this in sync with `basePath` in next.config.ts for this Tomcat build.
  const basePath = "/bo-delivery-test";
  const [browserPathname, setBrowserPathname] = useState<string | null>(null);

  // A static host such as Tomcat cannot serve Next's client-side route payloads.
  // Read the browser URL after hydration so the selected tab is correct for every
  // exported page, then use ordinary page navigations below.
  useEffect(() => {
    setBrowserPathname(window.location.pathname.replace(/\/+$/, "") || "/");
  }, []);

  const navItems = [
    { path: "/", label: "Client Stack", num: "1" },
    { path: "/file-drop-hoops", label: "File Drop Hoops", num: "2" },
    { path: "/artefact-matrix", label: "Artefact Matrix", num: "3" },
    { path: "/receipt-generator", label: "Receipt Generator", num: "4" }
  ];

  const isActivePath = (path: string) => {
    if (!browserPathname) return false;

    if (path === "/") {
      return !navItems.some(
        (item) => item.path !== "/" && browserPathname.endsWith(item.path),
      );
    }

    return browserPathname.endsWith(path);
  };

  const navigateAsDocument = (
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    event.preventDefault();
    window.location.assign(event.currentTarget.href);
  };

  const hrefFor = (path: string) =>
    path === "/" ? `${basePath}/` : `${basePath}${path}/`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-bright/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-lg flex-shrink-0">
          <a
            className="flex items-center gap-2.5"
            href={hrefFor("/")}
            onClick={navigateAsDocument}
          >
            <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center shadow-[0_4px_12px_-2px_rgba(255,92,56,0.35)]">
              <span className="text-on-primary font-headline-md text-headline-md leading-none">N</span>
            </div>
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface uppercase">NEXUS</span>
          </a>
        </div>
        <div className="hidden xl:flex items-center gap-space-md flex-1 justify-center">
          <nav className="flex items-center p-1 bg-surface-container-low rounded-full relative">
            {navItems.map((item) => {
              const isActive = isActivePath(item.path);
              return (
                <a
                  key={item.path}
                  href={hrefFor(item.path)}
                  onClick={navigateAsDocument}
                  className={`relative flex items-center gap-2 px-4 py-1.5 rounded-full font-label-md transition-colors z-10 ${
                    isActive ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-primary-container rounded-full z-0"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-space-md flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <span className="text-on-primary font-label-md text-label-md leading-none">I</span>
          </div>
        </div>
      </div>
    </header>
  );
}
