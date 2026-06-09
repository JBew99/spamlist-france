"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutList, PlusCircle, ShieldCheck, Home, Trophy, Swords } from "lucide-react";

const navItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "La Liste", href: "/list", icon: LayoutList },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Submit", href: "/submit", icon: PlusCircle },
  { name: "Admin", href: "/admin", icon: ShieldCheck },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-primary rounded-lg group-hover:scale-110 transition-transform">
              <Swords className="h-6 w-6 text-black" />
            </div>
            <span className="font-headline text-2xl font-black tracking-tighter gold-text">
              SPAMLIST<span className="silver-text">FR</span>
            </span>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all hover:text-primary",
                pathname === item.href ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden flex items-center space-x-6">
          <Link href="/list" className="text-primary"><LayoutList className="h-6 w-6" /></Link>
          <Link href="/submit" className="text-secondary"><PlusCircle className="h-6 w-6" /></Link>
        </div>
      </div>
    </nav>
  );
}