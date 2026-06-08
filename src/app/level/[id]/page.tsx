"use client";

import { use, useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { MOCK_LEVELS } from "@/app/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Star, Play, Trophy, MessageSquare, Sparkles } from "lucide-react";
import { summarizeLevelComments } from "@/ai/flows/level-comment-summarizer";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

export default function LevelDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { toast } = useToast();
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
        } catch (error) {
          console.error("AI Error:", error);
        } finally {
          setIsLoadingAi(false);
        }
      }
    }
    getSummary();
  }, [level]);

  if (!level) return <div className="p-8 text-center">Niveau non trouvé.</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Header */}
        <div className="relative rounded-2xl overflow-hidden border border-border bg-card mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-1/2 h-full -z-0">
            <Image 
              src={`https://picsum.photos/seed/detail-${level.id}/800/400`} 
              alt={level.name} 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="relative z-20 p-8 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-white">#1 Official</Badge>
                <Badge variant="outline" className="border-secondary text-secondary">ID: {level.levelId}</Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-black neon-text text-primary leading-tight">{level.name}</h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light">par <span className="text-foreground font-bold">{level.creator}</span></p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <a href={level.videoProof} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8">
                    <Play className="mr-2 h-5 w-5 fill-current" /> Vidéo Preuve
                  </Button>
                </a>
              </div>
            </div>

            <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center min-w-[160px]">
              <div className="text-4xl font-black text-secondary mb-1">{level.difficulty}</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Points Totaux</div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" /> Détails techniques
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">List% requis</p>
                    <p className="text-2xl font-bold">{level.completionPercent}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Enjoyment Moyen</p>
                    <p className="text-2xl font-bold text-yellow-500">{level.averageRating}%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Statut</p>
                    <Badge className="bg-green-500/20 text-green-500 border-none uppercase text-[10px]">Approuvé</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase font-bold">Description</p>
                  <p className="text-sm leading-relaxed text-foreground/80">{level.description}</p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="comments" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card border border-border">
                <TabsTrigger value="comments" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Commentaires
                </TabsTrigger>
                <TabsTrigger value="ai-summary" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> Résumé IA
                </TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className="pt-4 space-y-4">
                {level.ratings.length > 0 ? level.ratings.map(rating => (
                  <Card key={rating.id} className="border-border/40 bg-card/50">
                    <CardContent className="p-4 flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold">
                        {rating.rating}
                      </div>
                      <div>
                        <p className="text-sm italic">"{rating.comment}"</p>
                        <p className="text-[10px] text-muted-foreground mt-2">{new Date(rating.timestamp).toLocaleDateString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <p className="text-center text-muted-foreground py-8">Aucun commentaire pour le moment.</p>
                )}
              </TabsContent>
              <TabsContent value="ai-summary" className="pt-4">
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                      <h4 className="font-bold">Analyse Intelligente</h4>
                    </div>
                    {isLoadingAi ? (
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-primary/10 animate-pulse rounded" />
                        <div className="h-4 w-3/4 bg-primary/10 animate-pulse rounded" />
                      </div>
                    ) : aiSummary ? (
                      <p className="text-sm leading-relaxed">{aiSummary}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">Pas assez de données pour générer un résumé.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-8">
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <CardTitle className="text-lg">Donnez votre avis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">Vous avez complété ce défi ? Notez-le pour aider la liste !</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Note d'Enjoyment</span>
                    <span className="text-secondary">75%</span>
                  </div>
                  <Progress value={75} className="h-2 bg-secondary/20" />
                </div>
                <Button className="w-full bg-secondary hover:bg-secondary/90">Voter maintenant</Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Stats du niveau</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Vues</span>
                  <span className="text-sm font-bold">1.2k</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Soumissions</span>
                  <span className="text-sm font-bold">42</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Temps Moyen</span>
                  <span className="text-sm font-bold">2.5 min</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}