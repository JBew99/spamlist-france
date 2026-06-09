"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, Trophy, PlusCircle, ShieldAlert } from "lucide-react";

const recordSchema = z.object({
  levelId: z.string().min(1, "L'ID du niveau est requis"),
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
  videoProof: z.string().url("Lien vidéo de vérification"),
  description: z.string(),
  spamType: z.string(),
});

export default function SoumettrePage() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const recordForm = useForm<z.infer<typeof recordSchema>>({
    resolver: zodResolver(recordSchema),
    defaultValues: { levelId: "", playerName: "", videoUrl: "", fps: "60", platform: 'PC', spamType: 'Butterfly' },
  });

  const levelForm = useForm<z.infer<typeof levelSchema>>({
    resolver: zodResolver(levelSchema),
    defaultValues: { levelId: "", name: "", creator: "", videoProof: "", description: "", spamType: "Alternating" },
  });

  const onRecordSubmit = () => {
    setIsSubmitted(true);
    toast({ title: "Record envoyé", description: "Vérification en cours par Pulse AI." });
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center gold-border bg-card shadow-2xl">
            <CardContent className="pt-10 pb-10 flex flex-col items-center">
              <CheckCircle2 className="h-20 w-20 text-primary mb-4" />
              <h2 className="text-3xl font-black gold-text mb-2">Soumission Enregistrée</h2>
              <p className="text-muted-foreground mb-6 text-sm">Votre Trust Score actuel permet une validation estimée sous 24-48h.</p>
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
             <p className="text-xs italic">Les preuves sont analysées frame par frame. Toute tentative de triche (macros, speedhack) entraînera un bannissement définitif.</p>
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
                        <FormItem><FormLabel>Pseudo Ingame</FormLabel><FormControl><Input placeholder="ex: Nexus" className="gold-border" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={recordForm.control} name="levelId" render={({ field }) => (
                        <FormItem><FormLabel>ID du Niveau (Liste)</FormLabel><FormControl><Input placeholder="L'ID list du niveau" className="gold-border" {...field} /></FormControl></FormItem>
                      )} />
                    </div>
                    <FormField control={recordForm.control} name="videoUrl" render={({ field }) => (
                      <FormItem><FormLabel>Lien de la Preuve Vidéo (Impératif)</FormLabel><FormControl><Input placeholder="https://youtube.com/..." className="gold-border" {...field} /></FormControl></FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField control={recordForm.control} name="fps" render={({ field }) => (
                        <FormItem><FormLabel>FPS</FormLabel><FormControl><Input type="number" className="gold-border" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={recordForm.control} name="platform" render={({ field }) => (
                        <FormItem><FormLabel>Plateforme</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="gold-border"><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent><SelectItem value="PC">PC</SelectItem><SelectItem value="Mobile">Mobile</SelectItem></SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                      <FormField control={recordForm.control} name="spamType" render={({ field }) => (
                        <FormItem><FormLabel>Style de Spam</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger className="gold-border"><SelectValue /></SelectTrigger></FormControl>
                            <SelectContent>
                              {['Butterfly', 'Jitter', 'Alternating', 'Rake', 'Lip Spam'].map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )} />
                    </div>
                    <Button type="submit" className="w-full h-14 bg-primary text-black font-black text-xl hover:scale-[1.01] transition-all">Envoyer le Record <Send className="ml-2 h-5 w-5" /></Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="level">
             <Card className="bg-card/50 gold-border">
              <CardContent className="pt-8">
                <Form {...levelForm}>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={levelForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Nom du Niveau</FormLabel><FormControl><Input placeholder="ex: Ultra Spam v3" className="gold-border" {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={levelForm.control} name="creator" render={({ field }) => (
                        <FormItem><FormLabel>Créateur</FormLabel><FormControl><Input placeholder="Nom du créateur" className="gold-border" {...field} /></FormControl></FormItem>
                      )} />
                    </div>
                    <FormField control={levelForm.control} name="videoProof" render={({ field }) => (
                      <FormItem><FormLabel>Preuve de Vérification</FormLabel><FormControl><Input placeholder="Lien YouTube" className="gold-border" {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={levelForm.control} name="description" render={({ field }) => (
                      <FormItem><FormLabel>Description Technique</FormLabel><FormControl><Textarea placeholder="Précisez les mécaniques de spam..." className="gold-border" {...field} /></FormControl></FormItem>
                    )} />
                    <Button type="button" className="w-full h-14 bg-secondary text-black font-black text-xl">Proposer à l'Élite <PlusCircle className="ml-2 h-5 w-5" /></Button>
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