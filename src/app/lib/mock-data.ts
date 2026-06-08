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
    description: "Un défi de spam intense sur 10 secondes.",
    averageRating: 85,
    ratings: [
      { id: "r1", rating: 90, comment: "Incroyable fluidité !", timestamp: Date.now() },
      { id: "r2", rating: 80, comment: "Un peu répétitif mais solide.", timestamp: Date.now() }
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
    description: "Le spam de wave le plus dur de France.",
    averageRating: 92,
    ratings: [
      { id: "r3", rating: 95, comment: "Le meilleur niveau de la liste.", timestamp: Date.now() }
    ],
    status: "approved"
  },
  {
    id: "3",
    levelId: "11223344",
    name: "Finger Breaker",
    creator: "NoobGD",
    difficulty: 45,
    completionPercent: 10,
    videoProof: "https://youtube.com/watch?v=example3",
    description: "Pour les débutants qui veulent s'entraîner.",
    averageRating: 70,
    ratings: [],
    status: "approved"
  }
];