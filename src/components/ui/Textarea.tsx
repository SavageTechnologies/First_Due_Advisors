import { cn } from '@/lib/utils/cn';

interface TextareaProps {
  label: string;
  name: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Textarea({
  label,
  name,
  placeholder,
  rows = 4,
  required = false,
  error,
  className,
  value,
  onChange,
}: TextareaProps): React.ReactElement {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-[var(--text-mid)]"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        rows={rows}
        required={required}
        value={value}
        onChange={onChange}
        className={cn(
          'border bg-white px-3 py-2.5 text-base text-[var(--text)] resize-y',
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
