"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const submissionSchema = z.object({
  levelId: z.string().min(6, "ID de niveau invalide"),
  name: z.string().min(2, "Nom trop court"),
  creator: z.string().min(2, "Nom du créateur requis"),
  completionPercent: z.coerce.number().min(1).max(100),
  videoProof: z.string().url("Veuillez entrer un lien vidéo valide (YouTube/Twitch)"),
  description: z.string().max(500, "Description trop longue"),
  enjoyment: z.number().min(0).max(100),
});

export default function SubmitPage() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      levelId: "",
      name: "",
      creator: "",
      completionPercent: 0,
      videoProof: "",
      description: "",
      enjoyment: 50,
    },
  });

  function onSubmit(values: z.infer<typeof submissionSchema>) {
    console.log(values);
    setIsSubmitted(true);
    toast({
      title: "Soumission réussie !",
      description: "Votre niveau a été envoyé pour révision par les administrateurs.",
    });
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center border-primary shadow-lg animate-in fade-in slide-in-from-bottom-4">
            <CardContent className="pt-10 pb-10 flex flex-col items-center">
              <CheckCircle2 className="h-16 w-16 text-primary mb-4 animate-bounce" />
              <h2 className="text-2xl font-bold mb-2">Merci pour votre soumission !</h2>
              <p className="text-muted-foreground mb-6">Un modérateur va examiner votre niveau très prochainement.</p>
              <Button onClick={() => setIsSubmitted(false)} className="bg-primary">Soumettre un autre niveau</Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary neon-text mb-2">Soumettre un Niveau</h1>
          <p className="text-muted-foreground">Remplissez ce formulaire pour ajouter un défi à la liste officielle.</p>
        </div>

        <Card className="bg-card border-border overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-primary">Détails du Challenge</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="levelId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID du Niveau (Geometry Dash)</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: 12345678" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="completionPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>List% (Completion)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="ex: 100" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du Niveau</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Sonic Wave Spam" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="creator"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Créateur</FormLabel>
                        <FormControl>
                          <Input placeholder="ex: Riot" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="videoProof"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lien de Preuve Vidéo (YouTube/Twitch)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." {...field} className="bg-background" />
                      </FormControl>
                      <FormDescription>La vidéo doit montrer l'exécution du spam clairement.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="enjoyment"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex justify-between">
                        <FormLabel>Enjoyment Rating (0-100)</FormLabel>
                        <span className="font-bold text-secondary">{field.value}%</span>
                      </div>
                      <FormControl>
                        <Slider 
                          defaultValue={[50]} 
                          max={100} 
                          step={1} 
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description / Commentaires additionnels</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Parlez-nous de ce niveau..." 
                          className="min-h-[100px] bg-background"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90">
                  Envoyer Soumission <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}