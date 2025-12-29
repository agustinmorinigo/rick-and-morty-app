import { nanoid } from 'nanoid';
import { Card } from '@/components/ui/card';

export default function ListSkeleton() {
  const items = [...Array(6)];

  return items.map(() => {
    const id = nanoid();
    return (
      <Card key={id} className='p-4 animate-pulse' data-testid='character-list-skeleton'>
        <div className='aspect-square bg-muted rounded-lg mb-3' />
        <div className='h-4 bg-muted rounded mb-2' />
        <div className='h-3 bg-muted rounded w-2/3' />
      </Card>
    );
  });
}
