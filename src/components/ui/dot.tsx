import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const dotVariants = cva('h-2 w-2 rounded-full', {
  variants: {
    variant: {
      error: 'bg-red-500',
      success: 'bg-emerald-500',
      neutral: 'bg-gray-500',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

export interface DotProps extends VariantProps<typeof dotVariants> {
  className?: string;
}

export function Dot({ variant, className }: DotProps) {
  return <div className={cn(dotVariants({ variant }), className)} />;
}

export type DotVariant = VariantProps<typeof dotVariants>['variant'];
