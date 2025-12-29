export default function SummaryGridEmpty() {
  return (
    <div className='text-center py-16 px-4'>
      <div className='inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6 animate-pulse'>
        <svg className='w-10 h-10 text-muted-foreground' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <title>Lightning bolt icon</title>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 10V3L4 14h7v7l9-11h-7z' />
        </svg>
      </div>
      <h3 className='text-xl font-semibold mb-2'>Select Two Characters</h3>
      <p className='text-muted-foreground max-w-md mx-auto'>
        Choose a character from each section above to see their shared episodes and unique appearances
      </p>
    </div>
  );
}
