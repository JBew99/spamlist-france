"use client";

import { Navigation } from "@/components/Navigation";
import { MOCK_PLAYERS } from "@/app/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Star, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LeaderboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black gold-text mb-4 animate-shine">Panthéon de l'Élite</h1>
          <p className="text-muted-foreground text-lg uppercase tracking-[0.2em]">Les meilleurs claqueurs de France</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {MOCK_PLAYERS.slice(0, 3).map((p, i) => (
            <Card key={p.name} className={`relative overflow-hidden border-2 ${i === 0 ? 'border-primary gold-border shadow-primary/20' : 'border-border'} bg-card/50 backdrop-blur-sm`}>
              <div className="absolute top-2 right-2 opacity-20">
                {i === 0 && <Trophy className="h-20 w-20 text-primary" />}
                {i === 1 && <Medal className="h-20 w-20 text-secondary" />}
                {i === 2 && <Medal className="h-20 w-20 text-amber-700" />}
              </div>
              <CardHeader>
                <Badge className={i === 0 ? "bg-primary text-black" : "bg-muted"}>Rang #{i + 1}</Badge>
                <CardTitle className={`text-2xl font-bold mt-2 ${i === 0 ? 'gold-text' : 'silver-text'}`}>{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-3xl font-black">{p.points}</p>
                    <p className="text-xs text-muted-foreground uppercase">Points List</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold flex items-center gap-1"><Flame className="h-4 w-4 text-orange-500" /> {p.completions}</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Records</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card/50 border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border">
                  <TableHead className="w-20">Rang</TableHead>
                  <TableHead>Joueur</TableHead>
                  <TableHead>Completions</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_PLAYERS.map((p) => (
                  <TableRow key={p.name} className="border-border hover:bg-white/5 transition-colors">
                    <TableCell className="font-bold">#{p.rank}</TableCell>
                    <TableCell className="font-bold silver-text">{p.name}</TableCell>
                    <TableCell>{p.completions}</TableCell>
                    <TableCell className="text-right font-black gold-text">{p.points}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}