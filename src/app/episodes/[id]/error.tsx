'use client';
import { CircleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='max-w-md w-full text-center space-y-6'>
        <div className='relative w-32 h-32 mx-auto'>
          <div className='absolute inset-0 rounded-full bg-linear-to-r from-destructive to-orange-500 opacity-20' />
          <div className='absolute inset-4 rounded-full border-4 border-destructive/30 flex items-center justify-center'>
            <CircleAlert className='w-12 h-12 text-destructive' />
          </div>
        </div>

        <div className='space-y-2'>
          <h2 className='text-3xl font-bold text-foreground'>Oops!</h2>
          <p className='text-lg text-muted-foreground'>Something went wrong</p>
          <p className='text-sm text-muted-foreground/70'>{error.message || 'Failed to load episode data'}</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Button onClick={reset}>Retry</Button>
        </div>
      </div>
    </div>
  );
}
