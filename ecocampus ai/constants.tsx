
import React from 'react';
import { 
  LayoutDashboard, 
  Trash2, 
  Zap, 
  MessageSquare, 
  Trophy,
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Droplets
} from 'lucide-react';
import { WasteRecord, EnergyRecord, BuildingScore } from './types';

export const COLORS = {
  primary: '#10b981',
  secondary: '#3b82f6',
  accent: '#f59e0b',
  dry: '#94a3b8',
  wet: '#10b981',
  recyclable: '#3b82f6',
  electricity: '#f59e0b',
  water: '#0ea5e9'
};

export const WASTE_DATA: WasteRecord[] = [
  { date: '2023-10-21', dry: 120, wet: 80, recyclable: 45, location: 'Hostel A' },
  { date: '2023-10-22', dry: 130, wet: 90, recyclable: 50, location: 'Hostel A' },
  { date: '2023-10-23', dry: 110, wet: 120, recyclable: 30, location: 'Hostel A' },
  { date: '2023-10-24', dry: 150, wet: 85, recyclable: 60, location: 'Hostel A' },
  { date: '2023-10-25', dry: 140, wet: 100, recyclable: 55, location: 'Hostel A' },
  { date: '2023-10-26', dry: 125, wet: 110, recyclable: 40, location: 'Hostel A' },
  { date: '2023-10-27', dry: 135, wet: 95, recyclable: 50, location: 'Hostel A' },
];

export const ENERGY_DATA: EnergyRecord[] = [
  { date: 'Mon', electricity: 450, water: 2100, building: 'Academic Block' },
  { date: 'Tue', electricity: 480, water: 2300, building: 'Academic Block' },
  { date: 'Wed', electricity: 520, water: 2500, building: 'Academic Block' },
  { date: 'Thu', electricity: 490, water: 2200, building: 'Academic Block' },
  { date: 'Fri', electricity: 510, water: 2400, building: 'Academic Block' },
  { date: 'Sat', electricity: 320, water: 1500, building: 'Academic Block' },
  { date: 'Sun', electricity: 280, water: 1200, building: 'Academic Block' },
];

export const LEADERBOARD_DATA: BuildingScore[] = [
  { name: 'Hostel Alpha', score: 2840, rank: 1, trend: 'up', wasteDiverted: 450, energySaved: 120 },
  { name: 'Main Academic Block', score: 2610, rank: 2, trend: 'neutral', wasteDiverted: 380, energySaved: 200 },
  { name: 'Hostel Gamma', score: 2450, rank: 3, trend: 'up', wasteDiverted: 310, energySaved: 85 },
  { name: 'Research Wing', score: 2100, rank: 4, trend: 'down', wasteDiverted: 150, energySaved: 340 },
  { name: 'Dining Hall C', score: 1890, rank: 5, trend: 'up', wasteDiverted: 520, energySaved: -10 },
];

export const NAVIGATION_ITEMS = [
  { id: 'overview', name: 'Overview', icon: <LayoutDashboard size={20} /> },
  { id: 'waste', name: 'Waste Mgmt', icon: <Trash2 size={20} /> },
  { id: 'energy', name: 'Energy & Water', icon: <Zap size={20} /> },
  { id: 'leaderboard', name: 'Leaderboard', icon: <Trophy size={20} /> },
  { id: 'chat', name: 'AI Assistant', icon: <MessageSquare size={20} /> },
];

export const CAMPUS_STATS = [
  { label: 'Total Waste Diverted', value: '45%', icon: <CheckCircle className="text-emerald-500" /> },
  { label: 'Energy Savings', value: '12%', icon: <TrendingUp className="text-blue-500" /> },
  { label: 'Critical Overflows', value: '2', icon: <AlertTriangle className="text-amber-500" /> },
  { label: 'Water Usage Trend', value: '+5%', icon: <Droplets className="text-sky-500" /> },
];
