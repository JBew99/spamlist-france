"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MOCK_LEVELS } from "@/app/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Play, Star, ChevronRight, Monitor, Smartphone, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ListPage() {
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState<string>("all");
  const [fps, setFps] = useState<string>("all");
  const [spamType, setSpamType] = useState<string>("all");

  const filteredLevels = MOCK_LEVELS.filter(level => {
    const matchesSearch = level.name.toLowerCase().includes(search.toLowerCase()) ||
                          level.creator.toLowerCase().includes(search.toLowerCase()) ||
                          level.levelId.includes(search);
    const matchesFps = fps === "all" || level.minFps >= parseInt(fps);
    const matchesSpamType = spamType === "all" || level.spamType === spamType;
    
    return matchesSearch && matchesFps && matchesSpamType;
  }).sort((a, b) => b.difficulty - a.difficulty);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <h1 className="text-4xl font-black text-primary mb-2 gold-text">Archives de la Liste</h1>
            <p className="text-muted-foreground">Classement technique de l'élite française.</p>
          </div>
          
          <div className="grid grid-cols-2 md:flex items-center gap-3 w-full md:w-auto">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher..." 
                className="pl-10 gold-border bg-card"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <Select onValueChange={setFps} defaultValue="all">
              <SelectTrigger className="w-full md:w-[120px] gold-border bg-card">
                <SelectValue placeholder="FPS" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous FPS</SelectItem>
                <SelectItem value="60">60+</SelectItem>
                <SelectItem value="144">144+</SelectItem>
                <SelectItem value="240">240+</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setSpamType} defaultValue="all">
              <SelectTrigger className="w-full md:w-[160px] gold-border bg-card">
                <SelectValue placeholder="Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous Styles</SelectItem>
                <SelectItem value="Butterfly">Butterfly</SelectItem>
                <SelectItem value="Jitter">Jitter</SelectItem>
                <SelectItem value="Alternating">Alternating</SelectItem>
                <SelectItem value="Rake">Rake</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredLevels.map((level, index) => (
            <Link key={level.id} href={`/level/${level.id}`}>
              <div className="group relative overflow-hidden rounded-xl border border-border bg-card/50 p-5 transition-all hover:gold-border hover:shadow-[0_0_20px_rgba(250,204,21,0.1)]">
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0 w-12 text-center">
                    <span className="text-4xl font-black text-muted-foreground/20 group-hover:gold-text transition-colors">#{index + 1}</span>
                  </div>

                  <div className="hidden sm:block relative h-24 w-44 rounded-xl overflow-hidden flex-shrink-0 border border-border">
                    <Image 
                      src={`https://picsum.photos/seed/list-${level.id}/400/240`} 
                      alt={level.name} 
                      fill 
                      className="object-cover transition-all group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-black silver-text truncate">{level.name}</h3>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{level.difficulty} PTS</Badge>
                      <Badge variant="outline" className="text-[10px] uppercase">{level.spamType}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                      par <span className="text-foreground font-bold silver-text">{level.creator}</span> • {level.minFps}FPS Requis
                    </p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Monitor className="h-3.5 w-3.5 mr-1 text-primary" /> PC / Mobile
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Zap className="h-3.5 w-3.5 mr-1 text-primary" /> {level.completionPercent}% List
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Button variant="ghost" size="icon" className="group-hover:text-primary">
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}