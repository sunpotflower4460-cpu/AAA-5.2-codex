import type { Note } from '../types/note'

const STORAGE_KEY = 'zanshin.notes.v1'

const hasStorage = () => typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

const isNote = (value: unknown): value is Note => {
  if (!value || typeof value !== 'object') {
    return false
  }

  const record = value as Record<string, unknown>

  return (
    typeof record.id === 'string' &&
    typeof record.title === 'string' &&
    typeof record.body === 'string' &&
    typeof record.createdAt === 'string' &&
    typeof record.updatedAt === 'string' &&
    typeof record.isFavorite === 'boolean' &&
    (record.locale === undefined || record.locale === 'ja' || record.locale === 'en')
  )
}

export const loadNotes = (): Note[] => {
  if (!hasStorage()) {
    return []
  }

  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return []
  }

  try {
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }

    if (!parsed.every(isNote)) {
      return []
    }

    return parsed
  } catch {
    return []
  }
}

export const saveNotes = (notes: Note[]): void => {
  if (!hasStorage()) {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  } catch {
    // ignore write errors
  }
}
