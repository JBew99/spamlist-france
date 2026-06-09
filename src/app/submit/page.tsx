"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, Trophy, PlusCircle } from "lucide-react";

const levelSchema = z.object({
  levelId: z.string().min(6, "ID invalide"),
  name: z.string().min(2, "Nom trop court"),
  creator: z.string().min(2, "Créateur requis"),
  videoProof: z.string().url("URL invalide"),
  description: z.string().max(500),
});

const recordSchema = z.object({
  levelId: z.string().min(6, "ID du niveau requis"),
  playerName: z.string().min(2, "Votre pseudo"),
  videoUrl: z.string().url("Lien vidéo de votre exploit"),
});

export default function SubmitPage() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const levelForm = useForm<z.infer<typeof levelSchema>>({
    resolver: zodResolver(levelSchema),
    defaultValues: { levelId: "", name: "", creator: "", videoProof: "", description: "" },
  });

  const recordForm = useForm<z.infer<typeof recordSchema>>({
    resolver: zodResolver(recordSchema),
    defaultValues: { levelId: "", playerName: "", videoUrl: "" },
  });

  const onLevelSubmit = (values: any) => {
    console.log("Level Submission:", values);
    setIsSubmitted(true);
    toast({ title: "Niveau envoyé !", description: "Les modérateurs vont l'étudier." });
  };

  const onRecordSubmit = (values: any) => {
    console.log("Record Submission:", values);
    setIsSubmitted(true);
    toast({ title: "Record envoyé !", description: "Votre complétion est en cours de vérification." });
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center border-primary/50 shadow-2xl bg-card">
            <CardContent className="pt-10 pb-10 flex flex-col items-center">
              <CheckCircle2 className="h-20 w-20 text-primary mb-4 animate-pulse" />
              <h2 className="text-3xl font-bold gold-text mb-2">Soumission Reçue</h2>
              <p className="text-muted-foreground mb-6">Merci de contribuer à l'élite du spam français. Votre preuve est entre de bonnes mains.</p>
              <Button onClick={() => setIsSubmitted(false)} className="bg-primary hover:scale-105 transition-transform">Faire une autre soumission</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-black gold-text mb-4">Portail de Soumission</h1>
          <p className="text-muted-foreground text-lg">Proposez un nouveau défi ou prouvez votre valeur sur un niveau existant.</p>
        </div>

        <Tabs defaultValue="record" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-16 bg-muted/50 p-1 rounded-xl gold-border mb-8">
            <TabsTrigger value="record" className="text-lg flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-black">
              <Trophy className="h-5 w-5" /> Nouveau Record
            </TabsTrigger>
            <TabsTrigger value="level" className="text-lg flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-black">
              <PlusCircle className="h-5 w-5" /> Proposer un Niveau
            </TabsTrigger>
          </TabsList>

          <TabsContent value="record">
            <Card className="bg-card border-border shadow-xl">
              <CardHeader>
                <CardTitle className="silver-text uppercase tracking-widest text-sm">Complétion de Niveau</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...recordForm}>
                  <form onSubmit={recordForm.handleSubmit(onRecordSubmit)} className="space-y-6">
                    <FormField control={recordForm.control} name="playerName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pseudo (Ingame)</FormLabel>
                        <FormControl><Input placeholder="Votre nom GD" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={recordForm.control} name="levelId" render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID du Niveau</FormLabel>
                          <FormControl><Input placeholder="ex: 12345678" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={recordForm.control} name="videoUrl" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lien Vidéo (YT/Twitch)</FormLabel>
                          <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <Button type="submit" className="w-full h-14 text-lg bg-primary hover:bg-primary/90">Envoyer le Record <Send className="ml-2 h-5 w-5" /></Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="level">
            <Card className="bg-card border-border shadow-xl">
              <CardHeader>
                <CardTitle className="silver-text uppercase tracking-widest text-sm">Nouveau Challenge pour la Liste</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...levelForm}>
                  <form onSubmit={levelForm.handleSubmit(onLevelSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={levelForm.control} name="name" render={({ field }) => (
                        <FormItem><FormLabel>Nom du Niveau</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                      <FormField control={levelForm.control} name="creator" render={({ field }) => (
                        <FormItem><FormLabel>Créateur</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                      )} />
                    </div>
                    <FormField control={levelForm.control} name="levelId" render={({ field }) => (
                      <FormItem><FormLabel>ID GD</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={levelForm.control} name="videoProof" render={({ field }) => (
                      <FormItem><FormLabel>Vidéo de Preuve (Verification)</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
                    )} />
                    <FormField control={levelForm.control} name="description" render={({ field }) => (
                      <FormItem><FormLabel>Commentaires</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>
                    )} />
                    <Button type="submit" className="w-full h-14 text-lg bg-primary hover:bg-primary/90">Soumettre à la Liste <PlusCircle className="ml-2 h-5 w-5" /></Button>
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