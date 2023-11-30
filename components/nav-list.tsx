"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  {
    name: "Availability",
    href: "/availability",
  },
  {
    name: "Book",
    href: "/book",
  },
  {
    name: "My Events",
    href: "/my-events",
  },
  {
    name: "Current Admins",
    href: "/admins",
  },
];

const NavList = () => {
  const pathname = usePathname();

  return (
    <ul className="space-y-1 px-2 pb-3 pt-2">
      {LINKS.map(({ name, href }) => (
        <li key={href} className="text-black/80 block text-base font-medium">
          <Link
            href={href}
            className={`flex ${
              pathname === href ? "bg-zinc-200/90" : "bg-white"
            } hover:bg-zinc-200/90 rounded-md pl-5 md:pl-3 pr-8 py-2 `}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavList;
