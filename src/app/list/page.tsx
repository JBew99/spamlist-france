"use client";

import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MOCK_LEVELS } from "@/app/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Play, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function ListPage() {
  const [search, setSearch] = useState("");
  
  const filteredLevels = MOCK_LEVELS.filter(level => 
    level.name.toLowerCase().includes(search.toLowerCase()) ||
    level.creator.toLowerCase().includes(search.toLowerCase()) ||
    level.levelId.includes(search)
  ).sort((a, b) => b.difficulty - a.difficulty);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2 neon-text">La Spam List</h1>
            <p className="text-muted-foreground">Classement officiel des défis de spam en France.</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher par ID, Nom ou Créateur..." 
                className="pl-10 border-primary/20 bg-card focus-visible:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="border-primary/20">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredLevels.map((level, index) => (
            <Link key={level.id} href={`/level/${level.id}`}>
              <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-[0_0_20px_rgba(255,77,222,0.15)]">
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    <span className="text-3xl font-black text-muted-foreground/30 group-hover:text-primary transition-colors">#{index + 1}</span>
                  </div>

                  {/* Image/Thumbnail */}
                  <div className="hidden sm:block relative h-20 w-36 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                    <Image 
                      src={`https://picsum.photos/seed/list-${level.id}/200/120`} 
                      alt={level.name} 
                      fill 
                      className="object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold truncate">{level.name}</h3>
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary border-none">{level.difficulty} pts</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">par <span className="text-foreground font-medium">{level.creator}</span> • ID: {level.levelId}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Star className="h-3 w-3 mr-1 text-yellow-500 fill-yellow-500" />
                        {level.averageRating}% Enjoyment
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Play className="h-3 w-3 mr-1 text-primary" />
                        List%: {level.completionPercent}%
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex-shrink-0">
                    <Button variant="ghost" size="icon" className="group-hover:text-primary transition-colors">
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filteredLevels.length === 0 && (
            <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
              <p className="text-muted-foreground">Aucun niveau trouvé pour votre recherche.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}