import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Trophy, Zap, Users, Star } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-black/40" />
          {heroImg && (
            <div className="absolute inset-0 -z-20">
              <Image
                src={heroImg.imageUrl}
                alt="Hero Background"
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
          )}
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Dominez la <span className="text-primary neon-text">Spam List</span> France
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl font-light">
                  La plateforme ultime pour les défis de spam Geometry Dash. Relevez le défi, soumettez vos records, et grimpez dans le classement.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/list">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 h-12 text-lg rounded-full animate-pulse-neon">
                    Voir la Liste <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/submit">
                  <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 h-12 text-lg rounded-full">
                    Soumettre un Niveau
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="bg-card border-primary/20 hover:border-primary/50 transition-all">
                <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <Trophy className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Compétition d'Élite</h3>
                  <p className="text-muted-foreground">Les niveaux les plus difficiles triés sur le volet par la communauté française.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-secondary/20 hover:border-secondary/50 transition-all">
                <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-secondary/10 text-secondary">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Feedback Immédiat</h3>
                  <p className="text-muted-foreground">Notez vos niveaux préférés et voyez l'avis de l'IA sur les commentaires récents.</p>
                </CardContent>
              </Card>
              <Card className="bg-card border-indigo-500/20 hover:border-indigo-500/50 transition-all">
                <CardContent className="pt-8 pb-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-indigo-500/10 text-indigo-500">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold">Communauté Active</h3>
                  <p className="text-muted-foreground">Rejoignez notre Discord pour discuter des stratégies et des futurs ajouts.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials or Preview section */}
        <section className="w-full py-12 md:py-24 border-t border-border/10 bg-black/20">
          <div className="container px-4 md:px-6 mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Niveaux Vedettes</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl bg-card border border-border p-2 transition-transform hover:-translate-y-1">
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
                    <Image 
                      src={`https://picsum.photos/seed/gd-${i}/400/225`} 
                      alt={`Level ${i}`} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold">92.4</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-sm text-left px-2">Spam Challenge #{i}</h4>
                  <p className="text-xs text-muted-foreground text-left px-2 mb-2">par GD_Master</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full border-t py-6 px-4 md:px-6 bg-background">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 SpamList France. Fait par la communauté.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground hover:underline underline-offset-4">Mentions</Link>
            <Link href="https://discord.gg/geometrydash" className="text-sm text-muted-foreground hover:underline underline-offset-4">Discord</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}