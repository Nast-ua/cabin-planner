"use client";
import useClickOutside from "@/utils/useClickOutside";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuButton from "./menu-button";
import NavList from "./nav-list";

const NavHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();
  const initialRoute = useRef<null | string>(null);

  useEffect(() => {
    if (!initialRoute.current) initialRoute.current = pathname;
    else if (initialRoute.current !== pathname) {
      setIsMenuOpen(false);
      initialRoute.current = pathname;
    }
  }, [pathname]);

  const handleClickOutside = useCallback(() => setIsMenuOpen(false), []);

  const navList = useClickOutside(handleClickOutside);

  return (
    <header
      ref={navList}
      className="border-b md:border-b-0 border-black/10 md:bg-slate-100/25 relative"
    >
      <nav className="px-4 h-[64px] z-50 flex flex-row justify-between md:justify-end items-center">
        <MenuButton
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
        />

        <span className="text-xl md:hidden">Cabin Planner</span>

        <div className="flex items-center justify-end h-full">
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <div
        className={`absolute top-[65px] z-40 border-b w-full bg-white border-black/5 md:hidden ${
          isMenuOpen ? "block" : "hidden"
        }`}
        id="mobile-menu"
      >
        <NavList />
      </div>
    </header>
  );
};

export default NavHeader;
