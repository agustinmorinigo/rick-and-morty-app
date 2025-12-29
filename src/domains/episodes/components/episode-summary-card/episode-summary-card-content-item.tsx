import type { Episode } from '@/domains/episodes/types';
import getEpisodeLabel from '@/domains/episodes/utils/get-episode-label';

interface EpisodeSummaryCardContentItemProps {
  episode: Episode;
}

export default function EpisodeSummaryCardContentItem({ episode }: EpisodeSummaryCardContentItemProps) {
  return (
    <div key={episode.id} className='pb-3 border-b border-border last:border-0' data-testid='episode-summary-card-content-item'>
      <div className='flex items-start justify-between gap-2 mb-1'>
        <span className='font-mono text-xs font-semibold text-primary'>{getEpisodeLabel(episode.episode)}</span>
        <span className='text-xs text-muted-foreground whitespace-nowrap'>{episode.airDate}</span>
      </div>
      <h4 className='font-medium text-sm leading-snug'>{episode.name}</h4>
    </div>
  );
}
