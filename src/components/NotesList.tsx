import type { Note } from '../types/note'
import { copy } from '../lib/i18n'
import { EmptyState } from './EmptyState'
import { NoteCard } from './NoteCard'
import { SearchBar } from './SearchBar'

type NotesListProps = {
  notes: Note[]
  totalNotes: number
  query: string
  onQueryChange: (value: string) => void
  onSelect: (id: string) => void
  onCreate: () => void
  onToggleFavorite: (id: string) => void
}

export const NotesList = ({
  notes,
  totalNotes,
  query,
  onQueryChange,
  onSelect,
  onCreate,
  onToggleFavorite,
}: NotesListProps) => {
  return (
    <div className="relative flex min-h-screen flex-col gap-[34px] pb-[89px]">
      <header className="space-y-[13px]">
        <div className="space-y-[4px]">
          <p className="text-[12px] uppercase tracking-[0.4em] text-ink-muted">{copy.appName}</p>
          <h1 className="font-serif text-[28px] text-sumi">{copy.appSubtitle}</h1>
        </div>
        <div className="space-y-[4px] text-[13px] text-ink-muted">
          <p>{copy.tagline}</p>
          <p>{copy.taglineEn}</p>
        </div>
      </header>

      <SearchBar value={query} onChange={onQueryChange} />

      {totalNotes === 0 ? (
        <EmptyState onCreate={onCreate} />
      ) : notes.length === 0 ? (
        <div className="rounded-[21px] border border-line bg-paper px-[21px] py-[21px] text-center text-[13px] text-ink-muted">
          <p>該当する言葉がまだ見つかりません。</p>
          <p className="mt-[8px]">No words match yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-[13px]">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onSelect={onSelect} onToggleFavorite={onToggleFavorite} />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={onCreate}
        className="fixed bottom-[21px] right-[21px] flex h-[55px] w-[55px] items-center justify-center rounded-full border border-line bg-washi text-[20px] text-sumi shadow-soft transition duration-300 hover:-translate-y-[2px] md:right-[calc(50%-360px+21px)]"
        aria-label={copy.newNote}
      >
        +
      </button>
    </div>
  )
}
