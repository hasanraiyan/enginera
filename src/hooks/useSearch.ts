import { useState, useEffect, useMemo } from 'react';
import { Subject, Branch } from '../types/course';

export function useSearch(items: Subject[] | Branch[], searchTerm: string) {
  const filteredItems = useMemo(() => {
    if (!searchTerm) return items;
    
    return items.filter(item => {
      const searchableText = [
        'title' in item ? item.title : item.name,
        'description' in item ? item.description : '',
        'code' in item ? item.code : '',
        'instructor' in item ? item.instructor : ''
      ].join(' ').toLowerCase();
      
      return searchableText.includes(searchTerm.toLowerCase());
    });
  }, [items, searchTerm]);

  return filteredItems;
}