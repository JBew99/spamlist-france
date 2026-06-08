"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutList, PlusCircle, ShieldCheck, Home, MessageSquare } from "lucide-react";

const navItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "La Liste", href: "/list", icon: LayoutList },
  { name: "Submit", href: "/submit", icon: PlusCircle },
  { name: "Admin", href: "/admin", icon: ShieldCheck },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-headline text-2xl font-bold tracking-tighter text-primary neon-text">
              SPAMLIST<span className="text-secondary">FR</span>
            </span>
          </Link>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href ? "text-primary font-bold" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
          <a
            href="https://discord.gg/geometrydash"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-indigo-400 transition-colors"
          >
            <MessageSquare className="h-4 w-4" />
            Discord
          </a>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          {/* Simple Mobile View for MVP */}
          <Link href="/list" className="text-primary"><LayoutList className="h-6 w-6" /></Link>
          <Link href="/submit" className="text-secondary"><PlusCircle className="h-6 w-6" /></Link>
        </div>
      </div>
    </nav>
  );
}