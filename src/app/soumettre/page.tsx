
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, Trophy, PlusCircle, ShieldAlert, Info, LogIn } from "lucide-react";
import { useUser, useFirestore, useAuth } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { errorEmitter } from "@/firebase/error-emitter";
import { FirestorePermissionError } from "@/firebase/errors";

const recordSchema = z.object({
  levelId: z.string().min(1, "L'ID du niveau est requis"),
  levelName: z.string().min(1, "Le nom du niveau est requis"),
  playerName: z.string().min(2, "Pseudo GD obligatoire"),
  videoUrl: z.string().url("Lien vidéo invalide"),
  fps: z.string(),
  platform: z.enum(['PC', 'Mobile']),
  spamType: z.string(),
});

const levelSchema = z.object({
  levelId: z.string().min(6, "ID GD valide requis"),
  name: z.string().min(2, "Nom du niveau requis"),
  creator: z.string().min(2, "Créateur requis"),
  difficulty: z.string().min(1, "Points requis"),
  videoProof: z.string().url("Lien vidéo de vérification"),
  description: z.string(),
  spamType: z.string(),
});

export default function SoumettrePage() {
  const { toast } = useToast();
  const { user, loading: authLoading } = useUser();
  const firestore = useFirestore();
  const auth = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const recordForm = useForm<z.infer<typeof recordSchema>>({
    resolver: zodResolver(recordSchema),
    defaultValues: { levelId: "", levelName: "", playerName: "", videoUrl: "", fps: "60", platform: 'PC', spamType: 'Butterfly' },
  });

  const levelForm = useForm<z.infer<typeof levelSchema>>({
    resolver: zodResolver(levelSchema),
    defaultValues: { levelId: "", name: "", creator: "", difficulty: "50", videoProof: "", description: "", spamType: "Alternating" },
  });

  const handleSignIn = async () => {
    if (!auth) return;
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur de connexion", description: "Impossible de se connecter." });
    }
  };

  const onRecordSubmit = async (values: z.infer<typeof recordSchema>) => {
    if (!user || !firestore) return;
    setIsSubmitting(true);

    const recordData = {
      ...values,
      userId: user.uid,
      fps: parseInt(values.fps),
      status: 'pending',
      timestamp: Date.now(),
      pointsEarned: 0,
    };

    addDoc(collection(firestore, "records"), recordData)
      .then(() => {
        setIsSubmitted(true);
        toast({ title: "Record envoyé", description: "Vérification en cours par l'équipe de modération." });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: "records",
          operation: "create",
          requestResourceData: recordData,
        });
        errorEmitter.emit("permission-error", permissionError);
      })
      .finally(() => setIsSubmitting(false));
  };

  const onLevelSubmit = async (values: z.infer<typeof levelSchema>) => {
    if (!user || !firestore) return;
    setIsSubmitting(true);

    const levelData = {
      ...values,
      difficulty: parseInt(values.difficulty),
      status: 'pending',
      verifier: user.displayName || user.email || "Utilisateur",
      createdAt: Date.now(),
    };

    addDoc(collection(firestore, "levels"), levelData)
      .then(() => {
        setIsSubmitted(true);
        toast({ title: "Niveau proposé", description: "L'Elite va étudier votre proposition." });
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: "levels",
          operation: "create",
          requestResourceData: levelData,
        });
        errorEmitter.emit("permission-error", permissionError);
      })
      .finally(() => setIsSubmitting(false));
  };

  if (!user && !authLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Card className="max-w-md w-full gold-border bg-card/50 backdrop-blur">
            <CardContent className="pt-10 pb-10 flex flex-col items-center">
              <LogIn className="h-16 w-16 text-primary mb-6" />
              <h2 className="text-3xl font-black gold-text mb-4 uppercase">Connexion Requise</h2>
              <p className="text-muted-foreground mb-8">Vous devez être identifié pour soumettre vos exploits et participer au classement.</p>
              <Button onClick={handleSignIn} className="bg-primary text-black font-black w-full h-14 text-lg">
                Se connecter avec Google
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center gold-border bg-card shadow-2xl animate-in zoom-in duration-300">
            <CardContent className="pt-10 pb-10 flex flex-col items-center">
              <CheckCircle2 className="h-20 w-20 text-primary mb-4" />
              <h2 className="text-3xl font-black gold-text mb-2">Soumission Enregistrée</h2>
              <p className="text-muted-foreground mb-6 text-sm">Votre soumission est en file d'attente. Merci de contribuer à la scène française.</p>
              <Button onClick={() => setIsSubmitted(false)} className="bg-primary text-black font-black">Nouvelle Soumission</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black gold-text mb-4 uppercase tracking-tighter">Portail de Soumission</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground bg-primary/5 p-4 rounded-xl gold-border max-w-2xl mx-auto">
             <ShieldAlert className="h-5 w-5 text-primary" />
             <p className="text-xs italic">Toute tentative de triche (macros, speedhack) entraînera un bannissement définitif.</p>
          </div>
        </div>

        <Tabs defaultValue="record" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-16 bg-muted/50 p-1 rounded-2xl gold-border mb-8">
            <TabsTrigger value="record" className="text-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-black">
              <Trophy className="h-5 w-5" /> Déposer un Record
            </TabsTrigger>
            <TabsTrigger value="level" className="text-lg gap-2 data-[state=active]:bg-primary data-[state=active]:text-black">
              <PlusCircle className="h-5 w-5" /> Proposer un Niveau
            </TabsTrigger>
          </TabsList>

          <TabsContent value="record">
            <Card className="bg-card/50 gold-border shadow-2xl">
              <CardContent className="pt-8">
                <Form {...recordForm}>
                  <form onSubmit={recordForm.handleSubmit(onRecordSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={recordForm.control} name="playerName" render={({ field }) => (
                        <FormItem><FormLabel>Pseudo Ingame</FormLabel><FormControl><Input placeholder="ex: Nexus" className="gold-border bg-background" {...field} /></FormControl><FormMessage/></FormItem>
                      )} />
                      <FormField control={recordForm.control} name="levelName" render={({ field }) => (
                        <FormItem><FormLabel>Nom du Niveau</FormLabel><FormControl><Input placeholder="ex: Ultra Spam v2" className="gold-border bg-background" {...field} /></FormControl><FormMessage/></FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <FormField control={recordForm.control} name="levelId" render={({ field }) => (
                        <FormItem><FormLabel>ID Geometry Dash</FormLabel><FormControl><Input placeholder="ex: 12345678" className="gold-border bg-background" {...field} /></FormControl><FormMessage/></FormItem>
                      )} />
                      <FormField control={recordForm.control} name="videoUrl" render={({ field }) => (
                        <FormItem><FormLabel>Lien de la Preuve Vidéo (YouTube)</FormLabel><FormControl><Input placeholder="https://youtube.com/..." className="gold-border bg-background" {...field} /></FormControl><FormMessage/></FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField control={recordForm.control} name="fps" render={({ field }) => (
                        <FormItem><FormLabel>FPS</FormLabel><FormControl><Input type="number" placeholder="ex: 240" className="gold-border bg-background" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={recordForm.control} name="platform" render={({ field }) => (
                        <FormItem><FormLabel>Plateforme</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="gold-border bg-background"><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="PC">PC</SelectItem><SelectItem value="Mobile">Mobile</SelectItem></SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                      <FormField control={recordForm.control} name="spamType" render={({ field }) => (
                        <FormItem><FormLabel>Style de Spam</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="gold-border bg-background"><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                              {['Butterfly', 'Jitter', 'Alternating', 'Rake', 'Lip Spam', 'Alt-Jitter', 'Button Mashing'].map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-primary text-black font-black text-xl hover:scale-[1.01] transition-all shadow-lg shadow-primary/10">
                      {isSubmitting ? "Envoi en cours..." : "Envoyer le Record"} <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="level">
             <Card className="bg-card/50 gold-border">
              <CardContent className="pt-8">
                <Form {...levelForm}>
                  <form onSubmit={levelForm.handleSubmit(onLevelSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={levelForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Nom du Niveau</FormLabel><FormControl><Input placeholder="ex: Ultra Spam v3" className="gold-border bg-background" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={levelForm.control} name="creator" render={({ field }) => (
                        <FormItem><FormLabel>Créateur</FormLabel><FormControl><Input placeholder="ex: Cliquos" className="gold-border bg-background" {...field} /></FormControl></FormItem>
                      )} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={levelForm.control} name="levelId" render={({ field }) => (
                        <FormItem><FormLabel>ID Geometry Dash</FormLabel><FormControl><Input placeholder="ID Ingame (ex: 87654321)" className="gold-border bg-background" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={levelForm.control} name="difficulty" render={({ field }) => (
                        <FormItem><FormLabel>Points Proposés (Prestige)</FormLabel><FormControl><Input type="number" placeholder="ex: 100" className="gold-border bg-background" {...field} /></FormControl></FormItem>
                      )} />
                    </div>
                    <FormField control={levelForm.control} name="videoProof" render={({ field }) => (
                      <FormItem><FormLabel>Vidéo de Vérification</FormLabel><FormControl><Input placeholder="Lien YouTube de la vérification" className="gold-border bg-background" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={levelForm.control} name="description" render={({ field }) => (
                      <FormItem><FormLabel>Description Technique</FormLabel><FormControl><Textarea placeholder="Précisez le style de spam requis et les spécificités..." className="gold-border bg-background" {...field} /></FormControl></FormItem>
                    )} />
                    <div className="p-4 bg-muted/50 rounded-xl flex items-start gap-3 border border-border">
                       <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                       <p className="text-xs text-muted-foreground leading-relaxed">Les niveaux proposés doivent être jugés "List-Worthy" par l'Elite.</p>
                    </div>
                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-secondary text-black font-black text-xl hover:scale-[1.01] transition-all">
                      {isSubmitting ? "Envoi en cours..." : "Proposer à l'Élite"} <PlusCircle className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
