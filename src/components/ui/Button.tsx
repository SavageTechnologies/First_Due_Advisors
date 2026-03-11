import { cn } from '@/lib/utils/cn';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'phone';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white font-bold hover:bg-accent-light focus:ring-accent',
  secondary:
    'bg-primary text-white font-bold hover:bg-primary-mid focus:ring-primary',
  ghost:
    'bg-transparent text-primary border-2 border-primary font-semibold hover:bg-primary hover:text-white focus:ring-primary',
  phone:
    'bg-[var(--success-light)] text-success border border-success font-semibold hover:bg-success hover:text-white focus:ring-success',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className,
}: ButtonProps): React.ReactElement {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center transition-colors duration-150',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </button>
  );
}
