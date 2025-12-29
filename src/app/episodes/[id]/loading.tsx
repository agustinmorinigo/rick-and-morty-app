import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex items-center justify-center'>
      <Loader className='animate-spin mt-20 h-12 w-12' />
    </div>
  );
}
