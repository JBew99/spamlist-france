
"use client";

import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy, Medal, Monitor, Smartphone, LayoutList, Search, User, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useFirestore, useCollection } from "@/firebase";
import { collection, query, orderBy, limit } from "firebase/firestore";

export default function ClassementPage() {
  const [search, setSearch] = useState("");
  const firestore = useFirestore();

  const playersQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "users"),
      orderBy("points", "desc"),
      limit(50)
    );
  }, [firestore]);

  const { data: players, loading } = useCollection(playersQuery);

  const filteredPlayers = (players || []).filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black gold-text mb-4 animate-shine uppercase">Classement National</h1>
          <p className="text-muted-foreground text-lg uppercase tracking-[0.3em]">Les maîtres du spam français</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-primary">
            <Loader2 className="h-12 w-12 animate-spin mb-4" />
            <p className="font-bold silver-text uppercase tracking-widest">Analyse des scores...</p>
          </div>
        ) : (
          <>
            {/* Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {filteredPlayers.slice(0, 3).map((p, i) => (
                <Card key={p.id} className={`relative overflow-hidden border-2 ${i === 0 ? 'border-primary gold-border shadow-primary/20 scale-110 z-10' : 'border-border'} bg-card/50 backdrop-blur-sm`}>
                  <div className="absolute top-2 right-2 opacity-10">
                    {i === 0 && <Trophy className="h-24 w-24 text-primary" />}
                    {i === 1 && <Medal className="h-24 w-24 text-secondary" />}
                    {i === 2 && <Medal className="h-24 w-24 text-amber-700" />}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <Badge className={i === 0 ? "bg-primary text-black" : "bg-muted"}>RANG #{i + 1}</Badge>
                      {p.platform === 'PC' ? <Monitor className="h-4 w-4 opacity-50" /> : <Smartphone className="h-4 w-4 opacity-50" />}
                    </div>
                    <CardTitle className={`text-3xl font-black mt-4 ${i === 0 ? 'gold-text' : 'silver-text'}`}>{p.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-4xl font-black">{p.points}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Points Prestige</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold flex items-center gap-1 justify-end"><LayoutList className="h-4 w-4 text-primary" /> {p.completions}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Records</p>
                      </div>
                    </div>
                    <Link href={`/profil/${p.id}`}>
                      <Button variant="ghost" className="w-full mt-6 gold-border text-xs uppercase tracking-widest font-black">Voir le Profil</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search and Table */}
            <div className="space-y-6">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher un joueur..." 
                  className="pl-10 gold-border bg-card/50 h-12"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <Card className="bg-card/30 gold-border">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent border-border">
                        <TableHead className="w-24 text-center">RANG</TableHead>
                        <TableHead>JOUEUR</TableHead>
                        <TableHead>STYLE FAVORI</TableHead>
                        <TableHead className="text-center">RECORDS</TableHead>
                        <TableHead className="text-right">POINTS</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlayers.map((p, idx) => (
                        <TableRow key={p.id} className="border-border hover:bg-white/5 transition-colors h-16">
                          <TableCell className="text-center font-black text-xl">#{idx + 1}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-muted rounded-lg"><User className="h-4 w-4 silver-text" /></div>
                              <Link href={`/profil/${p.id}`} className="font-bold silver-text hover:gold-text transition-colors text-lg">{p.name}</Link>
                            </div>
                          </TableCell>
                          <TableCell><Badge variant="outline" className="text-[10px] uppercase font-bold">{p.bestSpamType}</Badge></TableCell>
                          <TableCell className="text-center font-bold">{p.completions}</TableCell>
                          <TableCell className="text-right font-black text-xl gold-text">{p.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
