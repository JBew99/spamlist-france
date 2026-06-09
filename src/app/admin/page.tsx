
"use client";

import { useMemo } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ShieldAlert, Lock, Eye, Check, X } from "lucide-react";
import { useFirestore, useCollection, useUser } from "@/firebase";
import { collection, query, where, updateDoc, doc, getDoc, setDoc, increment } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";
import { isAdminUser } from "@/lib/admin-utils";

export default function AdminPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  // ✅ FIXED: Use exact email matching, no .includes()
  const isAdmin = useMemo(() => {
    return user?.email ? isAdminUser(user.email) : false;
  }, [user?.email]);

  const pendingRecordsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "records"), where("status", "==", "pending"));
  }, [firestore]);

  const pendingLevelsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, "levels"), where("status", "==", "pending"));
  }, [firestore]);

  const { data: records, loading: recordsLoading } = useCollection(pendingRecordsQuery);
  const { data: levels, loading: levelsLoading } = useCollection(pendingLevelsQuery);

  const handleApproveRecord = async (record: any) => {
    if (!firestore) return;

    const recordRef = doc(firestore, "records", record.id);
    const userRef = doc(firestore, "users", record.userId);

    try {
      // 1. Approuver le record
      await updateDoc(recordRef, { status: "approved", pointsEarned: 100 });

      // 2. Mettre à jour les stats du joueur
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        await updateDoc(userRef, {
          points: increment(100),
          completions: increment(1),
          trustScore: increment(5)
        });
      } else {
        await setDoc(userRef, {
          name: record.playerName,
          points: 100,
          completions: 1,
          tier: "Bronze",
          trustScore: 60,
          platform: record.platform,
          bestSpamType: record.spamType,
          progression: [{ date: Date.now(), points: 100 }]
        });
      }

      toast({ title: "Record validé", description: `100 points ajoutés à ${record.playerName}` });
    } catch (e) {
      errorEmitter.emit("permission-error", new FirestorePermissionError({ path: recordRef.path, operation: "update" }));
    }
  };

  const handleRejectRecord = async (recordId: string) => {
    if (!firestore) return;
    const recordRef = doc(firestore, "records", recordId);
    updateDoc(recordRef, { status: "rejected" })
      .then(() => toast({ title: "Record rejeté" }))
      .catch(() => errorEmitter.emit("permission-error", new FirestorePermissionError({ path: recordRef.path, operation: "update" })));
  };

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
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 bg-primary/10 text-primary rounded-xl gold-border">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black gold-text uppercase">Quartier Général</h1>
            <p className="text-muted-foreground italic">"La confiance est le pilier de l'élite."</p>
          </div>
        </div>

        <Tabs defaultValue="records" className="w-full">
          <TabsList className="bg-muted/50 gold-border p-1 h-12 mb-8">
            <TabsTrigger value="records" className="gap-2">Records en Attente ({records?.length || 0})</TabsTrigger>
            <TabsTrigger value="levels" className="gap-2">Niveaux Proposés ({levels?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="records">
            <Card className="border-border bg-card/50 overflow-hidden">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Joueur</TableHead>
                      <TableHead>Niveau</TableHead>
                      <TableHead>Style / FPS</TableHead>
                      <TableHead>Preuve</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records?.map((rec: any) => (
                      <TableRow key={rec.id} className="border-border">
                        <TableCell className="font-bold">{rec.playerName}</TableCell>
                        <TableCell>{rec.levelName}</TableCell>
                        <TableCell><Badge variant="outline">{rec.spamType} / {rec.fps}fps</Badge></TableCell>
                        <TableCell>
                          <a href={rec.videoUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="link" size="sm" className="text-primary"><Eye className="h-4 w-4 mr-1"/> Voir</Button>
                          </a>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleApproveRecord(rec)} className="text-green-500 border-green-500/30"><Check className="h-4 w-4"/></Button>
                          <Button size="sm" variant="outline" onClick={() => handleRejectRecord(rec.id)} className="text-destructive border-destructive/30"><X className="h-4 w-4"/></Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="levels">
             <Card className="border-border bg-card/50 overflow-hidden">
              <CardContent className="p-0">
                <Table>
                   <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Créateur</TableHead>
                      <TableHead>Difficulté</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {levels?.map((lvl: any) => (
                      <TableRow key={lvl.id} className="border-border">
                        <TableCell className="font-bold">{lvl.name}</TableCell>
                        <TableCell>{lvl.creator}</TableCell>
                        <TableCell>{lvl.difficulty} pts</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button size="sm" variant="outline" className="text-green-500 border-green-500/30"><Check className="h-4 w-4"/></Button>
                          <Button size="sm" variant="outline" className="text-destructive border-destructive/30"><X className="h-4 w-4"/></Button>
                        </TableCell>
                      </TableRow>
                    ))}
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
