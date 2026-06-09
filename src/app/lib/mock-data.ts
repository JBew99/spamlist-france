
import { Level, PlayerStats, Clan, LevelPack, ChangelogEntry } from "./types";

/**
 * MODIFIE CES DONNÉES POUR CHANGER LE CONTENU DU SITE
 * C'est ici que tu peux ajouter tes propres niveaux et clans.
 */

export const MOCK_LEVELS: Level[] = [
  {
    id: "lvl-1",
    levelId: "12345678",
    name: "Ultra Spam v2",
    creator: "SpamMasterFR",
    difficulty: 100,
    completionPercent: 5,
    videoProof: "https://youtube.com",
    description: "Le défi ultime pour tester votre vitesse Butterfly sur PC.",
    averageRating: 85,
    ratings: [],
    records: [],
    status: "approved",
    minFps: 60,
    verifier: "Nexus",
    spamType: "Butterfly"
  },
  {
    id: "lvl-2",
    levelId: "87654321",
    name: "Wave Clicker",
    creator: "Cliquos",
    difficulty: 85,
    completionPercent: 3,
    videoProof: "https://youtube.com",
    description: "Une vague technique qui demande un Alternate parfait.",
    averageRating: 92,
    ratings: [],
    records: [],
    status: "approved",
    minFps: 144,
    verifier: "Diamond",
    spamType: "Alternating"
  },
  {
    id: "lvl-3",
    levelId: "11223344",
    name: "Jitter Madness",
    creator: "EliteFR",
    difficulty: 120,
    completionPercent: 10,
    videoProof: "https://youtube.com",
    description: "Du pur jitter pour les vrais.",
    averageRating: 75,
    ratings: [],
    records: [],
    status: "approved",
    minFps: 240,
    verifier: "SpamGod",
    spamType: "Jitter"
  }
];

export const MOCK_PLAYERS: Partial<PlayerStats>[] = [
  { id: "p-1", name: "Nexus", points: 2500, completions: 45, rank: 1, tier: "Élite", platform: "PC", bestSpamType: "Butterfly", trustScore: 98 },
  { id: "p-2", name: "Diamond", points: 2100, completions: 38, rank: 2, tier: "Diamant", platform: "PC", bestSpamType: "Alternating", trustScore: 95 },
  { id: "p-3", name: "SpamGod", points: 1850, completions: 30, rank: 3, tier: "Diamant", platform: "Mobile", bestSpamType: "Jitter", trustScore: 92 },
  { id: "p-4", name: "Cliquos", points: 1500, completions: 25, rank: 4, tier: "Platine", platform: "PC", bestSpamType: "Rake", trustScore: 88 },
];

export const MOCK_CLANS: Clan[] = [
  { id: "clan-1", name: "Spam Elites France", tag: "SEF", points: 2750, rank: 1, membersCount: 12, description: "Le clan numéro 1 en France." },
  { id: "clan-2", name: "Click Masters", tag: "CM", points: 1420, rank: 2, membersCount: 8, description: "La précision avant tout." },
  { id: "clan-3", name: "60Hz Legends", tag: "60L", points: 890, rank: 3, membersCount: 5, description: "Rien ne nous arrête." },
];

export const MOCK_PACKS: LevelPack[] = [
  { id: "pack-1", name: "Le Pack du Débutant", levels: ["lvl-1", "lvl-2"], rewardPoints: 50, description: "Prouvez vos bases." },
  { id: "pack-2", name: "Expert Spam Series", levels: ["lvl-3"], rewardPoints: 120, description: "Pour les mains d'acier." },
  { id: "pack-3", name: "Mobile Only Challenge", levels: ["lvl-2"], rewardPoints: 80, description: "Dominez sur écran tactile." },
  { id: "pack-4", name: "PC Master Collection", levels: ["lvl-1", "lvl-3"], rewardPoints: 200, description: "La trilogie ultime." },
  { id: "pack-5", name: "Extreme Spam Gauntlet", levels: ["lvl-1"], rewardPoints: 300, description: "Le défi le plus dur." },
];

export const MOCK_CHANGELOG: ChangelogEntry[] = [
  { id: "ch-1", date: Date.now(), title: "V2.1 : L'Ere du Prestige", changes: ["Auth Google & X", "Système de Rangs dynamiques", "Graphiques de progression", "Filtres avancés Hz/Style"] },
];
