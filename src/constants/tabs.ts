import { LayoutDashboard, Users, History, Trophy } from 'lucide-react';

export const TABS = [
  { id: 'players', icon: Users, label: 'Players' },
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'history', icon: History, label: 'History' },
  { id: 'leaderboard', icon: Trophy, label: 'Leaderboard' },
] as const;

export type TabId = typeof TABS[number]['id'];