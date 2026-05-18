import { copy } from '../lib/i18n'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-[8px] rounded-full border border-line bg-paper px-[21px] py-[10px] shadow-sm transition duration-300 focus-within:border-gold focus-within:shadow-[0_0_0_1px_var(--color-gold)]">
      <svg
        viewBox="0 0 24 24"
        role="img"
        aria-label={copy.searchPlaceholder}
        className="h-[14px] w-[14px] text-ink-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <title>{copy.searchPlaceholder}</title>
        <circle cx="11" cy="11" r="7" />
        <line x1="16.65" y1="16.65" x2="20" y2="20" />
      </svg>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={copy.searchPlaceholder}
        aria-label={copy.searchPlaceholder}
        className="w-full bg-transparent text-[14px] text-sumi outline-none placeholder:text-ink-muted"
      />
    </div>
  )
}
