
export interface Game {
  id: string | number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  isPopular?: boolean;
  iframeUrl: string;
}

export const CATEGORIES = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Casual'];
