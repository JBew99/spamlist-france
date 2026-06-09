
"use client";

import { useState, useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Star, History, LayoutList, Zap, ShieldCheck, Monitor, Smartphone, Youtube, Clock, Activity, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useFirestore, useDoc, useCollection, useUser } from "@/firebase";
import { doc, collection, query, where, orderBy } from "firebase/firestore";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ProfilPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const firestore = useFirestore();
  const { user: currentUser } = useUser();
  
  const userRef = useMemo(() => firestore ? doc(firestore, "users", id) : null, [firestore, id]);
  const { data: player, loading: playerLoading } = useDoc(userRef);

  const recordsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, "records"),
      where("userId", "==", id),
      orderBy("timestamp", "desc")
    );
  }, [firestore, id]);

  const { data: records, loading: recordsLoading } = useCollection(recordsQuery);

  if (playerLoading) return <div className="flex items-center justify-center min-h-screen"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
  if (!player) return <div className="p-20 text-center font-bold text-2xl silver-text">Joueur introuvable dans la base de données.</div>;

  const approvedRecords = records?.filter(r => r.status === 'approved') || [];
  const pendingRecords = records?.filter(r => r.status === 'pending') || [];
  
  // Données pour le graphique (simulées ou réelles si présentes dans l'objet user)
  const chartData = player.progression || [
    { name: 'Lun', points: 0 },
    { name: 'Mar', points: player.points * 0.2 },
    { name: 'Mer', points: player.points * 0.4 },
    { name: 'Jeu', points: player.points * 0.7 },
    { name: 'Ven', points: player.points * 0.9 },
    { name: 'Sam', points: player.points },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Profil */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-card/50 gold-border overflow-hidden relative border-t-4 border-t-primary">
              <CardContent className="pt-10 text-center">
                <div className="h-28 w-28 rounded-3xl bg-muted mx-auto mb-6 flex items-center justify-center text-4xl font-black silver-text border-2 border-primary/20 shadow-[0_0_20px_rgba(250,204,21,0.1)]">
                  {player.name?.[0] || "?"}
                </div>
                <h1 className="text-3xl font-black gold-text mb-1 truncate">{player.name}</h1>
                <Badge className="bg-primary text-black font-black px-4 py-1 mb-6 uppercase text-[10px] tracking-widest">{player.tier || "Bronze"}</Badge>
                
                <div className="grid grid-cols-2 gap-2 pt-6 border-t border-border">
                  <div className="text-center p-3 bg-muted/30 rounded-xl">
                    <p className="text-xl font-black silver-text">{player.points || 0}</p>
                    <p className="text-[10px] uppercase text-muted-foreground font-black">Points</p>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-xl">
                    <p className="text-xl font-black silver-text">{player.completions || 0}</p>
                    <p className="text-[10px] uppercase text-muted-foreground font-black">Records</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/30 border-border">
              <CardHeader><CardTitle className="text-xs uppercase tracking-widest font-black silver-text">Détails Techniques</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Monitor className="h-3 w-3" /> Plateforme</span>
                  <span className="font-bold silver-text">{player.platform || "PC"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><Zap className="h-3 w-3 text-primary" /> Style Fav.</span>
                  <Badge variant="outline" className="text-[10px] uppercase">{player.bestSpamType || "Butterfly"}</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><ShieldCheck className="h-3 w-3 text-green-500" /> Trust Score</span>
                  <span className="font-bold text-green-500">{player.trustScore || 0}%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Graphique de Progression */}
            <Card className="bg-card/30 gold-border overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl silver-text flex items-center gap-2"><Activity className="text-primary h-5 w-5" /> Progression Prestige</CardTitle>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase font-black text-muted-foreground">Objectif Prochain Rang</p>
                  <p className="text-lg font-black gold-text">{(player.points || 0)} / 2500</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f6d365" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f6d365" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #444', borderRadius: '12px' }} />
                      <Area type="monotone" dataKey="points" stroke="#f6d365" strokeWidth={3} fillOpacity={1} fill="url(#colorPoints)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <Progress value={((player.points || 0) / 2500) * 100} className="h-2 mt-6 gold-border" />
              </CardContent>
            </Card>

            {/* Onglets Records */}
            <Tabs defaultValue="approved" className="w-full">
              <TabsList className="bg-muted/50 gold-border p-1 h-12 mb-6">
                <TabsTrigger value="approved" className="gap-2">Validés ({approvedRecords.length})</TabsTrigger>
                {id === currentUser?.uid && (
                  <TabsTrigger value="pending" className="gap-2">En attente ({pendingRecords.length})</TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="approved" className="grid gap-4">
                {approvedRecords.map(rec => (
                  <Card key={rec.id} className="bg-card/40 border-border hover:gold-border transition-all">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-xl"><Trophy className="h-5 w-5 text-primary" /></div>
                        <div>
                          <p className="font-bold silver-text">{rec.levelName}</p>
                          <div className="flex items-center gap-3 text-[10px] uppercase font-black text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">{rec.platform === 'PC' ? <Monitor className="h-3 w-3" /> : <Smartphone className="h-3 w-3" />} {rec.fps}Hz</span>
                            <span className="text-primary">{rec.spamType}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-lg font-black gold-text">+{rec.pointsEarned || 0}</p>
                          <p className="text-[10px] uppercase text-muted-foreground font-black">Points</p>
                        </div>
                        <a href={rec.videoUrl} target="_blank" className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                          <Youtube className="h-5 w-5 text-destructive" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {approvedRecords.length === 0 && (
                  <div className="text-center py-20 bg-muted/10 rounded-2xl border-2 border-dashed border-border">
                    <p className="italic text-muted-foreground">Aucun record validé pour le moment.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending" className="grid gap-4">
                {pendingRecords.map(rec => (
                  <Card key={rec.id} className="bg-card/20 border-dashed border-primary/30">
                    <CardContent className="p-4 flex items-center justify-between opacity-70">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-muted rounded-xl"><Clock className="h-5 w-5 text-muted-foreground" /></div>
                        <div>
                          <p className="font-bold silver-text">{rec.levelName}</p>
                          <p className="text-[10px] text-muted-foreground uppercase font-black">Soumis le {new Date(rec.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-amber-500 border-amber-500/30">EN ATTENTE</Badge>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
