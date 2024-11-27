import { useState, useEffect } from 'react';

export function useBookmarks<T extends { id: string }>(key: string) {
  const [bookmarks, setBookmarks] = useState<T[]>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(bookmarks));
  }, [bookmarks, key]);

  const toggleBookmark = (item: T) => {
    setBookmarks(prev => {
      const exists = prev.some(bookmark => bookmark.id === item.id);
      if (exists) {
        return prev.filter(bookmark => bookmark.id !== item.id);
      }
      return [...prev, item];
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some(bookmark => bookmark.id === id);
  };

  return { bookmarks, toggleBookmark, isBookmarked };
}