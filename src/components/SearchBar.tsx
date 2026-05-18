import { copy } from '../lib/i18n'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center gap-[8px] rounded-full border border-line bg-paper px-[21px] py-[10px] shadow-sm transition duration-300 focus-within:border-gold focus-within:shadow-[0_0_0_1px_var(--color-gold)]">
      <span className="text-[12px] text-ink-muted" aria-hidden="true">
        ⌕
      </span>
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
