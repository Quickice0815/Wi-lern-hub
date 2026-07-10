import { useMemo, useState } from 'react';
import { FeedbackBox, PrimaryButton, ProgressBar, SecondaryButton } from '../../components/ui';
import type { ShinglePracticeData } from './data';

// ============================================================
// Interaktive Rechenübung zum Shingle-Algorithmus: Der Nutzer wählt
// aus mehreren Übungen (Textpaaren) frei aus, welche er als
// Nächstes machen möchte — kein erzwungener linearer Ablauf. Jede
// Übung hat vier Schritte: Text A bauen → Text B bauen →
// Schnittmenge markieren → Jaccard berechnen. Erledigte Übungen
// bekommen in der Übersicht einen grünen Haken.
// ============================================================

type Phase = 'buildA' | 'buildB' | 'intersect' | 'calc' | 'roundDone';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function parsePercent(raw: string): number | null {
  const s = raw.trim().replace('%', '').replace(',', '.');
  if (!s) return null;
  const n = Number.parseFloat(s);
  if (Number.isNaN(n)) return null;
  return n <= 1 ? n * 100 : n;
}

export function ShingleLab({ rounds, color, onDone }: { rounds: ShinglePracticeData[]; color: string; onDone: () => void }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const [phase, setPhase] = useState<Phase>('buildA');
  const [filledA, setFilledA] = useState<string[]>([]);
  const [filledB, setFilledB] = useState<string[]>([]);
  const [shakeChip, setShakeChip] = useState<string | null>(null);

  const [selectedShared, setSelectedShared] = useState<Set<string>>(new Set());
  const [sharedChecked, setSharedChecked] = useState(false);
  const [sharedCorrect, setSharedCorrect] = useState(false);

  const [jaccardInput, setJaccardInput] = useState('');
  const [jaccardChecked, setJaccardChecked] = useState(false);
  const [jaccardCorrect, setJaccardCorrect] = useState(false);

  const data = activeIndex !== null ? rounds[activeIndex] : null;

  const unionPool = useMemo(() => {
    if (!data) return [];
    const seen = new Set<string>();
    const result: string[] = [];
    for (const s of [...data.shinglesA, ...data.shinglesB]) {
      if (!seen.has(s)) {
        seen.add(s);
        result.push(s);
      }
    }
    return result;
  }, [data]);

  const buildingA = phase === 'buildA';
  const buildTarget = data ? (buildingA ? data.shinglesA : data.shinglesB) : [];
  const filled = buildingA ? filledA : filledB;
  const nextTarget = buildTarget[filled.length];

  const buildPool = useMemo(() => {
    if (!data || (phase !== 'buildA' && phase !== 'buildB')) return [];
    if (!nextTarget) return [];
    return shuffle([nextTarget, ...data.distractors]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, filled.length, data]);

  function attemptPlace(text: string) {
    if (!data) return;
    if (text === nextTarget) {
      if (buildingA) {
        const next = [...filledA, text];
        setFilledA(next);
        if (next.length === data.shinglesA.length) setPhase('buildB');
      } else {
        const next = [...filledB, text];
        setFilledB(next);
        if (next.length === data.shinglesB.length) setPhase('intersect');
      }
    } else {
      setShakeChip(text);
      setTimeout(() => setShakeChip(null), 420);
    }
  }

  function toggleShared(s: string) {
    if (sharedCorrect) return;
    setSelectedShared((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
    setSharedChecked(false);
  }

  function checkShared() {
    if (!data) return;
    const expected = new Set(data.sharedShingles);
    const ok = expected.size === selectedShared.size && [...expected].every((s) => selectedShared.has(s));
    setSharedChecked(true);
    setSharedCorrect(ok);
  }

  function checkJaccard() {
    if (!data) return;
    const parsed = parsePercent(jaccardInput);
    const ok = parsed !== null && Math.abs(parsed - data.jaccardPercent) < 1;
    setJaccardChecked(true);
    setJaccardCorrect(ok);
    if (ok && activeIndex !== null) {
      setCompleted((prev) => new Set(prev).add(activeIndex));
    }
  }

  function resetRoundState() {
    setPhase('buildA');
    setFilledA([]);
    setFilledB([]);
    setSelectedShared(new Set());
    setSharedChecked(false);
    setSharedCorrect(false);
    setJaccardInput('');
    setJaccardChecked(false);
    setJaccardCorrect(false);
  }

  function openRound(i: number) {
    setActiveIndex(i);
    resetRoundState();
  }

  function backToMenu() {
    setActiveIndex(null);
  }

  const allDone = completed.size === rounds.length;

  if (activeIndex === null || !data) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <ProgressBar value={completed.size / rounds.length} color={color} />
          </div>
          <span className="text-sub text-[12.5px] font-semibold shrink-0">
            {completed.size} / {rounds.length} erledigt
          </span>
        </div>
        <p className="text-[13px] text-sub">Wähle eine Übung aus — in beliebiger Reihenfolge, so oft du willst.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {rounds.map((r, i) => {
            const done = completed.has(i);
            return (
              <button
                key={i}
                onClick={() => openRound(i)}
                className="flex flex-col items-center justify-center gap-1 rounded-xl px-3 py-3.5 text-center transition-colors"
                style={{
                  background: done ? 'color-mix(in srgb, var(--good) 14%, var(--panel-2))' : 'var(--panel-2)',
                  border: `1.5px solid ${done ? 'var(--good)' : 'var(--line)'}`,
                }}
              >
                <span className="text-[15px] font-bold" style={{ color: done ? 'var(--good)' : 'var(--ink)' }}>
                  {done ? '✓ ' : ''}Übung {i + 1}
                </span>
                <span className="text-sub text-[10.5px]">Shingle-Länge {r.n}</span>
              </button>
            );
          })}
        </div>
        {allDone && (
          <FeedbackBox
            isCorrect
            correctLabel="Alle Übungen geschafft!"
            explanation="Du hast alle 8 Textpaare selbst durchgerechnet — genau der Ablauf, den auch eine Suchmaschine beim Duplicate-Content-Check durchläuft."
          />
        )}
        <SecondaryButton onClick={onDone} className="self-start">
          Weiter zum Quiz →
        </SecondaryButton>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <button onClick={backToMenu} className="text-sub text-[12.5px] font-semibold hover:text-ink transition-colors">
          ← Übungsübersicht
        </button>
        <span className="text-sub text-[12.5px] font-semibold shrink-0">
          Übung {activeIndex + 1} / {rounds.length}
        </span>
      </div>

      <p className="text-[13px] text-sub">
        Text A: <span className="text-ink font-semibold">„{data.textA}“</span>
        <br />
        Text B: <span className="text-ink font-semibold">„{data.textB}“</span>
        <br />
        Shingle-Länge: {data.n} Wörter
      </p>

      {(phase === 'buildA' || phase === 'buildB') && (
        <>
          <p className="text-[12.5px] font-bold" style={{ color }}>
            Schritt {phase === 'buildA' ? 1 : 2} von 4 — Baue die Shingles von Text {buildingA ? 'A' : 'B'} (der Reihe
            nach, {filled.length + 1}. von {buildTarget.length})
          </p>
          <div className="flex flex-wrap gap-2">
            {buildTarget.map((s, i) => (
              <ShingleSlot key={s} text={s} status={i < filled.length ? 'solved' : i === filled.length ? 'active' : 'locked'} />
            ))}
          </div>
          <div className="flex flex-wrap gap-2 p-2.5 rounded-xl bg-bg min-h-[52px]" style={{ border: '1px dashed var(--line)' }}>
            {buildPool.map((chip) => (
              <button
                key={chip}
                onClick={() => attemptPlace(chip)}
                className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors ${shakeChip === chip ? 'animate-shake' : ''}`}
                style={{ background: 'var(--panel-2)', border: `1.5px solid ${shakeChip === chip ? 'var(--bad)' : 'var(--line)'}` }}
              >
                {chip}
              </button>
            ))}
          </div>
        </>
      )}

      {phase === 'intersect' && (
        <>
          <p className="text-[12.5px] font-bold" style={{ color }}>
            Schritt 3 von 4 — Klicke alle Shingles an, die in BEIDEN Texten vorkommen (die Schnittmenge)
          </p>
          <div className="flex flex-wrap gap-2">
            {unionPool.map((s) => {
              const picked = selectedShared.has(s);
              const showCorrect = sharedChecked && data.sharedShingles.includes(s);
              const showWrong = sharedChecked && picked && !data.sharedShingles.includes(s);
              return (
                <button
                  key={s}
                  onClick={() => toggleShared(s)}
                  disabled={sharedCorrect}
                  className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-ink transition-colors"
                  style={{
                    background: showCorrect
                      ? 'color-mix(in srgb, var(--good) 18%, var(--panel-2))'
                      : showWrong
                        ? 'color-mix(in srgb, var(--bad) 18%, var(--panel-2))'
                        : picked
                          ? `color-mix(in srgb, ${color} 25%, var(--panel-2))`
                          : 'var(--panel-2)',
                    border: `1.5px solid ${showCorrect ? 'var(--good)' : showWrong ? 'var(--bad)' : picked ? color : 'var(--line)'}`,
                  }}
                >
                  {picked ? '✓ ' : ''}
                  {s}
                </button>
              );
            })}
            {unionPool.length === 0 && <span className="text-sub text-[12.5px]">— (keine Shingles, ungewöhnlicher Fall) —</span>}
          </div>
          <p className="text-sub text-[11.5px]">{unionPool.length} verschiedene Shingles insgesamt = Vereinigungsmenge.</p>
          {!sharedCorrect && (
            <PrimaryButton color={color} onClick={checkShared} className="self-start">
              Prüfen
            </PrimaryButton>
          )}
          {sharedChecked && !sharedCorrect && (
            <FeedbackBox isCorrect={false} wrongLabel="Noch nicht ganz" explanation="Nicht alle markierten Shingles sind richtig — schau dir Text A und B nochmal an und passe deine Auswahl an." />
          )}
          {sharedCorrect && (
            <>
              <FeedbackBox
                isCorrect
                correctLabel="Richtig!"
                explanation={`Schnittmenge = ${data.sharedShingles.length}, Vereinigungsmenge = ${unionPool.length}.`}
              />
              <PrimaryButton color={color} onClick={() => setPhase('calc')} className="self-start">
                Weiter →
              </PrimaryButton>
            </>
          )}
        </>
      )}

      {phase === 'calc' && (
        <>
          <p className="text-[12.5px] font-bold" style={{ color }}>
            Schritt 4 von 4 — Jetzt du: Berechne den Jaccard-Koeffizienten
          </p>
          <p className="text-sub text-[13px]">
            Ü(A,B) = Schnittmenge / Vereinigungsmenge = {data.sharedShingles.length} / {unionPool.length} = ? %
          </p>
          <div className="flex items-center gap-2.5">
            <input
              value={jaccardInput}
              onChange={(e) => {
                setJaccardInput(e.target.value);
                setJaccardChecked(false);
                setJaccardCorrect(false);
              }}
              placeholder="z. B. 20 oder 20%"
              className="rounded-lg px-3 py-2 text-sm text-ink border focus:outline-none w-[160px]"
              style={{
                borderColor: jaccardChecked ? (jaccardCorrect ? 'var(--good)' : 'var(--bad)') : 'var(--line)',
                background: 'var(--panel-2)',
              }}
            />
            {!jaccardCorrect && (
              <PrimaryButton color={color} onClick={checkJaccard}>
                Prüfen
              </PrimaryButton>
            )}
          </div>
          {jaccardChecked && (
            <FeedbackBox
              isCorrect={jaccardCorrect}
              correctLabel="Richtig gerechnet!"
              wrongLabel={`Richtig wäre: ${data.jaccardPercent} %`}
              explanation={`${data.sharedShingles.length} / ${unionPool.length} = ${(data.sharedShingles.length / unionPool.length).toFixed(2)} = ${data.jaccardPercent} %.`}
            />
          )}
          {jaccardChecked && jaccardCorrect && (
            <PrimaryButton color={color} onClick={() => setPhase('roundDone')} className="self-start">
              Fertig →
            </PrimaryButton>
          )}
        </>
      )}

      {phase === 'roundDone' && (
        <>
          <FeedbackBox
            isCorrect
            correctLabel="Übung geschafft!"
            explanation="Zurück zur Übersicht, um eine andere Übung zu machen — oder gleich weiter zum Quiz."
          />
          <div className="flex flex-wrap gap-2.5">
            <PrimaryButton color={color} onClick={backToMenu}>
              ← Zurück zur Übersicht
            </PrimaryButton>
            <SecondaryButton onClick={onDone}>Weiter zum Quiz →</SecondaryButton>
          </div>
        </>
      )}
    </div>
  );
}

function ShingleSlot({ text, status }: { text: string; status: 'solved' | 'active' | 'locked' }) {
  if (status === 'solved') {
    return (
      <span
        className="rounded-lg px-3 py-1.5 text-[13px] font-bold text-ink animate-pop"
        style={{ background: 'color-mix(in srgb, var(--good) 16%, var(--panel-2))', border: '1.5px solid var(--good)' }}
      >
        ✓ {text}
      </span>
    );
  }
  if (status === 'active') {
    return (
      <span
        className="rounded-lg px-3 py-1.5 text-[13px] font-bold text-sub"
        style={{ background: 'var(--panel-2)', border: '2px dashed var(--relation)' }}
      >
        ?
      </span>
    );
  }
  return (
    <span className="rounded-lg px-3 py-1.5 text-[13px] font-bold text-sub opacity-50" style={{ background: 'var(--panel-2)', border: '2px dashed var(--line)' }}>
      🔒
    </span>
  );
}
