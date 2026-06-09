import { Level } from "./types";

export const MOCK_LEVELS: Level[] = [
  {
    id: "1",
    levelId: "12345678",
    name: "Ultra Spam v2",
    creator: "SpamMasterFR",
    difficulty: 100,
    completionPercent: 5,
    videoProof: "https://youtube.com/watch?v=example1",
    description: "Un défi de spam intense sur 10 secondes qui teste la rapidité pure.",
    averageRating: 85,
    ratings: [
      { id: "r1", rating: 90, comment: "Incroyable fluidité !", timestamp: Date.now() },
    ],
    records: [
      { id: "rec1", playerName: "Nexus", videoUrl: "https://youtube.com", timestamp: Date.now(), status: 'approved' },
      { id: "rec2", playerName: "Diamond", videoUrl: "https://youtube.com", timestamp: Date.now(), status: 'approved' }
    ],
    status: "approved"
  },
  {
    id: "2",
    levelId: "87654321",
    name: "Wave Clicker",
    creator: "Cliquos",
    difficulty: 85,
    completionPercent: 3,
    videoProof: "https://youtube.com/watch?v=example2",
    description: "Le spam de wave le plus dur de France. Attention aux tendons.",
    averageRating: 92,
    ratings: [],
    records: [],
    status: "approved"
  }
];

export const MOCK_PLAYERS = [
  { rank: 1, name: "Nexus", points: 1540, completions: 42 },
  { rank: 2, name: "Diamond", points: 1210, completions: 38 },
  { rank: 3, name: "SpamGod", points: 980, completions: 25 },
];