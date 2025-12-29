'use client';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { DotVariant } from '@/components/ui/dot';
import { Dot } from '@/components/ui/dot';
import type { Character } from '@/domains/characters/types';
import { cn } from '@/lib/utils';

interface CharacterListItemProps {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
  isDisabled?: boolean;
}

const dotVariantByStatus: Record<string, DotVariant> = {
  Alive: 'success',
  Dead: 'error',
  unknown: 'neutral',
};

export function CharacterListItem({ character, isSelected, onClick, isDisabled }: CharacterListItemProps) {
  const variant = dotVariantByStatus[character.status];

  function handleClick() {
    if (isDisabled) return;
    onClick();
  }

  return (
    <Card
      onClick={handleClick}
      className={cn(
        'group cursor-pointer overflow-hidden transition-all hover:scale-105 hover:shadow-lg select-none',
        isSelected && 'ring-2 ring-primary shadow-lg scale-105',
        isDisabled && 'cursor-not-allowed opacity-50 pointer-events-none',
      )}
      data-testid='character-list-item'
    >
      <div className='relative aspect-square overflow-hidden bg-muted'>
        <Image
          src={character.image}
          alt={character.name}
          fill
          className='object-cover transition-transform group-hover:scale-110'
          sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw'
        />
        {isSelected && (
          <div className='absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]'>
            <div className='rounded-full bg-primary p-3'>
              <Check className='h-6 w-6 text-primary-foreground' />
            </div>
          </div>
        )}
      </div>
      <div className='p-3'>
        <h3 className='font-semibold text-sm mb-1 line-clamp-1' title={character.name}>
          {character.name}
        </h3>
        <div className='flex items-center gap-2 text-xs text-muted-foreground'>
          <div className='flex items-center gap-1.5'>
            <Dot variant={variant} />
            <span className='capitalize'>{character.status}</span>
          </div>
          <span>•</span>
          <span className='line-clamp-1 capitalize'>{character.species}</span>
        </div>
      </div>
    </Card>
  );
}
