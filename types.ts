
export enum PromptCategory {
  ART = 'Nghệ thuật',
  CODING = 'Lập trình',
  WRITING = 'Viết lách',
  MARKETING = 'Marketing',
  SEO = 'SEO',
  PHOTOGRAPHY = 'Nhiếp ảnh'
}

export interface PromptItem {
  id: string;
  title: string;
  description: string;
  content: string;
  category: PromptCategory;
  tags: string[];
  author: string;
  likes: number;
  imageUrl?: string; 
  isPro: boolean; // New field for membership gating
  createdAt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro';
  favorites: string[]; // List of prompt IDs
  myPrompts: PromptItem[];
  avatarUrl?: string;
}

export interface AITool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  priceModel: 'Free' | 'Freemium' | 'Paid';
  imageUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  imageUrl: string;
  author: string;
  authorAvatar: string;
  tags: string[];
  readTime: string;
  views: number;
}

export interface VideoItem {
  id: string;
  title: string;
  duration: string;
  views: string;
  thumbnailUrl: string;
  author: string;
}

export interface GenerationResult {
  text?: string;
  imageUrl?: string;
  error?: string;
}