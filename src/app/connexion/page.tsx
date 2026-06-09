
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
  createUserWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { LogIn, UserPlus, Chrome, ShieldCheck, Loader2, X } from "lucide-react";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const handleProviderLogin = async (provider: any) => {
    if (!auth || !firestore) return;
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userDoc = await getDoc(doc(firestore, "users", user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(firestore, "users", user.uid), {
          name: user.displayName || "Spammeur Elite",
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
      
      toast({ title: "Accès autorisé", description: `Bienvenue dans l'Elite, ${user.displayName || 'Spammeur'} !` });
      router.push("/");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur d'accès", description: "La connexion a échoué." });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Connexion réussie", description: "Ravi de vous revoir." });
      router.push("/");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: "Identifiants invalides." });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth || !firestore) return;
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!passwordRegex.test(password)) {
      toast({ 
        variant: "destructive", 
        title: "Mot de passe non conforme", 
        description: "Il faut 8 caractères min, 1 majuscule et 1 symbole." 
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
      toast({ title: "Compte créé !", description: "Votre légende commence ici." });
      router.push("/");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: "Cet email est déjà utilisé." });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!auth || !email) {
      toast({ variant: "destructive", title: "Email requis", description: "Entrez votre email pour réinitialiser." });
      return;
    }
    setResetLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast({ title: "Email envoyé", description: "Vérifiez votre boîte mail." });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erreur", description: "Impossible d'envoyer l'email." });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center p-6 bg-black/40">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-5xl font-black gold-text uppercase tracking-tighter mb-2">Accès Elite</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Forge ton prestige sur la SpamList</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid grid-cols-2 h-16 bg-muted/50 gold-border p-1 rounded-2xl mb-8">
              <TabsTrigger value="login" className="gap-2 text-lg data-[state=active]:bg-primary data-[state=active]:text-black"><LogIn className="h-5 w-5" /> Connexion</TabsTrigger>
              <TabsTrigger value="register" className="gap-2 text-lg data-[state=active]:bg-primary data-[state=active]:text-black"><UserPlus className="h-5 w-5" /> Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="bg-card/50 gold-border border-t-4 border-t-primary">
                <CardContent className="pt-8 space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="gold-border bg-background/50 h-12" />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="password">Mot de passe</Label>
                        <button onClick={handleResetPassword} className="text-[10px] uppercase font-black text-primary hover:underline">
                          Mot de passe oublié ?
                        </button>
                      </div>
                      <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="gold-border bg-background/50 h-12" />
                    </div>
                  </div>
                  <Button onClick={handleEmailLogin} disabled={loading} className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest text-lg shadow-lg shadow-primary/20">
                    {loading ? <Loader2 className="animate-spin" /> : "Se Connecter"}
                  </Button>
                </CardContent>
                <CardFooter className="flex flex-col gap-6">
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black text-muted-foreground"><span className="bg-card/50 px-2">Ou continuer avec</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" onClick={() => handleProviderLogin(new GoogleAuthProvider())} className="gold-border h-12 gap-2 hover:bg-primary/5 transition-colors"><Chrome className="h-4 w-4" /> Google</Button>
                    <Button variant="outline" onClick={() => handleProviderLogin(new TwitterAuthProvider())} className="gold-border h-12 gap-2 hover:bg-primary/5 transition-colors"><XLogo /> X (Twitter)</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card className="bg-card/50 gold-border border-t-4 border-t-primary">
                <CardContent className="pt-8 space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="reg-username">Pseudo Geometry Dash</Label>
                      <Input id="reg-username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ex: Nexus" className="gold-border bg-background/50 h-12" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reg-email">Email</Label>
                      <Input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" className="gold-border bg-background/50 h-12" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reg-password">Mot de passe</Label>
                      <Input id="reg-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="gold-border bg-background/50 h-12" />
                      <p className="text-[10px] text-muted-foreground italic px-1">🔒 8+ carac, 1 majuscule, 1 symbole requis.</p>
                    </div>
                  </div>
                  <Button onClick={handleEmailRegister} disabled={loading} className="w-full h-14 bg-primary text-black font-black uppercase tracking-widest text-lg shadow-lg shadow-primary/20">
                    {loading ? <Loader2 className="animate-spin" /> : "Rejoindre l'Elite"}
                  </Button>
                </CardContent>
                <CardFooter className="flex flex-col gap-6">
                   <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
                    <div className="relative flex justify-center text-[10px] uppercase font-black text-muted-foreground"><span className="bg-card/50 px-2">Ou s'inscrire via</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" onClick={() => handleProviderLogin(new GoogleAuthProvider())} className="gold-border h-12 gap-2"><Chrome className="h-4 w-4" /> Google</Button>
                    <Button variant="outline" onClick={() => handleProviderLogin(new TwitterAuthProvider())} className="gold-border h-12 gap-2"><XLogo /> X (Twitter)</Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-center gap-3 text-muted-foreground p-5 bg-primary/5 rounded-2xl border border-primary/20">
            <ShieldCheck className="h-5 w-5 text-primary" />
            <p className="text-[11px] uppercase font-black tracking-widest text-center">Sécurisé par le Système Pulse IA</p>
          </div>
        </div>
      </main>
    </div>
  );
}
