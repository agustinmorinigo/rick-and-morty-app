import { nanoid } from 'nanoid';

export default function EpisodeSummaryCardSkeleton() {
  const items = [...Array(5)];

  return items.map(() => {
    const id = nanoid();
    return (
      <div key={id} className='animate-pulse' data-testid='episode-summary-card-skeleton'>
        <div className='h-4 bg-muted rounded mb-2' />
        <div className='h-3 bg-muted rounded w-3/4' />
      </div>
    );
  });
}
