import { Level, PlayerStats, Clan, LevelPack, ChangelogEntry } from "./types";

export const MOCK_LEVELS: Level[] = [
  {
    id: "1",
    levelId: "12345678",
    name: "Ultra Spam v2",
    creator: "SpamMasterFR",
    difficulty: 100,
    completionPercent: 5,
    videoProof: "https://youtube.com/watch?v=example1",
    description: "Un défi de spam intense sur 10 secondes.",
    averageRating: 85,
    ratings: [],
    records: [
      { id: "rec1", playerName: "Nexus", videoUrl: "https://youtube.com", timestamp: Date.now(), status: 'approved', fps: 240, platform: 'PC', spamType: 'Butterfly' }
    ],
    status: "approved",
    minFps: 60,
    verifier: "Nexus",
    spamType: "Butterfly"
  },
  {
    id: "2",
    levelId: "87654321",
    name: "Wave Clicker",
    creator: "Cliquos",
    difficulty: 85,
    completionPercent: 3,
    videoProof: "https://youtube.com/watch?v=example2",
    description: "Spam de wave technique.",
    averageRating: 92,
    ratings: [],
    records: [],
    status: "approved",
    minFps: 144,
    verifier: "Diamond",
    spamType: "Alternating"
  }
];

export const MOCK_PLAYERS: PlayerStats[] = [
  { id: "p1", rank: 1, name: "Nexus", points: 1540, completions: 42, bestSpamType: 'Butterfly', platform: 'PC', clanId: 'c1' },
  { id: "p2", rank: 2, name: "Diamond", points: 1210, completions: 38, bestSpamType: 'Alternating', platform: 'PC', clanId: 'c1' },
  { id: "p3", rank: 3, name: "SpamGod", points: 980, completions: 25, bestSpamType: 'Jitter', platform: 'Mobile' },
];

export const MOCK_CLANS: Clan[] = [
  { id: "c1", name: "Spam Elites France", tag: "SEF", points: 2750, members: 12, description: "Le clan numéro 1 en France.", rank: 1 },
  { id: "c2", name: "Click Masters", tag: "CM", points: 1420, members: 8, description: "La précision avant tout.", rank: 2 },
];

export const MOCK_PACKS: LevelPack[] = [
  { id: "pk1", name: "Le Pack du Débutant", levels: ["1", "2"], rewardPoints: 50, description: "Complétez ces deux niveaux pour prouver vos bases." },
  { id: "pk2", name: "Vitesse Pure", levels: ["1"], rewardPoints: 100, description: "Uniquement pour les doigts les plus rapides." },
];

export const MOCK_CHANGELOG: ChangelogEntry[] = [
  { id: "ch1", date: Date.now(), title: "Mise à jour Prestige", changes: ["Ajout du système de clans", "Nouveaux filtres FPS", "Refonte des profils"] },
];