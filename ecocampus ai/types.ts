
export type View = 'overview' | 'waste' | 'energy' | 'chat' | 'leaderboard';

export interface WasteRecord {
  date: string;
  dry: number;
  wet: number;
  recyclable: number;
  location: string;
}

export interface EnergyRecord {
  date: string;
  electricity: number;
  water: number;
  building: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  image?: string;
}

export interface BuildingScore {
  name: string;
  score: number;
  rank: number;
  trend: 'up' | 'down' | 'neutral';
  wasteDiverted: number;
  energySaved: number;
}
