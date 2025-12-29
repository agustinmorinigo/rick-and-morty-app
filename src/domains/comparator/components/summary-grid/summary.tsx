import ErrorContent from '@/components/ui/error-content';
import type { Character } from '@/domains/characters/types';
import EpisodeSummaryCard from '@/domains/episodes/components/episode-summary-card/episode-summary-card';
import { useGetEpisodesQuery } from '@/domains/episodes/queries/use-get-episodes-query';
import categorizeEpisodes from '@/domains/episodes/utils/categorize-episodes';
import getUniqueEpisodeIds from '@/domains/episodes/utils/get-unique-episode-ids';

interface SummaryProps {
  character1: Character;
  character2: Character;
}

export default function Summary({ character1, character2 }: SummaryProps) {
  const allEpisodeIds = getUniqueEpisodeIds(character1.episode, character2.episode);
  const { data, isLoading, isError, refetch } = useGetEpisodesQuery(allEpisodeIds);
  const allEpisodes = data ?? [];
  const categorizedEpisodes = categorizeEpisodes(allEpisodes, character1.episode, character2.episode);
  const { onlyChar1, shared, onlyChar2 } = categorizedEpisodes;

  return (
    <div className='space-y-6'>
      <div className='text-center mb-8'>
        <h2 className='text-2xl font-bold mb-2'>Episode Comparison</h2>
        <p className='text-muted-foreground'>
          Comparing <b>{character1.name}</b> and <b>{character2.name}</b>
        </p>
      </div>

      {isError ? (
        <ErrorContent title='Failed to load episodes.' refetch={refetch} />
      ) : (
        <div className='grid lg:grid-cols-3 gap-6'>
          <EpisodeSummaryCard
            title={`${character1.name} Only`}
            episodes={onlyChar1}
            isLoading={isLoading}
            variant='primary'
          />

          <EpisodeSummaryCard title='Shared Episodes' episodes={shared} isLoading={isLoading} variant='secondary' />

          <EpisodeSummaryCard
            title={`${character2.name} Only`}
            episodes={onlyChar2}
            isLoading={isLoading}
            variant='tertiary'
          />
        </div>
      )}
    </div>
  );
}
