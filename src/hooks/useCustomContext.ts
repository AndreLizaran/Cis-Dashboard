// Modules
import { useContext } from 'react'

// Contexts
import { UIContext } from '../contexts/UIContext';

export function useUIContext() {
  return useContext(UIContext);
}
