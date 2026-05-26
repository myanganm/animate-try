"use client";

import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

type NavItem = {
  label: string;
  href?: string;
  children?: Array<{ label: string; href: string }>;
};

const navItems = [
  {
    label: "Sections",
    children: [
      { label: "Hero", href: "#hero" },
      { label: "Section 2", href: "#section-two" },
      { label: "Section 3", href: "#section-three" },
      { label: "Section 4", href: "#section-four" },
    ],
  },
  { label: "Go Hero", href: "#hero" },
] satisfies NavItem[];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1024 });

  useEffect(() => {
    setIsOpen(false);
  }, [isDesktop]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <nav className="relative flex items-center justify-between rounded-2xl border border-white/20 bg-slate-900/70 px-4 py-3 backdrop-blur-md sm:px-6">
          <a href="#hero" className="text-sm font-bold uppercase tracking-[0.14em] text-white">
            My App
          </a>

          {isDesktop ? (
            <div className="relative">
              <button
                type="button"
                aria-label="Toggle desktop menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-100 transition hover:bg-white/10"
              >
                Menu
                <span
                  className={`inline-block h-2 w-2 border-b-2 border-r-2 border-current transition-transform duration-300 ${
                    isOpen ? "translate-y-0.5 rotate-[-135deg]" : "-translate-y-0.5 rotate-45"
                  }`}
                />
              </button>

              <div
                className={`absolute right-0 top-[calc(100%+10px)] w-60 origin-top-right rounded-xl border border-white/15 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-md transition-all duration-300 ${
                  isOpen
                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-2 scale-95 opacity-0"
                }`}
              >
                <ul className="flex flex-col gap-1">
                  {navItems.map((item) => (
                    <li key={item.href ?? item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-200 transition hover:bg-white/15 hover:text-white"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <div className="rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
                          {item.label}
                        </div>
                      )}

                      {item.children ? (
                        <ul className="ml-3 border-l border-white/15 pl-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <a
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className="block rounded-lg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-300 transition hover:bg-white/10 hover:text-white"
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className={`relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/30 text-white transition hover:bg-white/10 ${
              isDesktop ? "hidden" : ""
            }`}
          >
            <span
              className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${
                isOpen ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-current transition-transform duration-300 ${
                isOpen ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </nav>

        <div
          className={`overflow-hidden rounded-xl border border-white/15 bg-slate-900/85 backdrop-blur-md transition-all duration-300 ${
            isOpen
              ? "pointer-events-auto mt-2 max-h-56 translate-y-0 opacity-100"
              : "pointer-events-none mt-0 max-h-0 -translate-y-2 opacity-0"
          } ${isDesktop ? "hidden" : ""}`}
        >
          <ul className="flex flex-col gap-1 p-3">
            {navItems.map((item) => (
              <li key={item.href ?? item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-200 transition hover:bg-white/15 hover:text-white"
                  >
                    {item.label}
                  </a>
                ) : (
                  <div className="rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-300">
                    {item.label}
                  </div>
                )}

                {item.children ? (
                  <ul className="ml-3 border-l border-white/15 pl-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="block rounded-lg px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;