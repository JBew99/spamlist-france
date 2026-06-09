"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, ShieldAlert, Zap, Trophy, BrainCircuit, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function AdminPage() {
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Simulation d'accès admin (le proprio)
  useEffect(() => {
    // Dans une vraie app, on checkerait les claims Firebase Auth ici
    const checkAccess = () => {
      const isOwner = true; // Simulé
      setIsAdmin(isOwner);
    };
    checkAccess();
  }, []);

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <Lock className="h-20 w-20 text-destructive mb-6" />
        <h1 className="text-4xl font-black gold-text mb-4 uppercase">Accès Restreint</h1>
        <p className="text-muted-foreground max-w-md">Seuls les administrateurs et le propriétaire peuvent accéder au Quartier Général.</p>
        <Link href="/"><Button className="mt-8 gold-border" variant="outline">Retour à l'accueil</Button></Link>
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
              <p className="text-muted-foreground italic">"La qualité avant la quantité."</p>
            </div>
          </div>
          <Button variant="outline" className="gold-border text-primary hover:bg-primary/10 gap-2">
            <BrainCircuit className="h-4 w-4" /> Analyseur IA Pulse (Bêta)
          </Button>
        </div>

        <Tabs defaultValue="levels" className="w-full">
          <TabsList className="bg-muted/50 gold-border p-1 h-12 mb-8">
            <TabsTrigger value="levels" className="gap-2">Nouveaux Niveaux</TabsTrigger>
            <TabsTrigger value="records" className="gap-2">Nouveaux Records</TabsTrigger>
          </TabsList>

          <TabsContent value="levels">
            <Card className="border-border shadow-2xl bg-card/50">
              <CardContent className="p-0 text-center py-20 italic text-muted-foreground">
                Aucune proposition de niveau en attente.
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records">
            <Card className="border-border shadow-2xl bg-card/50">
              <CardContent className="p-0 text-center py-20 italic text-muted-foreground">
                Tous les records ont été vérifiés par l'équipe Pulse AI.
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}