"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, ShieldAlert, Zap, Trophy, BrainCircuit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MOCK_SUBMISSIONS = [
  { id: "s1", type: 'new_level', levelId: "99887766", name: "Fast Finger Test", creator: "ClickGod", timestamp: Date.now() - 100000 },
  { id: "r1", type: 'completion', levelId: "12345678", levelName: "Ultra Spam v2", playerName: "DarkClipper", videoUrl: "https://yt.com", timestamp: Date.now() - 500000 },
];

export default function AdminPage() {
  const { toast } = useToast();
  const [subs, setSubs] = useState(MOCK_SUBMISSIONS);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setSubs(prev => prev.filter(s => s.id !== id));
    toast({
      title: action === 'approve' ? "Accepté" : "Refusé",
      description: `L'action a été synchronisée avec la base de données.`,
    });
  };

  const levels = subs.filter(s => s.type === 'new_level');
  const records = subs.filter(s => s.type === 'completion');

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 text-primary rounded-xl gold-border">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-black gold-text">Quartier Général</h1>
              <p className="text-muted-foreground italic">"La qualité avant la quantité."</p>
            </div>
          </div>
          <Button variant="outline" className="gold-border text-primary hover:bg-primary/10 gap-2">
            <BrainCircuit className="h-4 w-4" /> Analyseur IA Auto
          </Button>
        </div>

        <Tabs defaultValue="levels" className="w-full">
          <TabsList className="bg-muted/50 gold-border p-1 h-12 mb-8">
            <TabsTrigger value="levels" className="gap-2">Niveaux <Badge variant="secondary" className="ml-1">{levels.length}</Badge></TabsTrigger>
            <TabsTrigger value="records" className="gap-2">Records <Badge variant="secondary" className="ml-1">{records.length}</Badge></TabsTrigger>
          </TabsList>

          <TabsContent value="levels">
            <Card className="border-border shadow-2xl">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead>Niveau</TableHead>
                      <TableHead>Créateur</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead className="text-right">Décision</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {levels.map((sub) => (
                      <TableRow key={sub.id} className="border-border">
                        <TableCell className="font-bold silver-text">{sub.name}</TableCell>
                        <TableCell>{sub.creator}</TableCell>
                        <TableCell className="font-mono text-xs">{sub.levelId}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-primary"><Eye /></Button>
                            <Button onClick={() => handleAction(sub.id, 'approve')} size="icon" className="bg-green-600 h-8 w-8"><Check /></Button>
                            <Button onClick={() => handleAction(sub.id, 'reject')} size="icon" className="bg-destructive h-8 w-8"><X /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {levels.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">Calme plat sur les nouveaux niveaux.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records">
            <Card className="border-border shadow-2xl">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent border-border">
                      <TableHead>Joueur</TableHead>
                      <TableHead>Challenge</TableHead>
                      <TableHead>Lien</TableHead>
                      <TableHead className="text-right">Décision</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((sub: any) => (
                      <TableRow key={sub.id} className="border-border">
                        <TableCell className="font-bold gold-text">{sub.playerName}</TableCell>
                        <TableCell>{sub.levelName}</TableCell>
                        <TableCell><a href={sub.videoUrl} target="_blank" className="text-blue-400 underline text-xs">Preuve</a></TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button onClick={() => handleAction(sub.id, 'approve')} size="icon" className="bg-primary text-black h-8 w-8"><Check /></Button>
                            <Button onClick={() => handleAction(sub.id, 'reject')} size="icon" className="bg-destructive h-8 w-8"><X /></Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {records.length === 0 && <TableRow><TableCell colSpan={4} className="text-center py-20 text-muted-foreground">Aucun exploit en attente de validation.</TableCell></TableRow>}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}