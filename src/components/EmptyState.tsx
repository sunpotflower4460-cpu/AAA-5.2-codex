import { copy } from '../lib/i18n'
import { ZanshinMark } from './ZanshinMark'

type EmptyStateProps = {
  onCreate: () => void
}

export const EmptyState = ({ onCreate }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center gap-[21px] rounded-[34px] border border-line bg-paper px-[21px] py-[34px] text-center shadow-soft">
      <ZanshinMark />
      <div className="space-y-[8px]">
        <p className="font-serif text-[18px] text-sumi">{copy.emptyTitle}</p>
        <p className="text-[13px] text-ink-muted">{copy.emptySubtitle}</p>
      </div>
      <button
        type="button"
        onClick={onCreate}
        className="rounded-full border border-line bg-washi px-[21px] py-[8px] text-[13px] text-sumi shadow-sm transition duration-300 hover:-translate-y-[1px]"
        aria-label={copy.newNote}
      >
        {copy.emptyAction}
      </button>
    </div>
  )
}
