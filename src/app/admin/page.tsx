"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, Zap, Lock, Info, AlertTriangle, Check, X, ShieldCheck, Eye } from "lucide-react";
import { MOCK_PLAYERS } from "@/app/lib/mock-data";

export default function AdminPage() {
  const [isAdmin] = useState(true); // Simulé pour le MVP
  
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <Lock className="h-20 w-20 text-destructive mb-6" />
        <h1 className="text-4xl font-black gold-text mb-4 uppercase">Accès Restreint</h1>
        <p className="text-muted-foreground max-w-md">Seuls les modérateurs accrédités peuvent accéder au Quartier Général.</p>
      </div>
    );
  }

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
              <p className="text-muted-foreground italic">"La confiance est le pilier de l'élite."</p>
            </div>
          </div>
          <Badge variant="outline" className="gold-border px-4 py-2 flex gap-2">
            <Zap className="h-4 w-4 text-primary" /> Modération Pulse AI Active
          </Badge>
        </div>

        <Tabs defaultValue="records" className="w-full">
          <TabsList className="bg-muted/50 gold-border p-1 h-12 mb-8">
            <TabsTrigger value="records" className="gap-2">Records en Attente</TabsTrigger>
            <TabsTrigger value="levels" className="gap-2">Propositions Niveaux</TabsTrigger>
            <TabsTrigger value="users" className="gap-2">Gestion Joueurs</TabsTrigger>
          </TabsList>

          <TabsContent value="records">
            <Card className="border-border bg-card/50 overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Joueur</TableHead>
                      <TableHead>Niveau</TableHead>
                      <TableHead>Trust Score</TableHead>
                      <TableHead>Preuve</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-border">
                      <TableCell className="font-bold">DarkSpam</TableCell>
                      <TableCell>Ultra Spam v2</TableCell>
                      <TableCell><Badge className="bg-green-500/20 text-green-500">92% High</Badge></TableCell>
                      <TableCell><Button variant="link" size="sm" className="text-primary"><Eye className="h-4 w-4 mr-1"/> Vidéo</Button></TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline" className="text-green-500 border-green-500/30"><Check className="h-4 w-4"/></Button>
                        <Button size="sm" variant="outline" className="text-destructive border-destructive/30"><X className="h-4 w-4"/></Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <div className="grid gap-6">
              <h3 className="text-xl font-bold silver-text flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" /> Surveillance Trust Score
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_PLAYERS.map(p => (
                  <Card key={p.id} className={`${p.trustScore < 80 ? 'bg-destructive/5 border-destructive/20' : 'bg-card/50 border-border'}`}>
                    <CardContent className="p-6 flex items-center justify-between">
                      <div>
                        <p className="font-bold">{p.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <ShieldCheck className="h-3 w-3" /> Trust: {p.trustScore}%
                        </p>
                      </div>
                      <Badge variant={p.trustScore < 80 ? 'destructive' : 'outline'}>
                        {p.trustScore < 80 ? 'Suspect' : 'Fiable'}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="levels">
             <Card className="border-border bg-card/50">
              <CardContent className="p-20 text-center italic text-muted-foreground">
                Aucune proposition de niveau en attente.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}