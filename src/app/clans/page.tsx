"use client";

import { Navigation } from "@/components/Navigation";
import { MOCK_CLANS } from "@/app/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trophy, Shield, Swords, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClansPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-8 text-center md:text-left">
          <div>
            <h1 className="text-6xl font-black gold-text mb-4 uppercase tracking-tighter">Guerre des Clans</h1>
            <p className="text-muted-foreground text-lg">Dominez la liste en équipe. Chaque record compte pour votre alliance.</p>
          </div>
          <Button className="h-16 px-10 bg-primary text-black font-black rounded-2xl gap-2 text-xl shadow-2xl shadow-primary/20">
            <PlusCircle className="h-6 w-6" /> Créer un Clan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {MOCK_CLANS.map((clan) => (
            <Card key={clan.id} className="bg-card/40 gold-border group hover:bg-primary/5 transition-all">
              <CardHeader className="flex flex-row items-center gap-6">
                <div className="h-20 w-20 rounded-2xl bg-muted flex items-center justify-center font-black text-4xl silver-text gold-border group-hover:scale-110 transition-transform">
                  {clan.tag}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-3xl font-black gold-text">{clan.name}</CardTitle>
                    <Badge className="bg-primary/20 text-primary border-primary/30"># {clan.rank}</Badge>
                  </div>
                  <p className="text-muted-foreground italic text-sm mt-1">{clan.description}</p>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-4 border-t border-border pt-6">
                <div className="text-center">
                  <Trophy className="h-5 w-5 mx-auto text-primary mb-2" />
                  <p className="text-xl font-black silver-text">{clan.points}</p>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Points</p>
                </div>
                <div className="text-center">
                  <Users className="h-5 w-5 mx-auto text-primary mb-2" />
                  <p className="text-xl font-black silver-text">{clan.members}</p>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">Membres</p>
                </div>
                <div className="flex items-center justify-center">
                  <Button variant="outline" className="w-full gold-border uppercase text-[10px] font-black tracking-widest h-10">Rejoindre</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}