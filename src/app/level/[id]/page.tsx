"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { MOCK_LEVELS } from "@/app/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, MessageSquare, Sparkles, Youtube, Calendar, User, Zap } from "lucide-react";
import { summarizeLevelComments } from "@/ai/flows/level-comment-summarizer";
import Image from "next/image";

export default function LevelDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const level = MOCK_LEVELS.find(l => l.id === id);

  useEffect(() => {
    async function getSummary() {
      if (level && level.ratings.length > 0) {
        setIsLoadingAi(true);
        try {
          const result = await summarizeLevelComments({
            comments: level.ratings.map(r => r.comment)
          });
          setAiSummary(result.summary);
        } catch (error) { console.error(error); } finally { setIsLoadingAi(false); }
      }
    }
    getSummary();
  }, [level]);

  if (!level) return <div className="p-20 text-center font-bold text-2xl">Niveau introuvable dans les archives.</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="relative rounded-3xl overflow-hidden gold-border bg-card mb-12 shadow-2xl animate-in fade-in zoom-in duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-2/3 h-full -z-0">
            <Image src={`https://picsum.photos/seed/elite-${level.id}/1200/600`} alt={level.name} fill className="object-cover opacity-40" />
          </div>
          
          <div className="relative z-20 p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-3">
                <Badge className="bg-primary text-black font-black px-4 py-1 text-xs">#1 TOP FRANCE</Badge>
                <Badge variant="outline" className="silver-text gold-border px-4 py-1">ID: {level.levelId}</Badge>
              </div>
              <h1 className="text-5xl md:text-8xl font-black gold-text leading-none">{level.name}</h1>
              <p className="text-2xl text-muted-foreground flex items-center gap-2">Un chef-d'œuvre par <span className="text-foreground font-bold silver-text underline">{level.creator}</span></p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href={level.videoProof} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-primary hover:bg-primary/80 text-black font-black rounded-full px-10 h-14 text-lg">
                    <Youtube className="mr-2 h-6 w-6" /> Voir la Preuve
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-black/60 backdrop-blur-2xl rounded-3xl p-8 gold-border text-center min-w-[200px] shadow-2xl">
              <div className="text-6xl font-black gold-text mb-1">{level.difficulty}</div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-black">Points de Prestige</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <Card className="bg-card/40 backdrop-blur border-border overflow-hidden">
              <div className="h-1 w-full bg-primary" />
              <CardHeader><CardTitle className="flex items-center gap-3 silver-text"><Zap className="text-primary" /> Analyse Technique</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div><p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">List% requis</p><p className="text-3xl font-black">{level.completionPercent}%</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Note Communauté</p><p className="text-3xl font-black gold-text">{level.averageRating}%</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Victors</p><p className="text-3xl font-black silver-text">{level.records.length}</p></div>
                <div><p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Statut</p><Badge className="bg-green-500/20 text-green-500 border-green-500/30">ELITE</Badge></div>
              </CardContent>
            </Card>

            <Tabs defaultValue="victors" className="w-full">
              <TabsList className="bg-muted/50 gold-border p-1 h-14 mb-6">
                <TabsTrigger value="victors" className="text-lg gap-2 px-8"><Trophy className="h-5 w-5" /> Victors</TabsTrigger>
                <TabsTrigger value="comments" className="text-lg gap-2 px-8"><MessageSquare className="h-5 w-5" /> Commentaires</TabsTrigger>
              </TabsList>

              <TabsContent value="victors" className="space-y-4">
                {level.records.length > 0 ? level.records.map((rec, i) => (
                  <Card key={rec.id} className="bg-card/30 border-border hover:gold-border transition-all group">
                    <CardContent className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className="text-2xl font-black text-muted-foreground/30 group-hover:text-primary transition-colors">#{i+1}</div>
                        <div>
                          <p className="text-xl font-bold silver-text">{rec.playerName}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(rec.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <a href={rec.videoUrl} target="_blank" className="p-3 bg-muted rounded-full hover:bg-primary hover:text-black transition-colors">
                        <Youtube className="h-6 w-6" />
                      </a>
                    </CardContent>
                  </Card>
                )) : <p className="text-center py-20 text-muted-foreground italic">Aucun victor pour le moment. Serez-vous le premier ?</p>}
              </TabsContent>

              <TabsContent value="comments" className="space-y-6">
                <Card className="bg-primary/5 border-primary/20 gold-border">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4"><Sparkles className="h-5 w-5 text-primary" /><h4 className="font-bold gold-text uppercase">Synthèse IA des Avis</h4></div>
                    {isLoadingAi ? <div className="space-y-2"><div className="h-4 w-full bg-primary/10 animate-pulse rounded" /><div className="h-4 w-3/4 bg-primary/10 animate-pulse rounded" /></div>
                    : aiSummary ? <p className="text-sm italic leading-relaxed silver-text">{aiSummary}</p> : <p className="text-sm text-muted-foreground">Pas assez d'avis pour une synthèse.</p>}
                  </CardContent>
                </Card>
                {level.ratings.map(r => (
                  <Card key={r.id} className="bg-card/50 border-border"><CardContent className="p-4 flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary text-black flex items-center justify-center font-black">{r.rating}</div>
                    <div className="flex-1"><p className="italic text-muted-foreground">"{r.comment}"</p></div>
                  </CardContent></Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card className="gold-border bg-card/50 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              <CardHeader><CardTitle className="text-xl gold-text">Soumettre un Record</CardTitle></CardHeader>
              <CardContent className="space-y-6 relative z-10">
                <p className="text-sm text-muted-foreground">Vous avez vaincu ce niveau ? Envoyez votre preuve vidéo pour gagner vos points de prestige.</p>
                <div className="p-4 bg-muted/50 rounded-xl border border-border">
                  <div className="flex justify-between text-xs font-bold mb-2"><span>Points à gagner</span><span className="text-primary">+{level.difficulty} PTS</span></div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-full animate-shine" /></div>
                </div>
                <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-black font-black rounded-xl">J'ai réussi le défi</Button>
              </CardContent>
            </Card>

            <Card className="border-border bg-card/50">
              <CardHeader><CardTitle className="text-lg silver-text">Records du Monde</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Record actuel</span>
                  <span className="font-bold gold-text">Nexus (100%)</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Date d'approbation</span>
                  <span className="font-bold">Janvier 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}