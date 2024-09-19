"use client";

import { usePathname } from "next/navigation";
import NavbarComponent from "./NavbarComponent";
import Footer from "./Footer";

export default function BarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/" && <NavbarComponent />}
      {children}
      {pathname !== "/" && <Footer />}
    </>
  );
}
