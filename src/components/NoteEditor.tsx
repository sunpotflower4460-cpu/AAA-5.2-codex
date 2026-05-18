import type { Note } from '../types/note'
import { copy } from '../lib/i18n'
import { formatNoteDate } from '../lib/date'

type NoteEditorProps = {
  note: Note
  onBack: () => void
  onTitleChange: (value: string) => void
  onBodyChange: (value: string) => void
  onToggleFavorite: () => void
  onDelete: () => void
}

export const NoteEditor = ({
  note,
  onBack,
  onTitleChange,
  onBodyChange,
  onToggleFavorite,
  onDelete,
}: NoteEditorProps) => {
  const handleDelete = () => {
    const confirmed = window.confirm(`${copy.deleteConfirm}\n${copy.deleteConfirmEn}`)
    if (confirmed) {
      onDelete()
    }
  }

  return (
    <div className="flex min-h-screen flex-col gap-[34px] pb-[calc(55px+var(--safe-area-bottom))]">
      <header className="flex items-center justify-between gap-[13px]">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-line bg-paper px-[13px] py-[8px] text-[12px] text-sumi shadow-sm transition duration-300 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label={copy.back}
        >
          ← {copy.back}
        </button>
        <div className="flex items-center gap-[6px] text-right text-[10px] uppercase tracking-[0.24em] text-ink-muted">
          <span className="h-[6px] w-[6px] rounded-full bg-gold opacity-60" aria-hidden="true" />
          <div>
            <p>{copy.saved}</p>
            <p className="mt-[2px]">{copy.savedEn}</p>
          </div>
        </div>
      </header>

      <div className="space-y-[16px]">
        <input
          value={note.title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder={copy.untitled}
          aria-label="タイトル"
          className="w-full rounded-[16px] border border-line bg-paper px-[16px] py-[10px] font-serif text-[20px] leading-[1.4] text-sumi shadow-sm outline-none transition duration-300 focus:border-gold focus:shadow-[0_0_0_1px_var(--color-gold)]"
        />

        <div className="flex items-center justify-between text-[11px] text-ink-muted">
          <span>{formatNoteDate(note.updatedAt, note.locale ?? 'ja')}</span>
          <div className="flex items-center gap-[8px]">
            <button
              type="button"
              onClick={onToggleFavorite}
              className={`rounded-full border border-line bg-paper px-[10px] py-[4px] text-[11px] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                note.isFavorite ? 'text-gold' : 'text-ink-muted'
              }`}
              aria-label={note.isFavorite ? copy.unfavorite : copy.favorite}
            >
              {note.isFavorite ? '★' : '☆'} {copy.favorite}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="rounded-full border border-line bg-paper px-[10px] py-[4px] text-[11px] text-vermilion transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={copy.delete}
            >
              {copy.delete}
            </button>
          </div>
        </div>
      </div>

      <textarea
        value={note.body}
        onChange={(event) => onBodyChange(event.target.value)}
        aria-label="本文"
        className="min-h-[60vh] w-full flex-1 resize-none rounded-[24px] border border-line bg-paper px-[21px] py-[21px] text-[16px] leading-[1.85] text-sumi shadow-sm outline-none transition duration-300 focus:border-gold focus:shadow-[0_0_0_1px_var(--color-gold)]"
        placeholder="..."
      />
    </div>
  )
}
