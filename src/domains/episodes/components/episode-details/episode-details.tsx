import { ArrowLeft, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Episode } from '@/domains/episodes/types';
import getEpisodeLabel from '@/domains/episodes/utils/get-episode-label';

interface EpisodeDetailsProps {
  episode: Episode;
}

export default function EpisodeDetails({ episode }: EpisodeDetailsProps) {
  const { characters, airDate, name } = episode;

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        <Link href='/'>
          <Button variant='ghost' className='mb-6 gap-2'>
            <ArrowLeft className='w-4 h-4' />
            Back
          </Button>
        </Link>

        <div className='mb-8'>
          <div className='inline-block px-3 py-1 bg-primary/20 rounded-full mb-4'>
            <span className='font-mono text-sm font-bold text-primary'>{getEpisodeLabel(episode.episode)}</span>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 text-balance bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent'>
            {name}
          </h1>
          <div className='flex flex-wrap gap-6 text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Calendar className='w-5 h-5' />
              <span className='text-sm font-medium'>Aired: {airDate}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Users className='w-5 h-5' />
              <span className='text-sm font-medium'>{characters.length} Characters</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
