import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Zap, Users, ShieldCheck, Search, Activity, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { MOCK_ACTIVITIES } from "@/app/lib/mock-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section - Core Loop Entry */}
        <section className="relative w-full py-24 md:py-48 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-black" />
          <div className="absolute inset-0 -z-20 opacity-20">
            <Image
              src="https://picsum.photos/seed/elite-gd/1920/1080"
              alt="Elite Background"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
          
          <div className="container px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest animate-pulse">
                  Plateforme Compétitive Officielle
                </div>
                <h1 className="text-6xl md:text-9xl font-black gold-text uppercase leading-none tracking-tighter">
                  L'ÉLITE DU <br/><span className="silver-text">SPAM</span>
                </h1>
                <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl font-light">
                  L'unique référence pour les défis les plus brutaux de France. <br className="hidden md:block"/>
                  Prouvez votre valeur, grimpez les rangs, dominez la liste.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Link href="/list">
                  <Button size="lg" className="h-16 px-12 text-xl font-black bg-primary text-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-all group">
                    Voir la Liste <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
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

        {/* Real-time Activity - Social Loop */}
        <section className="w-full py-12 border-y border-white/5 bg-black/40">
          <div className="container px-6 mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <Activity className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-black silver-text uppercase tracking-widest">Activité Récente</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_ACTIVITIES.map((act) => (
                <div key={act.id} className="p-4 bg-card/30 border border-white/5 rounded-xl flex items-center gap-4 group hover:border-primary/30 transition-colors">
                  <div className="p-2 bg-primary/10 text-primary rounded-lg group-hover:scale-110 transition-transform">
                    {act.type === 'completion' ? <CheckCircle2 className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold silver-text">{act.title}</p>
                    <p className="text-xs text-muted-foreground">{act.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Identity & Trust */}
        <section className="w-full py-24">
          <div className="container px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-3">
              <Card className="bg-card/50 border-primary/20 hover:gold-border transition-all group overflow-hidden">
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary gold-border"><Trophy className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold gold-text">Prestige & Rangs</h3>
                  <p className="text-muted-foreground leading-relaxed">Passez de Bronze à Élite. Chaque record validé augmente votre Trust Score et votre prestige national.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-secondary/20 hover:border-secondary transition-all group overflow-hidden">
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20"><ShieldCheck className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold silver-text">Validation Sans Faille</h3>
                  <p className="text-muted-foreground leading-relaxed">Notre équipe de modérateurs experts analyse chaque milliseconde pour garantir l'authenticité des records.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-white/5 hover:border-white/20 transition-all group overflow-hidden">
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 text-white border border-white/10"><Users className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold">Esprit de Clan</h3>
                  <p className="text-muted-foreground leading-relaxed">Regroupez les meilleurs joueurs sous une seule bannière et dominez le classement mondial par équipe.</p>
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
            <span className="text-xs text-muted-foreground">| Le Standard Compétitif Français</span>
          </div>
          <div className="flex gap-8">
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Mentions</Link>
            <Link href="https://discord.gg/geometrydash" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}