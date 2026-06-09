
import { Level, PlayerStats, Clan, LevelPack, ChangelogEntry, ActivityItem } from "./types";

export const MOCK_ACTIVITIES: ActivityItem[] = [
  { id: "act1", type: 'completion', title: "Record Validé", description: "Nexus a vaincu Ultra Spam v2", timestamp: Date.now() - 3600000, userId: "p1", userName: "Nexus" },
  { id: "act2", type: 'rank_up', title: "Promotion", description: "Diamond est passé au rang Diamant", timestamp: Date.now() - 7200000, userId: "p2", userName: "Diamond" },
  { id: "act3", type: 'completion', title: "Nouveau Victor", description: "SpamGod a complété Wave Clicker", timestamp: Date.now() - 10800000, userId: "p3", userName: "SpamGod" },
];

export const MOCK_LEVELS: Level[] = [
  {
    id: "lvl-1",
    levelId: "12345678",
    name: "Ultra Spam v2",
    creator: "SpamMasterFR",
    difficulty: 100,
    completionPercent: 5,
    videoProof: "https://youtube.com/watch?v=example1",
    description: "Le défi ultime pour tester votre vitesse Butterfly sur PC.",
    averageRating: 85,
    ratings: [],
    records: [
      { id: "rec1", levelId: "lvl-1", playerName: "Nexus", videoUrl: "https://youtube.com", timestamp: Date.now(), status: 'approved', fps: 240, platform: 'PC', spamType: 'Butterfly', pointsEarned: 100 }
    ],
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
    videoProof: "https://youtube.com/watch?v=example2",
    description: "Une vague technique qui demande un Alternate parfait à 144Hz.",
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
    name: "Butterfly Heaven",
    creator: "EliteClick",
    difficulty: 70,
    completionPercent: 2,
    videoProof: "https://youtube.com/watch?v=example3",
    description: "Un paradis pour les spécialistes du Butterfly. Stable et fluide.",
    averageRating: 78,
    ratings: [],
    records: [],
    status: "approved",
    minFps: 60,
    verifier: "SpamGod",
    spamType: "Butterfly"
  }
];

export const MOCK_PLAYERS: PlayerStats[] = [
  { id: "p1", rank: 1, tier: 'Élite', name: "Nexus", points: 1540, completions: 42, bestSpamType: 'Butterfly', platform: 'PC', clanId: 'clan-1', trustScore: 98, history: [] },
  { id: "p2", rank: 2, tier: 'Diamant', name: "Diamond", points: 1210, completions: 38, bestSpamType: 'Alternating', platform: 'PC', clanId: 'clan-1', trustScore: 95, history: [] },
  { id: "p3", rank: 3, tier: 'Or', name: "SpamGod", points: 980, completions: 25, bestSpamType: 'Jitter', platform: 'Mobile', trustScore: 75, history: [] },
];

export const MOCK_CLANS: Clan[] = [
  { id: "clan-1", name: "Spam Elites France", tag: "SEF", points: 2750, rank: 1, membersCount: 12, description: "Le clan numéro 1 en France. Excellence requise." },
  { id: "clan-2", name: "Click Masters", tag: "CM", points: 1420, rank: 2, membersCount: 8, description: "La précision avant tout. Entraînement quotidien." },
  { id: "clan-3", name: "The 60Hz Legend", tag: "60L", points: 890, rank: 3, membersCount: 5, description: "Les rois du low refresh rate." },
];

export const MOCK_PACKS: LevelPack[] = [
  { id: "pack-1", name: "Le Pack du Débutant", levels: ["lvl-1", "lvl-2"], rewardPoints: 50, description: "Complétez ces deux niveaux pour prouver vos bases." },
  { id: "pack-2", name: "Expert Spam Series", levels: ["lvl-1", "lvl-3"], rewardPoints: 120, description: "Une série pour les joueurs confirmés." },
  { id: "pack-3", name: "Mobile Only Challenge", levels: ["lvl-2"], rewardPoints: 80, description: "Prouvez que vous pouvez dominer sur écran tactile." },
  { id: "pack-4", name: "PC Master Collection", levels: ["lvl-1", "lvl-2", "lvl-3"], rewardPoints: 200, description: "La trilogie ultime pour les joueurs PC." },
  { id: "pack-5", name: "Extreme Spam Gauntlet", levels: ["lvl-1"], rewardPoints: 300, description: "Le défi le plus dur de la liste." },
];

export const MOCK_CHANGELOG: ChangelogEntry[] = [
  { id: "ch-1", date: Date.now(), title: "V2.0 : L'Ere de la Compétition", changes: ["Système de Rangs (Bronze -> Élite)", "Trust Score pour les soumissions", "Fil d'activité temps réel", "Optimisation de l'équilibrage des points"] },
];
