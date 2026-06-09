"use client";

import { use, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MOCK_PLAYERS } from "@/app/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, History, LayoutList, Zap, ShieldCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProfilPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const player = MOCK_PLAYERS.find(p => p.id === id);

  if (!player) return <div className="p-20 text-center font-bold text-2xl">Joueur introuvable.</div>;

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info Card */}
          <Card className="lg:col-span-1 bg-card/50 gold-border overflow-hidden relative">
             <div className="h-2 w-full bg-primary" />
             <CardContent className="pt-8 text-center">
                <div className="h-32 w-32 rounded-3xl bg-muted mx-auto mb-6 flex items-center justify-center text-5xl font-black silver-text border-2 border-primary/20">
                  {player.name[0]}
                </div>
                <h1 className="text-4xl font-black gold-text mb-2">{player.name}</h1>
                <Badge className="bg-primary text-black font-black px-6 py-1 mb-6">{player.tier}</Badge>
                
                <div className="space-y-4 pt-6 border-t border-border">
                   <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2"><Trophy className="h-4 w-4" /> Rang Global</span>
                      <span className="font-bold silver-text">#{player.rank}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2"><LayoutList className="h-4 w-4" /> Records</span>
                      <span className="font-bold silver-text">{player.completions}</span>
                   </div>
                   <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-2"><Zap className="h-4 w-4" /> Style Fav.</span>
                      <span className="font-bold text-primary">{player.bestSpamType}</span>
                   </div>
                </div>
             </CardContent>
          </Card>

          {/* Progress & Stats */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/30 border-border">
              <CardHeader><CardTitle className="text-xl silver-text flex items-center gap-2"><Star className="text-primary h-5 w-5" /> Progression Prestige</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div>
                   <div className="flex justify-between text-xs uppercase font-black mb-2">
                      <span>Prochain Rang : {player.tier === 'Élite' ? 'LÉGENDE' : 'DIAMANT'}</span>
                      <span className="text-primary">{player.points} / 2500 PTS</span>
                   </div>
                   <Progress value={(player.points / 2500) * 100} className="h-3 gold-border" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-muted/30 rounded-2xl border border-white/5">
                     <p className="text-3xl font-black gold-text">{player.points}</p>
                     <p className="text-[10px] uppercase text-muted-foreground font-black tracking-widest">Points Totaux</p>
                  </div>
                  <div className="p-6 bg-muted/30 rounded-2xl border border-white/5">
                     <p className="text-3xl font-black silver-text">{player.trustScore}%</p>
                     <p className="text-[10px] uppercase text-muted-foreground font-black tracking-widest flex items-center gap-1">
                        <ShieldCheck className="h-3 w-3" /> Trust Score
                     </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/30 border-border">
              <CardHeader><CardTitle className="text-xl silver-text flex items-center gap-2"><History className="text-primary h-5 w-5" /> Historique d'Elite</CardTitle></CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground italic">
                  Chargement de l'activité Pulse AI...
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}