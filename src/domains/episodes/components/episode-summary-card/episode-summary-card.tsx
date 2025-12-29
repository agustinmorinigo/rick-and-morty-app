import { Card, type CardVariant } from '@/components/ui/card';
import EpisodeSummaryCardContent from '@/domains/episodes/components/episode-summary-card/episode-summary-card-content';
import EpisodeSummaryCardSkeleton from '@/domains/episodes/components/episode-summary-card/episode-summary-card-skeleton';
import type { Episode } from '@/domains/episodes/types';

interface EpisodeSummaryProps {
  title: string;
  episodes: Episode[];
  isLoading: boolean;
  variant: CardVariant;
}

export default function EpisodeSummaryCard(props: EpisodeSummaryProps) {
  const { title, episodes, isLoading, variant } = props;

  return (
    <Card variant={variant} data-testid='episode-summary-card'>
      <div className='p-4 bg-accent'>
        <h3 className='font-bold text-lg mb-1 text-balance'>{title}</h3>
        <div className='mt-2 text-2xl font-bold'>{episodes.length}</div>
      </div>
      <div className='p-4 max-h-100 overflow-y-auto'>
        <div className='space-y-3'>
          {isLoading ? <EpisodeSummaryCardSkeleton /> : <EpisodeSummaryCardContent episodes={episodes} />}
        </div>
      </div>
    </Card>
  );
}
