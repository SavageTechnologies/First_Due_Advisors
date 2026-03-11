import { cn } from '@/lib/utils/cn';

interface InputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  name,
  type = 'text',
  placeholder,
  required = false,
  error,
  className,
  value,
  onChange,
}: InputProps): React.ReactElement {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-[var(--text-mid)]"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className={cn(
          'border bg-white px-3 py-2.5 text-base text-[var(--text)]',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          'placeholder:text-[var(--text-light)]',
          error ? 'border-[var(--error)]' : 'border-[var(--border)]',
        )}
      />
      {error && (
        <p className="text-xs text-[var(--error)] mt-0.5">{error}</p>
      )}
    </div>
  );
}
