const DAY_MS = 24 * 60 * 60 * 1000

const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const formatNoteDate = (value: string, locale: 'ja' | 'en' = 'ja'): string => {
  const target = new Date(value)
  if (Number.isNaN(target.getTime())) {
    return ''
  }

  const today = startOfDay(new Date())
  const targetDay = startOfDay(target)
  const diffDays = Math.round((today.getTime() - targetDay.getTime()) / DAY_MS)

  if (diffDays === 0) {
    return locale === 'en' ? 'Today' : '今日'
  }

  if (diffDays === 1) {
    return locale === 'en' ? 'Yesterday' : '昨日'
  }

  const year = target.getFullYear()
  const month = String(target.getMonth() + 1).padStart(2, '0')
  const day = String(target.getDate()).padStart(2, '0')

  return `${year}/${month}/${day}`
}
