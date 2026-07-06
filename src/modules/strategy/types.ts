// ============================================================
// STRATEGIE & FÜHRUNG — Datenmodelle für die drei Übungstypen:
// Diagramm-Beschriftung (Achsen/Quadranten), Fallstudien-
// Priorisierung (Drag&Drop in eine Matrix) und Lückentext-Matching.
// ============================================================

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
  /** CSS grid-template-columns Wert */
  columns: string;
  /** CSS grid-template-rows Wert */
  rows: string;
  /** Zeilen für grid-template-areas, je String = eine Zeile mit space-getrennten Bereichsnamen */
  areas: string[];
  axisTerms: AxisTerm[];
  slots: DiagramSlot[];
  fixedBoxes?: FixedBox[];
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
  /** Segmente in Reihenfolge; letztes Segment hat keine Lücke danach (tail-Text) */
  blanks: TermBlank[];
  tail: string;
  terms: { id: string; text: string }[];
  distractors?: { id: string; text: string }[];
  accent: string;
}
