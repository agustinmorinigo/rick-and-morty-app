'use client';
import { CharacterList } from '@/domains/characters/components/list/list';
import type { Character } from '@/domains/characters/types';
import useComparatorStore from '@/domains/comparator/stores/use-comparator-store';

export default function CharacterSelectionGrid() {
  const { character1, character2, setCharacter1, setCharacter2 } = useComparatorStore();

  function onClickCharacter1(character: Character) {
    const newCharacter = character1?.id === character.id ? null : character;
    setCharacter1(newCharacter);
  }

  function onClickCharacter2(character: Character) {
    const newCharacter = character2?.id === character.id ? null : character;
    setCharacter2(newCharacter);
  }

  return (
    <div className='grid lg:grid-cols-2 gap-8 mb-12'>
      <CharacterList
        label='Character #1'
        activeCharacter={character1}
        disabledCharacter={character2}
        onClickCharacter={onClickCharacter1}
        id='character1'
      />
      <CharacterList
        label='Character #2'
        activeCharacter={character2}
        disabledCharacter={character1}
        onClickCharacter={onClickCharacter2}
        id='character2'
      />
    </div>
  );
}
