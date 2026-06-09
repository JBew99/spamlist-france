
export type LevelStatus = 'pending' | 'approved' | 'rejected';
export type Platform = 'PC' | 'Mobile';
export type SpamType = 
  | 'Alternating' 
  | 'Alt-Jitter' 
  | 'Jitter' 
  | 'Button Mashing' 
  | 'Rake' 
  | 'Lip Spam' 
  | 'Butterfly' 
  | 'Telekinesis' 
  | 'Scroll Clicking';

export type UserRank = 'Bronze' | 'Argent' | 'Or' | 'Platine' | 'Diamant' | 'Élite';

export interface LevelRating {
  id: string;
  rating: number;
  comment: string;
  timestamp: number;
}

export interface Record {
  id: string;
  levelId: string;
  levelName: string;
  playerName: string;
  userId: string;
  videoUrl: string;
  timestamp: number;
  status: LevelStatus;
  fps: number;
  platform: Platform;
  spamType: SpamType;
  pointsEarned: number;
  rejectionReason?: string;
}

export interface Level {
  id: string;
  levelId: string;
  name: string;
  creator: string;
  difficulty: number;
  completionPercent: number;
  videoProof: string;
  description: string;
  averageRating: number;
  ratings: LevelRating[];
  records: Record[];
  status: LevelStatus;
  minFps: number;
  verifier: string;
  spamType: SpamType;
}

export interface PlayerStats {
  id: string;
  name: string;
  points: number;
  completions: number;
  rank: number;
  tier: UserRank;
  bestSpamType: SpamType;
  platform: Platform;
  clanId?: string;
  trustScore: number; // 0-100
  progression: { date: number; points: number }[];
}

export interface Clan {
  id: string;
  name: string;
  tag: string;
  points: number;
  membersCount: number;
  description: string;
  rank: number;
}

export interface LevelPack {
  id: string;
  name: string;
  levels: string[];
  rewardPoints: number;
  description: string;
}

export interface ChangelogEntry {
  id: string;
  date: number;
  title: string;
  changes: string[];
}
