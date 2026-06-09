import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Zap, Users, ShieldCheck, Search, Activity, ArrowRight, Star, CheckCircle2, Swords } from "lucide-react";
import { MOCK_ACTIVITIES } from "@/app/lib/mock-data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section - Identité & Action Immédiate */}
        <section className="relative w-full py-24 md:py-48 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-black" />
          <div className="absolute inset-0 -z-20 opacity-20">
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
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-black uppercase tracking-widest">
                  La Référence Française du Spam
                </div>
                <h1 className="text-6xl md:text-9xl font-black gold-text uppercase leading-none tracking-tighter">
                  L'ÉLITE DU <br/><span className="silver-text">SPAM</span>
                </h1>
                <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl font-light leading-relaxed">
                  Le classement ultime des défis les plus brutaux de France. <br className="hidden md:block"/>
                  Prouvez votre valeur, grimpez les rangs, entrez dans la légende.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
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

        {/* Real-time Activity - Social Loop & Crédibilité */}
        <section className="w-full py-12 border-y border-white/5 bg-black/40">
          <div className="container px-6 mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-black silver-text uppercase tracking-widest">Activité Temps Réel</h2>
              </div>
              <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <span>124 Niveaux</span>
                <span>1.2k Records</span>
                <span>45k Points</span>
              </div>
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

        {/* Identity, Trust & Social */}
        <section className="w-full py-24">
          <div className="container px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-3">
              <Card className="bg-card/50 border-primary/20 hover:gold-border transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Trophy className="h-32 w-32" />
                </div>
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary gold-border"><Trophy className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold gold-text">Compétition d'Élite</h3>
                  <p className="text-muted-foreground leading-relaxed">Nous ne listons que les défis qui poussent les limites humaines. Chaque niveau est scruté par nos experts.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-secondary/20 hover:border-secondary transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck className="h-32 w-32" />
                </div>
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20"><ShieldCheck className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold silver-text">Vérification Rigoureuse</h3>
                  <p className="text-muted-foreground leading-relaxed">Un système de records blindé. Vos preuves vidéos sont analysées frame par frame pour garantir l'équité.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-white/5 hover:border-white/20 transition-all group overflow-hidden relative">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                  <Users className="h-32 w-32" />
                </div>
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 text-white border border-white/10"><Users className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold">Communauté Royale</h3>
                  <p className="text-muted-foreground leading-relaxed">Rejoignez les meilleurs joueurs de France sur notre Discord dédié à l'excellence du spam.</p>
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
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Mentions</Link>
            <Link href="https://discord.gg/geometrydash" className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Discord Officiel</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}