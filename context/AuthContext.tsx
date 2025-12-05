import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, PromptItem, PromptCategory, AITool } from '../types';
import { FEATURED_PROMPTS, AI_TOOLS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  loginWithGoogle: () => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  toggleFavorite: (promptId: string) => void;
  addPrompt: (prompt: Omit<PromptItem, 'id' | 'likes' | 'author' | 'isPro'>) => void;
  upgradeToPro: () => void;
  allPrompts: PromptItem[];
  tools: AITool[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // Store all prompts in state so user uploads are visible immediately
  const [allPrompts, setAllPrompts] = useState<PromptItem[]>(FEATURED_PROMPTS);
  const [tools] = useState<AITool[]>(AI_TOOLS);

  // Mock login
  const login = (email: string, password: string) => {
    // Simulate API call
    const mockUser: User = {
      id: 'user_123',
      name: email.split('@')[0],
      email: email,
      plan: 'free',
      favorites: [],
      myPrompts: [],
      avatarUrl: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
    };
    setUser(mockUser);
    localStorage.setItem('promptfree_user', JSON.stringify(mockUser));
  };

  // Mock Google Login
  const loginWithGoogle = () => {
    const mockUser: User = {
      id: 'google_user_' + Math.random().toString(36).substr(2, 9),
      name: 'Google User',
      email: 'user@gmail.com',
      plan: 'free',
      favorites: [],
      myPrompts: [],
      avatarUrl: 'https://lh3.googleusercontent.com/a/default-user=s96-c' // Generic Google placeholder or use UI Avatars
    };
    setUser(mockUser);
    localStorage.setItem('promptfree_user', JSON.stringify(mockUser));
  };

  // Mock register
  const register = (name: string, email: string, password: string) => {
    const mockUser: User = {
      id: 'user_' + Math.random().toString(36).substr(2, 9),
      name: name,
      email: email,
      plan: 'free',
      favorites: [],
      myPrompts: [],
      avatarUrl: `https://ui-avatars.com/api/?name=${name}&background=random`
    };
    setUser(mockUser);
    localStorage.setItem('promptfree_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('promptfree_user');
  };

  const toggleFavorite = (promptId: string) => {
    if (!user) return;
    const isFav = user.favorites.includes(promptId);
    const newFavorites = isFav 
      ? user.favorites.filter(id => id !== promptId)
      : [...user.favorites, promptId];
    
    const updatedUser = { ...user, favorites: newFavorites };
    setUser(updatedUser);
    localStorage.setItem('promptfree_user', JSON.stringify(updatedUser));
  };

  const addPrompt = (promptData: Omit<PromptItem, 'id' | 'likes' | 'author' | 'isPro'>) => {
    if (!user) return;
    
    const newPrompt: PromptItem = {
      ...promptData,
      id: 'custom_' + Math.random().toString(36).substr(2, 9),
      author: user.name,
      likes: 0,
      isPro: false, // User uploads are typically free or managed by admin in real apps
      createdAt: new Date().toISOString()
    };

    // Update global list
    setAllPrompts(prev => [newPrompt, ...prev]);
    
    // Update user's list
    const updatedUser = { ...user, myPrompts: [newPrompt, ...user.myPrompts] };
    setUser(updatedUser);
    localStorage.setItem('promptfree_user', JSON.stringify(updatedUser));
  };

  const upgradeToPro = () => {
    if (!user) return;
    const updatedUser: User = { ...user, plan: 'pro' };
    setUser(updatedUser);
    localStorage.setItem('promptfree_user', JSON.stringify(updatedUser));
  };

  // Check local storage on load
  useEffect(() => {
    const stored = localStorage.getItem('promptfree_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ 
        user, 
        login, 
        loginWithGoogle, 
        register, 
        logout, 
        toggleFavorite, 
        addPrompt, 
        upgradeToPro, 
        allPrompts,
        tools: tools || [] // Safety fallback
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};