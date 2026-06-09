
"use client";

import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Zap, Users, ShieldCheck, Activity, ArrowRight, CheckCircle2, Swords, TrendingUp } from "lucide-react";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, limit, where } from "firebase/firestore";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const firestore = useFirestore();

  const activityQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "records"),
      where("status", "==", "approved"),
      orderBy("timestamp", "desc"),
      limit(3)
    );
  }, [firestore]);

  const { data: activities } = useCollection(activityQuery);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-48 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-black" />
          <div className="absolute inset-0 -z-20 opacity-30">
            <Image
              src="https://picsum.photos/seed/prestige-gd/1920/1080"
              alt="Elite Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
          
          <div className="container px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4 animate-in fade-in slide-in-from-top-10 duration-1000">
                <Badge className="bg-primary/20 text-primary border-primary/30 px-6 py-2 rounded-full uppercase tracking-widest font-black text-xs">
                  La Référence Française du Spam
                </Badge>
                <h1 className="text-6xl md:text-9xl font-black gold-text uppercase leading-none tracking-tighter">
                  L'ÉLITE DU <br/><span className="silver-text">SPAM</span>
                </h1>
                <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl font-light leading-relaxed">
                  Le classement ultime des défis les plus brutaux de France. <br className="hidden md:block"/>
                  Prouvez votre valeur, forgez votre prestige, entrez dans la légende.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                <Link href="/list">
                  <Button size="lg" className="h-16 px-12 text-xl font-black bg-primary text-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all animate-shine">
                    Voir la Liste <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/soumettre">
                  <Button size="lg" variant="outline" className="h-16 px-12 text-xl font-bold gold-border text-primary hover:bg-primary/10 rounded-2xl backdrop-blur-md">
                    Déposer une Preuve
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Real-time Activity */}
        <section className="w-full py-12 border-y border-white/5 bg-black/40">
          <div className="container px-6 mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-black silver-text uppercase tracking-widest">Flux d'Activité Live</h2>
              </div>
              <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-2" /> Système Pulse Connecté
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {activities && activities.length > 0 ? activities.map((act: any) => (
                <div key={act.id} className="p-4 bg-card/30 border border-white/5 rounded-xl flex items-center gap-4 group hover:border-primary/30 transition-colors">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold silver-text">{act.playerName} a vaincu</p>
                    <p className="text-xs text-muted-foreground font-black uppercase text-primary">{act.levelName}</p>
                  </div>
                </div>
              )) : (
                <div className="col-span-3 text-center py-10 text-muted-foreground italic text-sm">Chargement du fil de prestige...</div>
              )}
            </div>
          </div>
        </section>

        {/* Identity & Social */}
        <section className="w-full py-24">
          <div className="container px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-3">
              <Card className="bg-card/50 border-primary/20 hover:gold-border transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Trophy className="h-32 w-32" />
                </div>
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary gold-border"><Trophy className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold gold-text uppercase">Prestige & Rangs</h3>
                  <p className="text-muted-foreground leading-relaxed">Grimpez du rang Bronze à l'Élite. Chaque validation augmente votre Trust Score et votre autorité.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-secondary/20 hover:border-secondary transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck className="h-32 w-32" />
                </div>
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20"><ShieldCheck className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold silver-text uppercase">Confiance Blindée</h3>
                  <p className="text-muted-foreground leading-relaxed">Un système Trust Score qui récompense la régularité. Vos preuves sont analysées par l'Élite.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-white/5 hover:border-white/20 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Users className="h-32 w-32" />
                </div>
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 text-white border border-white/10"><Users className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">Alliance de Clans</h3>
                  <p className="text-muted-foreground leading-relaxed">Formez votre clan, recrutez les meilleurs spammeurs et dominez le classement des alliances.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-white/5 py-12 px-6 bg-black/50">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-4">
            <span className="text-xl font-black gold-text">SPAMLIST FR</span>
            <span className="text-xs text-muted-foreground">| L'Élite de Geometry Dash France</span>
          </div>
          <div className="flex gap-8">
            <Link href="/changelog" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Mises à jour</Link>
            <Link href="https://discord.gg/geometrydash" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
