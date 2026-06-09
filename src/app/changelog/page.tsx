"use client";

import { Navigation } from "@/components/Navigation";
import { MOCK_CHANGELOG } from "@/app/lib/mock-data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { History, CheckCircle2 } from "lucide-react";

export default function ChangelogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-16">
          <div className="p-4 bg-primary/10 rounded-2xl"><History className="h-10 w-10 text-primary" /></div>
          <div>
            <h1 className="text-5xl font-black silver-text uppercase tracking-tighter">Changelog</h1>
            <p className="text-muted-foreground">Historique des évolutions de la plateforme.</p>
          </div>
        </div>

        <div className="space-y-12">
          {MOCK_CHANGELOG.map((entry) => (
            <div key={entry.id} className="relative pl-8 border-l-2 border-primary/20">
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary gold-border shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
              <div className="mb-2 text-sm font-bold text-primary">{new Date(entry.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              <Card className="bg-card/40 gold-border">
                <CardHeader><CardTitle className="text-2xl font-black gold-text">{entry.title}</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {entry.changes.map((change, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}