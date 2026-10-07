import type { ComponentProps } from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/cn';

const inputVariants = cva(
  'h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 text-foreground',
  {
    variants: {
      variant: {
        default: 'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
        brand:
          'focus-visible:ring-0 focus-visible:border-button-brand-bg-dark transition-colors duration-200',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface Props extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {}

function Input({ className, type, variant = 'default', ...props }: Props) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
