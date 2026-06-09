export type LevelStatus = 'pending' | 'approved' | 'rejected';

export interface LevelRating {
  id: string;
  rating: number; // 0-100
  comment: string;
  timestamp: number;
}

export interface Record {
  id: string;
  playerName: string;
  videoUrl: string;
  timestamp: number;
  status: LevelStatus;
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
  records: Record[];
  status: LevelStatus;
}

export interface LevelSubmission {
  id: string;
  type: 'new_level';
  levelId: string;
  name: string;
  creator: string;
  videoProof: string;
  description: string;
  status: LevelStatus;
  timestamp: number;
}

export interface RecordSubmission {
  id: string;
  type: 'completion';
  levelId: string; // Geometry Dash ID or Internal ID
  levelName: string;
  playerName: string;
  videoUrl: string;
  status: LevelStatus;
  timestamp: number;
}

export type Submission = LevelSubmission | RecordSubmission;