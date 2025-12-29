import ThemeButton from '@/components/layout/theme-button';

export default function Header() {
  return (
    <header className='border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 flex items-center justify-between px-4 py-6'>
      <div></div>
      <div>
        <div className='flex items-center justify-center gap-3'>
          <h1 className='text-3xl font-bold text-balance bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent'>
            Rick & Morty Character Comparator
          </h1>
        </div>
        <p className='text-center mt-2 text-muted-foreground'>
          Select two characters to compare their episode appearances
        </p>
      </div>
      <div>
        <ThemeButton />
      </div>
    </header>
  );
}
