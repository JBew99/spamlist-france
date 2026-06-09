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
  playerName: string;
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
  id: string; // ID stable interne (ex: lvl-1)
  levelId: string; // ID Ingame Geometry Dash
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
  rank: number; // Position globale
  tier: UserRank; // Rang visuel
  bestSpamType: SpamType;
  platform: Platform;
  clanId?: string;
  trustScore: number; // 0-100 (Score de confiance invisible pour les admins)
  history: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'completion' | 'rank_up' | 'clan_join' | 'level_add';
  title: string;
  description: string;
  timestamp: number;
  userId: string;
  userName: string;
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
  levels: string[]; // IDs des niveaux (lvl-X)
  rewardPoints: number;
  description: string;
}

export interface ChangelogEntry {
  id: string;
  date: number;
  title: string;
  changes: string[];
}