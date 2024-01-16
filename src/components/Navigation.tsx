"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./atoms/Button";
import { Menu, MenuContent, MenuTrigger } from "@/components/Menu";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [menuHover, setMenuHover] = useState<boolean>(false);

  const links = [
    {
      href: "/projects",
      name: "Projects",
    },
    {
      href: "/experience",
      name: "Experience",
    },
    {
      href: "/contact",
      name: "Contact",
    },
  ];

  return (
    <Menu>
      <nav className="fixed top-0 left-0 right-0 text-right z-50 p-4">
        <MenuTrigger asChild>
          <Button
            className="flex-col items-end h-10 opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Menu"
            tabIndex={0}
            onMouseEnter={() => setMenuHover(true)}
            onMouseLeave={() => setMenuHover(false)}
          >
            <span aria-hidden="true" className="w-6 mb-1 bg-white h-px" />
            <span
              aria-hidden="true"
              className={cn(
                "w-4 bg-white h-px transition-all duration-200",
                menuHover && "w-6"
              )}
            />
          </Button>
        </MenuTrigger>
        <MenuContent>
          <ul className="list-none h-full flex flex-col items-center justify-center">
            {links.map((link) => {
              return (
                <li key={JSON.stringify(link)} className="py-2">
                  <Button asChild className="text-xl">
                    <Link href={link.href}>{link.name}</Link>
                  </Button>
                </li>
              );
            })}
          </ul>
        </MenuContent>
      </nav>
    </Menu>
  );
};

export { Navigation };
