import { Button } from '@/components/ui/button';

interface ErrorContentProps {
  title: string;
  refetch: () => void;
}

export default function ErrorContent({ title, refetch }: ErrorContentProps) {
  return (
    <div className='w-full flex items-center flex-col p-10 gap-4'>
      <h6>{title}</h6>
      <Button onClick={() => refetch()}>Retry</Button>
    </div>
  );
}
