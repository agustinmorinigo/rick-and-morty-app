'use client';
import { useRef } from 'react';
import ErrorContent from '@/components/ui/error-content';
import { Pagination } from '@/components/ui/pagination';
import ListSkeleton from '@/domains/characters/components/list/list-skeleton';
import { useGetCharactersQuery } from '@/domains/characters/queries/use-get-characters-query';
import type { Character } from '@/domains/characters/types';
import usePagination from '@/hooks/use-pagination';
import { CharacterListItem } from './list-item';
import ListEmpty from '@/domains/characters/components/list/list-empty';

interface CharacterGridProps {
  label: string;
  activeCharacter: Character | null;
  onClickCharacter: (character: Character) => void;
  id: string;
  disabledCharacter?: Character | null;
}

export function CharacterList(props: CharacterGridProps) {
  const { label, activeCharacter, onClickCharacter, id, disabledCharacter } = props;
  const { page, goToPage } = usePagination(`page_${id}`);
  const { isLoading, isError, data, refetch } = useGetCharactersQuery(page);
  const totalPagesRef = useRef(1);

  if (data?.info?.pages && data.info.pages !== totalPagesRef.current) {
    totalPagesRef.current = data.info.pages;
  }

  const totalPages = totalPagesRef.current;
  const characters = data?.results || [];

  if (isError) {
    return <ErrorContent title='Failed to load characters.' refetch={refetch} />;
  }

  return (
    <div className='space-y-8' data-testid='character-list'>
      <div className='flex items-center justify-between'>
        <h2 className='text-2xl font-bold'>{label}</h2>
        <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} isLoading={isLoading} />
      </div>

      <div className='grid grid-cols-2 xl:grid-cols-3 gap-4'>
        {isLoading ? (
          <ListSkeleton />
        ) : characters.length === 0 ? (
          <ListEmpty />
        ) : (
          characters.map((character) => (
            <CharacterListItem
              key={character.id}
              character={character}
              isSelected={activeCharacter?.id === character.id}
              isDisabled={disabledCharacter?.id === character.id}
              onClick={() => onClickCharacter(character)}
            />
          ))
        )}
      </div>
    </div>
  );
}
