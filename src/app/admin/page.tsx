"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Eye, ShieldAlert } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MOCK_SUBMISSIONS = [
  { id: "s1", levelId: "99887766", name: "Fast Finger Test", creator: "ClickGod", timestamp: Date.now() - 100000 },
  { id: "s2", levelId: "55443322", name: "Spam Heaven", creator: "GDSlave", timestamp: Date.now() - 500000 },
];

export default function AdminPage() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState(MOCK_SUBMISSIONS);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
    toast({
      title: action === 'approve' ? "Niveau Approuvé" : "Niveau Rejeté",
      description: `L'action a été enregistrée avec succès.`,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-red-500/10 text-red-500 rounded-lg">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Panel Modérateur</h1>
            <p className="text-muted-foreground">Gestion des soumissions et de la sécurité du site.</p>
          </div>
        </div>

        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
            <CardTitle>Soumissions en attente</CardTitle>
            <Badge variant="outline" className="border-primary text-primary">{submissions.length} nouveaux</Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Niveau</TableHead>
                  <TableHead>Créateur</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell>{sub.creator}</TableCell>
                    <TableCell>{sub.levelId}</TableCell>
                    <TableCell>{new Date(sub.timestamp).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 border-primary/30 text-primary">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleAction(sub.id, 'approve')} size="icon" className="h-8 w-8 bg-green-600 hover:bg-green-700">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button onClick={() => handleAction(sub.id, 'reject')} size="icon" className="h-8 w-8 bg-destructive hover:bg-destructive/90">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {submissions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground italic">
                      Aucune soumission en attente. Bon travail !
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}