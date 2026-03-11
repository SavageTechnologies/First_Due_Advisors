import { cn } from '@/lib/utils/cn';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  options: SelectOption[];
  required?: boolean;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function Select({
  label,
  name,
  options,
  required = false,
  error,
  className,
  value,
  onChange,
}: SelectProps): React.ReactElement {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label
        htmlFor={name}
        className="text-sm font-semibold text-[var(--text-mid)]"
      >
        {label}
        {required && <span className="text-accent ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className={cn(
          'border bg-white px-3 py-2.5 text-base text-[var(--text)]',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          error ? 'border-[var(--error)]' : 'border-[var(--border)]',
        )}
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-[var(--error)] mt-0.5">{error}</p>
      )}
    </div>
  );
}
