
"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth, useFirestore } from "@/firebase";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  TwitterAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, Github, Twitter, Chrome, ShieldCheck } from "lucide-react";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleProviderLogin = async (provider: any) => {
    if (!auth || !firestore) return;
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName || "Spammeur Inconnu",
          email: user.email,
          points: 0,
          completions: 0,
          tier: "Bronze",
          trustScore: 50,
          platform: "PC",
          bestSpamType: "Alternating",
          progression: [{ date: Date.now(), points: 0 }]
        });
      }
      
      toast({ title: "Connexion réussie", description: `Bienvenue, ${user.displayName} !` });
      router.push("/");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: error.message });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Content de vous revoir !" });
      router.push("/");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur de connexion", description: "Identifiants invalides." });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !firestore) return;
    
    // Validation mot de passe
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      toast({ 
        variant: "destructive", 
        title: "Mot de passe trop faible", 
        description: "8 caractères min, 1 majuscule et 1 caractère spécial requis." 
      });
      return;
    }

    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", result.user.uid), {
        name: username || "Nouvel Elite",
        email: email,
        points: 0,
        completions: 0,
        tier: "Bronze",
        trustScore: 50,
        platform: "PC",
        bestSpamType: "Alternating",
        progression: [{ date: Date.now(), points: 0 }]
      });
      toast({ title: "Compte créé !", description: "Bienvenue dans l'Elite." });
      router.push("/");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur d'inscription", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-6 bg-black/20">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-black gold-text uppercase tracking-tighter mb-2">Accès Elite</h1>
            <p className="text-muted-foreground text-sm">Connectez-vous pour forger votre prestige.</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 h-14 bg-muted/50 gold-border p-1 rounded-2xl mb-8">
              <TabsTrigger value="login" className="gap-2"><LogIn className="h-4 w-4" /> Connexion</TabsTrigger>
              <TabsTrigger value="register" className="gap-2"><UserPlus className="h-4 w-4" /> Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-card/50 gold-border backdrop-blur">
                <CardContent className="pt-8 space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email ou Nom d'utilisateur</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="gold-border bg-background" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Mot de passe</Label>
                      <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="gold-border bg-background" />
                    </div>
                  </div>
                  <Button onClick={handleEmailLogin} disabled={loading} className="w-full h-12 bg-primary text-black font-black uppercase tracking-widest">
                    {loading ? "Connexion..." : "Se Connecter"}
                  </Button>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black text-muted-foreground"><span className="bg-background px-2">Ou continuer avec</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" onClick={() => handleProviderLogin(new GoogleAuthProvider())} className="gold-border gap-2"><Chrome className="h-4 w-4" /> Google</Button>
                    <Button variant="outline" onClick={() => handleProviderLogin(new TwitterAuthProvider())} className="gold-border gap-2"><Twitter className="h-4 w-4" /> X (Twitter)</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="bg-card/50 gold-border backdrop-blur">
                <CardContent className="pt-8 space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="reg-username">Nom d'utilisateur GD</Label>
                      <Input id="reg-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nexus" className="gold-border bg-background" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="gold-border bg-background" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reg-password">Mot de passe</Label>
                      <Input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="gold-border bg-background" />
                      <p className="text-[10px] text-muted-foreground italic">8+ caractères, 1 majuscule, 1 symbole.</p>
                    </div>
                  </div>
                  <Button onClick={handleEmailRegister} disabled={loading} className="w-full h-12 bg-secondary text-black font-black uppercase tracking-widest">
                    {loading ? "Création..." : "Créer mon Compte"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-center gap-2 text-muted-foreground p-4 bg-primary/5 rounded-xl border border-primary/20">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <p className="text-[10px] uppercase font-bold tracking-widest">Sécurité Pulse AI Active</p>
          </div>
        </div>
      </main>
    </div>
  );
}
