export type LeaderboardEntry = {
  name: string;
  finishedAt: number;
  order: number;
  message: string;
};

const CURRENT_PLAYER_KEY = "venthology_current_player";
const CLAIMED_NAMES_KEY = "venthology_claimed_names";
const LEADERBOARD_KEY = "venthology_leaderboard";

export function setCurrentPlayer(name: string) {
  localStorage.setItem(CURRENT_PLAYER_KEY, name);
}

export function getCurrentPlayer() {
  return localStorage.getItem(CURRENT_PLAYER_KEY);
}

export function clearCurrentPlayer() {
  localStorage.removeItem(CURRENT_PLAYER_KEY);
}

export function getClaimedNames(): string[] {
  const raw = localStorage.getItem(CLAIMED_NAMES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function claimName(name: string) {
  const claimed = getClaimedNames();
  if (!claimed.includes(name)) {
    localStorage.setItem(CLAIMED_NAMES_KEY, JSON.stringify([...claimed, name]));
  }
}

export function getLeaderboard(): LeaderboardEntry[] {
  const raw = localStorage.getItem(LEADERBOARD_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function addLeaderboardEntry(name: string, message: string) {
  const leaderboard = getLeaderboard();
  const existing = leaderboard.find((entry) => entry.name === name);

  if (existing) {
    return existing.order;
  }

  const order = leaderboard.length + 1;

  const newEntry: LeaderboardEntry = {
    name,
    message,
    order,
    finishedAt: Date.now(),
  };

  localStorage.setItem(
    LEADERBOARD_KEY,
    JSON.stringify([...leaderboard, newEntry])
  );

  return order;
}