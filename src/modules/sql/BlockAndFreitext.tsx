import { useEffect, useRef, useState } from 'react';
import type { SqlLevel } from './data';
import { checkFreitextSQL, shuffledBlocks } from './sqlValidator';
import { PrimaryButton } from '../../components/ui';

// ============================================================
// SQL-TRAINER — Phase 1: Baustein-Modus
// Portiert aus SqlBlockBuilderView (SqlBlockAndFreitextView.swift)
// ============================================================
export function SqlBlockBuilder({
  level,
  onComplete,
}: {
  level: SqlLevel;
  onComplete: (stars: number) => void;
}) {
  const [pool, setPool] = useState<{ id: string; text: string }[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [shake, setShake] = useState(false);
  const timers = useRef<number[]>([]);

  function reset() {
    setPool(shuffledBlocks(level.blocks));
    setSlots([]);
    setMistakes(0);
    setShake(false);
  }

  useEffect(() => {
    reset();
    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [level.id]);

  const expectedNext = level.blocks[slots.length];

  function pick(block: { id: string; text: string }) {
    if (block.text === expectedNext) {
      const nextSlots = [...slots, block.text];
      setSlots(nextSlots);
      setPool((p) => p.filter((b) => b.id !== block.id));
      if (nextSlots.length === level.blocks.length) {
        const stars = mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1;
        const t = window.setTimeout(() => onComplete(stars), 700);
        timers.current.push(t);
      }
    } else {
      setMistakes((m) => m + 1);
      setShake(true);
      const t = window.setTimeout(() => setShake(false), 350);
      timers.current.push(t);
    }
  }

  const done = slots.length >= level.blocks.length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-sql-cyan text-[11px] font-bold">DEINE ANWEISUNG</p>
        <div
          className="rounded-[10px] p-4 flex flex-col gap-1 min-h-[100px]"
          style={{
            backgroundColor: '#0d1117',
            border: `1px solid ${shake ? '#f43f5e' : 'var(--line)'}`,
            transition: 'border-color 0.15s ease',
          }}
        >
          {slots.length === 0 && <p className="text-sub text-[13px]">Tippe unten den ersten Baustein an…</p>}
          {slots.map((s, i) => (
            <span key={i} className="font-mono text-[13px]" style={{ color: '#6ee7b7' }}>
              {s}
            </span>
          ))}
          {!done && <p className="text-sub text-[13px]">▾ als nächstes erwartet…</p>}
        </div>
      </div>

      {!done ? (
        <div className="flex flex-col gap-2">
          <p className="text-sub text-[11px] font-bold">BAUSTEINE — IN DER RICHTIGEN REIHENFOLGE ANTIPPEN</p>
          <div className="flex flex-wrap gap-2">
            {pool.map((block) => (
              <button
                key={block.id}
                onClick={() => pick(block)}
                className="font-mono text-xs px-3 py-2 rounded-md bg-panel-2 border border-line text-ink hover:border-sql-cyan/60 transition-colors"
              >
                {block.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-[13.5px] font-bold" style={{ color: '#6ee7b7' }}>
          ✓ Struktur komplett — weiter zur Freitext-Phase…
        </p>
      )}

      <div className="flex items-center gap-3">
        <span className="text-sub text-xs">Fehlversuche: {mistakes}</span>
        <div className="flex-1" />
        <button onClick={reset} className="text-sql-cyan text-xs font-semibold hover:underline">
          Neu starten
        </button>
      </div>
    </div>
  );
}

// ============================================================
// SQL-TRAINER — Phase 2: Freitext-Modus
// Portiert aus SqlFreitextEditorView
// ============================================================
export function SqlFreitextEditor({
  level,
  onComplete,
  hideHints = false,
}: {
  level: SqlLevel;
  onComplete: (stars: number) => void;
  hideHints?: boolean;
}) {
  const [value, setValue] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<'correct' | 'wrong' | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [hintIndex, setHintIndex] = useState(-1);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    setValue('');
    setAttempts(0);
    setStatus(null);
    setMessage(null);
    setHintIndex(-1);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [level.id]);

  function submit() {
    if (!value.trim()) return;
    const result = checkFreitextSQL(value, level);
    setAttempts((a) => a + 1);
    setMessage(result.message);
    if (result.correct) {
      setStatus('correct');
      const stars = attempts === 0 ? 3 : attempts <= 1 ? 2 : 1;
      timer.current = window.setTimeout(() => onComplete(stars), 600);
    } else {
      setStatus('wrong');
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sql-cyan text-[11px] font-bold">
        {hideHints ? 'SQL-ANWEISUNG EINGEBEN' : 'JETZT FREI EINGEBEN — DIE SYNTAX WIRD GEPRÜFT'}
      </p>

      <textarea
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setStatus(null);
        }}
        spellCheck={false}
        placeholder={"SELECT ... FROM ... WHERE ..."}
        className="font-mono text-[13px] text-ink rounded-[10px] p-2 h-[130px] resize-none outline-none border border-line focus:border-sql-cyan/60"
        style={{ backgroundColor: '#0d1117' }}
      />

      <div className="flex items-center gap-3 flex-wrap">
        <PrimaryButton color="#22d3ee" textColor="#06210f" onClick={submit}>
          Prüfen
        </PrimaryButton>
        {!hideHints && (
          <button
            onClick={() => setHintIndex((h) => Math.min(h + 1, level.hints.length - 1))}
            className="text-[13px] font-semibold hover:underline"
            style={{ color: '#fbbf24' }}
          >
            Hinweis ({Math.min(hintIndex + 1, level.hints.length)}/{level.hints.length})
          </button>
        )}
        <div className="flex-1" />
        <span className="text-sub text-xs">Versuche: {attempts}</span>
      </div>

      {!hideHints && hintIndex >= 0 && (
        <div className="flex flex-col gap-1.5">
          {level.hints.slice(0, hintIndex + 1).map((h, i) => (
            <p
              key={i}
              className="text-xs px-3 py-2 rounded-md"
              style={{ color: '#fcd34d', backgroundColor: 'rgba(120,53,15,0.3)', border: '1px solid rgba(146,64,14,0.4)' }}
            >
              💡 {h}
            </p>
          ))}
        </div>
      )}

      {status === 'wrong' && message && (
        <p
          className="text-[13px] px-3 py-2 rounded-md"
          style={{ color: '#fca5a5', backgroundColor: 'rgba(127,29,29,0.3)', border: '1px solid rgba(185,28,28,0.4)' }}
        >
          {message}
        </p>
      )}
      {status === 'correct' && (
        <p
          className="text-[13px] px-3 py-2 rounded-md"
          style={{ color: '#6ee7b7', backgroundColor: 'rgba(6,78,59,0.4)', border: '1px solid rgba(16,185,129,0.4)' }}
        >
          ✓ Exakt richtig!
        </p>
      )}
    </div>
  );
}

// ============================================================
// SQL-TRAINER — Lösungsanzeige
// Portiert aus SqlSolutionRevealView
// ============================================================
export function SqlSolutionReveal({
  level,
  starsBlocks,
  starsFreitext,
  onNext,
  isLast,
}: {
  level: SqlLevel;
  starsBlocks: number;
  starsFreitext: number;
  onNext: () => void;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-[11px] font-bold" style={{ color: '#6ee7b7' }}>
        MUSTERLÖSUNG
      </p>
      <div className="rounded-[10px] p-4 flex flex-col gap-0.5" style={{ backgroundColor: '#0d1117', border: '1px solid var(--line)' }}>
        {level.solutionLines.map((line, i) => (
          <span key={i} className="font-mono text-[13px] whitespace-pre" style={{ color: '#6ee7b7' }}>
            {line}
          </span>
        ))}
      </div>

      <div className="flex gap-6 flex-wrap">
        <span className="text-ink text-sm">
          Bausteine: {'★'.repeat(starsBlocks)}
          {'☆'.repeat(3 - starsBlocks)}
        </span>
        <span className="text-ink text-sm">
          Freitext: {'★'.repeat(starsFreitext)}
          {'☆'.repeat(3 - starsFreitext)}
        </span>
      </div>

      <PrimaryButton color="#10b981" textColor="#06210f" onClick={onNext}>
        {isLast ? 'Zur Übersicht' : 'Nächstes Level →'}
      </PrimaryButton>
    </div>
  );
}
