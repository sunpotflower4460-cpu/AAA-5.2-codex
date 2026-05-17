import type { KeyboardEvent } from 'react'
import type { Note } from '../types/note'
import { formatNoteDate } from '../lib/date'
import { copy } from '../lib/i18n'

type NoteCardProps = {
  note: Note
  onSelect: (id: string) => void
  onToggleFavorite: (id: string) => void
}

export const NoteCard = ({ note, onSelect, onToggleFavorite }: NoteCardProps) => {
  const title = note.title.trim() || copy.untitled
  const preview = note.body.trim() || copy.taglineEn

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onSelect(note.id)
    }
  }

  return (
    <article className="relative">
      <span className="absolute left-[13px] top-[21px] h-[65%] w-[2px] rounded-full bg-line" aria-hidden="true" />
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(note.id)}
        onKeyDown={handleKeyDown}
        className="w-full rounded-[21px] border border-line bg-paper px-[21px] py-[21px] text-left shadow-sm transition duration-300 hover:-translate-y-[1px]"
        aria-label={title}
      >
        <div className="flex items-start justify-between gap-[13px]">
          <div className="space-y-[6px]">
            <h3 className="font-serif text-[18px] text-sumi">{title}</h3>
            <p className="max-h-[48px] overflow-hidden text-[13px] leading-relaxed text-ink-muted">
              {preview}
            </p>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onToggleFavorite(note.id)
            }}
            className={`rounded-full border border-line px-[8px] py-[4px] text-[12px] transition duration-300 ${
              note.isFavorite ? 'text-gold' : 'text-ink-muted'
            }`}
            aria-label={note.isFavorite ? copy.unfavorite : copy.favorite}
          >
            {note.isFavorite ? '★' : '☆'}
          </button>
        </div>
        <div className="mt-[13px] text-[11px] text-ink-muted">
          {formatNoteDate(note.updatedAt, note.locale ?? 'ja')}
        </div>
      </div>
    </article>
  )
}
