import { useEffect, useMemo, useState } from 'react'
import { AppShell } from './components/AppShell'
import { NoteEditor } from './components/NoteEditor'
import { NotesList } from './components/NotesList'
import { copy } from './lib/i18n'
import { loadNotes, saveNotes } from './lib/storage'
import type { Note } from './types/note'

const createNoteId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `note-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

const detectLocale = (): 'ja' | 'en' => {
  if (typeof navigator !== 'undefined' && navigator.language.startsWith('ja')) {
    return 'ja'
  }

  return 'en'
}

const createNewNote = (): Note => {
  const now = new Date().toISOString()
  return {
    id: createNoteId(),
    title: '',
    body: '',
    createdAt: now,
    updatedAt: now,
    isFavorite: false,
    locale: detectLocale(),
  }
}

const sortNotes = (notes: Note[]) => {
  return [...notes].sort((a, b) => {
    if (a.isFavorite !== b.isFavorite) {
      return a.isFavorite ? -1 : 1
    }

    return b.updatedAt.localeCompare(a.updatedAt)
  })
}

const matchesQuery = (note: Note, query: string) => {
  if (!query) {
    return true
  }

  const source = `${note.title} ${note.body}`.toLowerCase()
  return source.includes(query)
}

function App() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes())
  const [activeId, setActiveId] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    saveNotes(notes)
  }, [notes])

  const activeNote = notes.find((note) => note.id === activeId) ?? null


  const visibleNotes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    const filtered = notes.filter((note) => matchesQuery(note, normalizedQuery))
    return sortNotes(filtered)
  }, [notes, query])

  const handleCreate = () => {
    const next = createNewNote()
    setNotes((prev) => [next, ...prev])
    setActiveId(next.id)
  }

  const handleUpdate = (id: string, updates: Partial<Pick<Note, 'title' | 'body' | 'isFavorite'>>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : note,
      ),
    )
  }

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
    setActiveId(null)
  }

  return (
    <AppShell>
      {activeNote ? (
        <NoteEditor
          note={activeNote}
          onBack={() => setActiveId(null)}
          onTitleChange={(value) => handleUpdate(activeNote.id, { title: value })}
          onBodyChange={(value) => handleUpdate(activeNote.id, { body: value })}
          onToggleFavorite={() => handleUpdate(activeNote.id, { isFavorite: !activeNote.isFavorite })}
          onDelete={() => handleDelete(activeNote.id)}
        />
      ) : (
        <NotesList
          notes={visibleNotes}
          totalNotes={notes.length}
          query={query}
          onQueryChange={setQuery}
          onSelect={setActiveId}
          onCreate={handleCreate}
          onToggleFavorite={(id) => {
            const target = notes.find((note) => note.id === id)
            if (target) {
              handleUpdate(id, { isFavorite: !target.isFavorite })
            }
          }}
        />
      )}

      {notes.length === 0 && activeId === null && (
        <p className="sr-only">{copy.emptyTitle}</p>
      )}
    </AppShell>
  )
}

export default App
