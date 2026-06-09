
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutList, PlusCircle, Home, Trophy, Users, Package, LogIn, User, LogOut, Swords } from "lucide-react";
import { useUser, useAuth } from "@/firebase";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "La Liste", href: "/list", icon: LayoutList },
  { name: "Classement", href: "/classement", icon: Trophy },
  { name: "Clans", href: "/clans", icon: Users },
  { name: "Packs", href: "/packs", icon: Package },
  { name: "Soumettre", href: "/soumettre", icon: PlusCircle },
];

export function Navigation() {
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    toast({ title: "Déconnexion", description: "Vous avez été déconnecté avec succès." });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/80 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2 group active:scale-95 transition-transform">
            <div className="p-2 bg-primary rounded-lg group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(250,204,21,0.3)]">
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
                "relative flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all hover:text-primary whitespace-nowrap px-1 py-2 group",
                pathname === item.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-3 w-3 group-hover:scale-110 transition-transform" />
              {item.name}
              {pathname === item.href && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary animate-in fade-in slide-in-from-left-2 duration-300" />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <Link href={`/profil/${user.uid}`}>
                <Button variant="ghost" className="gap-2 silver-text hover:gold-text font-black uppercase text-[10px] tracking-widest">
                  <User className="h-4 w-4" /> Profil
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="outline" size="icon" className="gold-border border-destructive/30 text-destructive hover:bg-destructive/10">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link href="/connexion">
              <Button className="bg-primary text-black font-black uppercase text-[10px] tracking-widest px-6 h-10 rounded-xl">
                <LogIn className="h-4 w-4 mr-2" /> Connexion
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
