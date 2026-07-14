// ============================================================
// STRATEGIE & FÜHRUNG — Datenmodelle für die drei Übungstypen:
// Diagramm-Beschriftung (Achsen/Quadranten), Fallstudien-
// Priorisierung (Drag&Drop in eine Matrix) und Lückentext-Matching.
// Jede Übung gehört zu einer Schwierigkeitsstufe und einem der
// beiden Bereiche (Führung/Strategie) und wird Schritt für Schritt
// bearbeitet (immer nur ein Ziel aktiv).
// ============================================================

export type AreaKey = 'fuehrung' | 'strategie';

export type Difficulty = 'anfaenger' | 'fortgeschritten' | 'profi';

export type Axis = 'x' | 'y';

export interface AxisTerm {
  id: string;
  axis: Axis;
  label: string;
  explanation: string;
}

export interface DiagramSlot {
  id: string;
  label: string;
  explanation: string;
  /** CSS grid-area name, muss zu einer Zeile in diagram.areas passen. */
  area: string;
}

export interface FixedBox {
  label: string;
  area: string;
}

export interface DiagramDef {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  area: AreaKey;
  difficulty: Difficulty;
  /** CSS grid-template-columns Wert */
  columns: string;
  /** CSS grid-template-rows Wert */
  rows: string;
  /** Zeilen für grid-template-areas, je String = eine Zeile mit space-getrennten Bereichsnamen */
  areas: string[];
  axisTerms: AxisTerm[];
  slots: DiagramSlot[];
  fixedBoxes?: FixedBox[];
  /** Zusätzliche falsche Achsenbegriffe, nur im jeweiligen Achsen-Schritt sichtbar. */
  axisDistractors?: string[];
  /** Zusätzliche falsche Feldbegriffe, nur in Feld-Schritten sichtbar. */
  slotDistractors?: string[];
  accent: string;
}

export interface PriorityQuadrant {
  id: string;
  title: string;
  hint: string;
  area: string;
}

export interface PriorityItem {
  id: string;
  label: string;
  correctQuadrant: string;
  explanation: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  scenario: string;
  instructions: string;
  area: AreaKey;
  difficulty: Difficulty;
  columns: string;
  rows: string;
  areas: string[];
  quadrants: PriorityQuadrant[];
  items: PriorityItem[];
  accent: string;
}

export interface TermBlank {
  id: string;
  /** Text-Segment vor dieser Lücke */
  before: string;
  correctTermId: string;
}

export interface TermMatchSet {
  id: string;
  title: string;
  intro: string;
  area: AreaKey;
  difficulty: Difficulty;
  /** Segmente in Reihenfolge; letztes Segment hat keine Lücke danach (tail-Text) */
  blanks: TermBlank[];
  tail: string;
  terms: { id: string; text: string }[];
  distractors?: { id: string; text: string }[];
  accent: string;
}

export const DIFFICULTY_INFO: Record<Difficulty, { label: string; desc: string }> = {
  anfaenger: { label: 'Anfänger', desc: 'Bekannte, leicht verständliche Beispiele mit viel Führung.' },
  fortgeschritten: { label: 'Fortgeschritten', desc: 'Mehr Fachbegriffe, etwas weniger Hilfestellung.' },
  profi: { label: 'Profi', desc: 'Komplexere Anwendungsfälle und mehr Ablenker.' },
};
