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
      <span className="note-accent-line absolute left-[16px] top-[21px] h-[70%] w-[2px] rounded-full" aria-hidden="true" />
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(note.id)}
        onKeyDown={handleKeyDown}
        className="group w-full rounded-[24px] border border-line bg-paper px-[24px] py-[21px] text-left shadow-sm transition duration-300 hover:-translate-y-[2px] hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label={title}
      >
        <div className="flex items-start justify-between gap-[21px]">
          <div className="space-y-[8px]">
            <div className="flex items-center gap-[6px]">
              {note.isFavorite && (
                <>
                  <span className="h-[6px] w-[6px] rounded-full bg-gold opacity-70" aria-hidden="true" />
                  <span className="sr-only">{copy.favorite}</span>
                </>
              )}
              <h3 className="font-serif text-[18px] text-sumi">{title}</h3>
            </div>
            <p className="max-h-[52px] overflow-hidden text-[13px] leading-[1.7] text-ink-muted">
              {preview}
            </p>
          </div>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              onToggleFavorite(note.id)
            }}
            className={`rounded-full border border-line bg-paper px-[8px] py-[4px] text-[12px] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
              note.isFavorite ? 'text-gold' : 'text-ink-muted'
            }`}
            aria-label={note.isFavorite ? copy.unfavorite : copy.favorite}
          >
            {note.isFavorite ? '★' : '☆'}
          </button>
        </div>
        <div className="mt-[16px] text-[11px] text-ink-muted">
          {formatNoteDate(note.updatedAt, note.locale ?? 'ja')}
        </div>
      </div>
    </article>
  )
}
