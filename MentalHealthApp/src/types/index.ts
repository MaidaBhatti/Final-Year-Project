export interface User {
  id: string;
  username: string;
  email: string;
  age?: number;
  gender?: string;
  height?: number;
  weight?: number;
  image?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{success: boolean; message?: string}>;
  register: (userData: any) => Promise<{success: boolean; message?: string}>;
  logout: () => void;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Mood {
  name: string;
  emoji: string;
  tip: string;
}