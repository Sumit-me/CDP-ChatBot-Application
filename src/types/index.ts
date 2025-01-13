export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ApiKeyResponse {
  valid: boolean;
  message: string;
}

export type CDP = 'segment' | 'mparticle' | 'lytics' | 'zeotap' | 'all';