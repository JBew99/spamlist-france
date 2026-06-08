export type LevelStatus = 'pending' | 'approved' | 'rejected';

export interface LevelRating {
  id: string;
  rating: number; // 0-100
  comment: string;
  timestamp: number;
}

export interface Level {
  id: string; // Internal unique ID
  levelId: string; // Geometry Dash ID
  name: string;
  creator: string;
  difficulty: number; // Points or relative difficulty
  completionPercent: number; // list%
  videoProof: string;
  description: string;
  averageRating: number;
  ratings: LevelRating[];
  status: LevelStatus;
}

export interface Submission {
  id: string;
  levelId: string;
  name: string;
  creator: string;
  completionPercent: number;
  videoProof: string;
  description: string;
  initialEnjoyment: number;
  status: LevelStatus;
  timestamp: number;
}