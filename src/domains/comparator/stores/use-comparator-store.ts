import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character } from '@/domains/characters/types';

interface State {
  character1: Character | null;
  character2: Character | null;
}

interface Actions {
  setCharacter1: (character: Character | null) => void;
  setCharacter2: (character: Character | null) => void;
}

const useComparatorStore = create<State & Actions>()(
  persist(
    (set) => ({
      character1: null,
      character2: null,
      setCharacter1: (character) => set({ character1: character }),
      setCharacter2: (character) => set({ character2: character }),
    }),
    {
      name: 'comparator-store',
      partialize: (state) => ({
        character1: state.character1,
        character2: state.character2,
      }),
    },
  ),
);

export default useComparatorStore;
