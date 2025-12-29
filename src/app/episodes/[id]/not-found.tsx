import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='max-w-md w-full text-center space-y-6'>
        <div className='relative w-40 h-40 mx-auto'>
          <div className='absolute inset-0 rounded-full' />
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-7xl font-bold'>404</span>
          </div>
          <div
            className='absolute inset-0 border-4 border-dashed border-primary/30 rounded-full animate-spin'
            style={{ animationDuration: '8s' }}
          />
        </div>

        <div className='space-y-3'>
          <h1 className='text-3xl font-bold text-foreground'>Episode Not Found</h1>
          <p className='text-lg text-muted-foreground'>This episode doesn't exist</p>
          <p className='text-sm text-muted-foreground/70'>
            The episode you're looking for might have been deleted or never existed
          </p>
        </div>

        <div className='pt-4'>
          <Button asChild className='hover:opacity-90 transition-opacity'>
            <Link href='/'>Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
