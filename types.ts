
export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface SpecializedResource {
  name: string;
  address: string;
  description: string;
  phone?: string;
  uri?: string;
}

// Interfaz para representar una noticia de actualidad sobre chemsex
export interface NewsArticle {
  title: string;
  summary: string;
  url: string;
}

export interface MapsResult {
  text: string;
  links: { title: string; uri: string }[];
}

export type View = 'menu' | 'chat' | 'evaluation' | 'substances' | 'tar' | 'urgent' | 'about' | 'chemsex' | 'join' | 'news' | 'legal';
