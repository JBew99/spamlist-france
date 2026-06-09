"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, ShieldAlert, Zap, Lock, Info, AlertTriangle } from "lucide-react";
import { MOCK_PLAYERS } from "@/app/lib/mock-data";

export default function AdminPage() {
  const [isAdmin] = useState(true); // Simulé
  
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
          </TabsList>

          <TabsContent value="records">
            <Card className="border-border bg-card/50 overflow-hidden">
              <CardContent className="p-0">
                <div className="p-8 text-center text-muted-foreground italic">
                  <Info className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  Tous les records ont été traités. Le Trust Score global est stable.
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-12 grid gap-6">
              <h3 className="text-xl font-bold silver-text flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" /> Joueurs à Surveiller (Low Trust)
              </h3>
              {MOCK_PLAYERS.filter(p => p.trustScore < 80).map(p => (
                <Card key={p.id} className="bg-destructive/5 border-destructive/20">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="font-bold">{p.name}</p>
                      <p className="text-xs text-muted-foreground">Trust Score : {p.trustScore}%</p>
                    </div>
                    <Badge variant="destructive">Suspicion de Macro</Badge>
                  </CardContent>
                </Card>
              ))}
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