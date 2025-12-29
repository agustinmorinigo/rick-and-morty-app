'use client';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/providers/theme-provider';

export default function ThemeButton() {
  const { toggleTheme, mounted, isLight } = useTheme();

  return (
    <Button variant='ghost' size='icon' onClick={toggleTheme} className='h-9 w-9' disabled={!mounted}>
      {isLight ? <Moon className='h-4 w-4' /> : <Sun className='h-4 w-4' />}
    </Button>
  );
}
