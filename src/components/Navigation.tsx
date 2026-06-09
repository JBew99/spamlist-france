"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutList, PlusCircle, ShieldCheck, Home, Trophy, Users, Package, History, Swords } from "lucide-react";

const navItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "La Liste", href: "/list", icon: LayoutList },
  { name: "Classement", href: "/classement", icon: Trophy },
  { name: "Clans", href: "/clans", icon: Users },
  { name: "Packs", href: "/packs", icon: Package },
  { name: "Soumettre", href: "/soumettre", icon: PlusCircle },
  { name: "Changelog", href: "/changelog", icon: History },
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
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all hover:text-primary whitespace-nowrap",
                pathname === item.href ? "text-primary border-b-2 border-primary pb-1" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-3 w-3" />
              {item.name}
            </Link>
          ))}
        </div>
        <div className="lg:hidden flex items-center space-x-6">
          <Link href="/list" className="text-primary"><LayoutList className="h-6 w-6" /></Link>
          <Link href="/soumettre" className="text-secondary"><PlusCircle className="h-6 w-6" /></Link>
        </div>
      </div>
    </nav>
  );
}