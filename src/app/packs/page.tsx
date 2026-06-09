"use client";

import { Navigation } from "@/components/Navigation";
import { MOCK_PACKS } from "@/app/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Zap, Star, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PacksPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-16">
          <h1 className="text-5xl font-black silver-text mb-4 uppercase tracking-tighter">Packs de Défis</h1>
          <p className="text-muted-foreground text-lg">Complétez des séries de niveaux pour gagner des points bonus et des badges exclusifs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PACKS.map((pack) => (
            <Card key={pack.id} className="bg-card/30 border-border gold-border/20 group hover:gold-border transition-all overflow-hidden">
              <div className="h-2 w-full bg-primary/20 group-hover:bg-primary transition-colors" />
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl"><Package className="h-6 w-6 text-primary" /></div>
                  <Badge className="bg-primary text-black font-black">+{pack.rewardPoints} PTS</Badge>
                </div>
                <CardTitle className="text-2xl font-black gold-text">{pack.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">{pack.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold silver-text uppercase tracking-widest">
                  <LayoutList className="h-4 w-4" /> {pack.levels.length} Niveaux Requis
                </div>
                <div className="flex flex-wrap gap-2">
                  {pack.levels.map(lid => (
                    <div key={lid} className="h-8 px-4 bg-muted rounded-full flex items-center justify-center text-[10px] font-bold border border-border">ID: {lid}</div>
                  ))}
                </div>
                <Button className="w-full mt-4 gold-border bg-transparent text-primary hover:bg-primary hover:text-black font-black uppercase text-xs tracking-widest h-12">Explorer le Pack</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}