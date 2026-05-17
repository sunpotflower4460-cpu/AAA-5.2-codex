import { copy } from '../lib/i18n'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="rounded-full border border-line bg-paper px-[21px] py-[8px] shadow-sm">
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
