import { Loader } from 'lucide-react';
import { Suspense } from 'react';
import Comparator from '@/domains/comparator/components/comparator';

export default function Page() {
  return (
    <Suspense fallback={<Loader className='animate-spin mx-auto mt-20' />}>
      <Comparator />
    </Suspense>
  );
}
