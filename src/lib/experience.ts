// Anni di esperienza calcolati alla data della visita, così la cifra non invecchia.
// Inizio carriera: gennaio 2015 (Cyber Coconut). Cambiare qui se la data di partenza cambia.
export const CAREER_START = new Date(2015, 0, 1)

export function yearsOfExperience(from: Date = CAREER_START, now: Date = new Date()): number {
  let years = now.getFullYear() - from.getFullYear()
  const monthDelta = now.getMonth() - from.getMonth()
  if (monthDelta < 0 || (monthDelta === 0 && now.getDate() < from.getDate())) {
    years -= 1
  }
  return Math.max(years, 0)
}

// Sostituisce il numero di anni nei testi che arrivano dal CMS.
// Riconosce il placeholder {{years}} e le formule "N years of experience" / "N+ years of experience".
export function withYears(text: string, years: number = yearsOfExperience()): string {
  return text
    .replace(/\{\{\s*years\s*\}\}/g, String(years))
    .replace(/\b\d+\+?(?=\s+years\s+of\s+experience\b)/gi, `${years}+`)
}
