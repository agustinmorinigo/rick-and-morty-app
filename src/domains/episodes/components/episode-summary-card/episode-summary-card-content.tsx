import EpisodeSummaryCardContentItem from '@/domains/episodes/components/episode-summary-card/episode-summary-card-content-item';
import EpisodeSummaryCardEmpty from '@/domains/episodes/components/episode-summary-card/episode-summary-card-empty';
import type { Episode } from '@/domains/episodes/types';

interface EpisodeSummaryCardContentProps {
  episodes: Episode[];
}

export default function EpisodeSummaryCardContent({ episodes }: EpisodeSummaryCardContentProps) {
  if (episodes.length === 0) {
    return <EpisodeSummaryCardEmpty />;
  }

  return episodes.map((episode) => <EpisodeSummaryCardContentItem key={episode.id} episode={episode} />);
}
