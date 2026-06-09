import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Trophy, Zap, Users, Star, ShieldCheck, Swords } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
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
              data-ai-hint="neon gaming"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background" />
          
          <div className="container px-6 mx-auto relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 animate-in fade-in slide-in-from-top-10 duration-1000">
                <Badge className="bg-primary/20 text-primary border-primary/30 px-6 py-2 rounded-full uppercase tracking-widest font-black text-xs">
                  La Référence Française du Spam
                </Badge>
                <h1 className="text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl gold-text">
                  L'ÉLITE DU <br/><span className="silver-text">PRECISION SPAM</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-muted-foreground md:text-2xl font-light leading-relaxed">
                  Le classement ultime des défis les plus brutaux de France. <br className="hidden md:block"/>
                  Prouvez votre valeur, entrez dans la légende.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                <Link href="/list">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-black px-12 h-16 text-xl font-black rounded-2xl shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                    Entrer dans l'Arène <ArrowRight className="ml-2 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/submit">
                  <Button size="lg" variant="outline" className="gold-border text-primary hover:bg-primary/10 px-12 h-16 text-xl font-bold rounded-2xl backdrop-blur-md">
                    Déposer une Preuve
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-20 bg-background/50 border-y border-white/5">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              <div><p className="text-5xl font-black gold-text mb-2">124</p><p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Niveaux Classés</p></div>
              <div><p className="text-5xl font-black silver-text mb-2">1.2k</p><p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Records Validés</p></div>
              <div><p className="text-5xl font-black gold-text mb-2">45k</p><p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Points Distribués</p></div>
              <div><p className="text-5xl font-black silver-text mb-2">100%</p><p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Vérifié par l'Elite</p></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-24">
          <div className="container px-6 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              <Card className="bg-card/50 border-primary/20 hover:gold-border transition-all group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity"><Swords className="h-32 w-32" /></div>
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary gold-border"><Trophy className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold gold-text">Compétition d'Élite</h3>
                  <p className="text-muted-foreground leading-relaxed">Nous ne listons que les défis qui poussent les limites humaines. Chaque niveau est scruté par nos experts.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-secondary/20 hover:border-secondary transition-all group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity"><Zap className="h-32 w-32" /></div>
                <CardContent className="pt-10 pb-10 flex flex-col items-start space-y-4">
                  <div className="p-4 rounded-2xl bg-secondary/10 text-secondary border border-secondary/20"><ShieldCheck className="h-8 w-8" /></div>
                  <h3 className="text-2xl font-bold silver-text">Vérification Rigoureuse</h3>
                  <p className="text-muted-foreground leading-relaxed">Un système de records blindé. Vos preuves vidéos sont analysées frame par frame pour garantir l'équité.</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-white/5 hover:border-white/20 transition-all group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity"><Users className="h-32 w-32" /></div>
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

function Badge({ className, children }: { className?: string, children: React.ReactNode }) {
  return <div className={cn("inline-flex items-center px-2.5 py-0.5 text-xs font-semibold transition-colors", className)}>{children}</div>
}
