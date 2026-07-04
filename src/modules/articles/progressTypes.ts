// Persistierter Fortschritt für das Artikel-Modul: bester Quiz-Score je
// Artikel plus ob die Anwendungsaufgabe abgeschlossen wurde.
export type ArticlesProgress = Record<
  string,
  { bestScore: number; total: number; workedDone?: boolean }
>;
