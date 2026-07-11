import { useState } from 'react';
import type { SapFormChallenge } from '../types';

// ============================================================
// Vereinfachter Nachbau eines SAP-Fiori-Bildschirms: Der Nutzer
// füllt nur die relevanten Felder aus, wählt ggf. den passenden
// offenen Posten und klickt die nötigen Buttons — genau wie in
// der echten Klausuraufgabe ("Nur Screenshoteinträge werden gewertet").
// ============================================================

function normalize(v: string) {
  return v.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** Erkennt Datumsangaben in gängigen Schreibweisen (dd.mm.yyyy, d/m/yyyy, yyyy-mm-dd, …). */
function parseDateParts(v: string): { d: number; m: number; y: number } | null {
  const s = v.trim();
  let m = s.match(/^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})$/);
  if (m) return { d: Number(m[1]), m: Number(m[2]), y: Number(m[3]) };
  m = s.match(/^(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})$/);
  if (m) return { d: Number(m[3]), m: Number(m[2]), y: Number(m[1]) };
  return null;
}

/** Erkennt Beträge in gängigen Schreibweisen (1234,56 / 1.234,56 / 1234.56 / 1234). */
function parseAmount(v: string): number | null {
  const s = v.trim().replace(/\s/g, '').replace(/€|eur/gi, '');
  if (!s || !/^-?[\d.,]+$/.test(s)) return null;
  let normalized = s;
  if (s.includes(',') && s.includes('.')) normalized = s.replace(/\./g, '').replace(',', '.');
  else if (s.includes(',')) normalized = s.replace(',', '.');
  const n = Number.parseFloat(normalized);
  return Number.isNaN(n) ? null : n;
}

function matches(value: string, expected: string | string[]) {
  const candidates = Array.isArray(expected) ? expected : [expected];
  const v = value.trim();
  if (v === '') return false;
  return candidates.some((c) => {
    if (normalize(c) === normalize(v)) return true;
    const cd = parseDateParts(c);
    const vd = parseDateParts(v);
    if (cd && vd) return cd.d === vd.d && cd.m === vd.m && cd.y === vd.y;
    const ca = parseAmount(c);
    const va = parseAmount(v);
    if (ca !== null && va !== null) return ca === va;
    return false;
  });
}

function expectedDisplay(expected: string | string[]) {
  return Array.isArray(expected) ? expected[0] : expected;
}

export function SapFormFill({
  challenge,
  color,
  onComplete,
}: {
  challenge: SapFormChallenge;
  color: string;
  onComplete: () => void;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [clicked, setClicked] = useState<Set<string>>(new Set());
  const [selectedOpenItem, setSelectedOpenItem] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const groups = Array.from(new Set(challenge.fields.map((f) => f.group)));

  function fieldStatus(fieldId: string): 'correct' | 'wrong' | null {
    if (!checked) return null;
    const field = challenge.fields.find((f) => f.id === fieldId)!;
    const value = values[fieldId] ?? '';
    if (field.expected === null) return value.trim() === '' ? 'correct' : 'wrong';
    return matches(value, field.expected) ? 'correct' : 'wrong';
  }

  function buttonStatus(buttonId: string): 'correct' | 'wrong' | null {
    if (!checked) return null;
    return clicked.has(buttonId) ? 'correct' : 'wrong';
  }

  function openItemStatus(): 'correct' | 'wrong' | null {
    if (!checked || !challenge.openItemChoices) return null;
    const chosen = challenge.openItemChoices.find((c) => c.id === selectedOpenItem);
    return chosen?.correct ? 'correct' : 'wrong';
  }

  const allFieldsCorrect = challenge.fields.every((f) => {
    const value = values[f.id] ?? '';
    return f.expected === null ? value.trim() === '' : matches(value, f.expected);
  });
  const allButtonsClicked = challenge.buttons.every((b) => clicked.has(b.id));
  const openItemOk = !challenge.openItemChoices || challenge.openItemChoices.find((c) => c.id === selectedOpenItem)?.correct;
  const allCorrect = allFieldsCorrect && allButtonsClicked && !!openItemOk;

  function statusStyle(status: 'correct' | 'wrong' | null) {
    if (status === 'correct') return { borderColor: 'var(--good)', background: 'color-mix(in srgb, var(--good) 10%, var(--panel-2))' };
    if (status === 'wrong') return { borderColor: 'var(--bad)', background: 'color-mix(in srgb, var(--bad) 10%, var(--panel-2))' };
    return { borderColor: 'var(--line)', background: 'var(--panel-2)' };
  }

  function reset() {
    setValues({});
    setClicked(new Set());
    setSelectedOpenItem(null);
    setChecked(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[13.5px] text-ink/85 leading-relaxed">{challenge.scenario}</p>
      <p className="text-[12.5px] font-semibold" style={{ color }}>
        {challenge.instructions}
      </p>
      {challenge.fields.some((f) => f.required) && (
        <p className="text-[11px] text-sub -mt-2">
          <span style={{ color: 'var(--bad)' }}>*</span> Pflichtfeld
        </p>
      )}

      {/* SAP-Bildschirm-Nachbau */}
      <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--line)' }}>
        <div className="px-4 py-2.5 flex items-center gap-2 text-white text-[13px] font-bold" style={{ background: color }}>
          <span className="opacity-80">SAP</span>
          <span>{challenge.screenTitle}</span>
        </div>

        <div className="p-4 flex flex-col gap-4 bg-bg">
          {challenge.givenFields.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {challenge.givenFields.map((g) => (
                <label key={g.label} className="flex flex-col gap-1">
                  <span className="text-[11px] font-semibold text-sub">{g.label}</span>
                  <input
                    value={g.value}
                    disabled
                    className="rounded-lg px-3 py-2 text-sm text-sub border"
                    style={{ borderColor: 'var(--line)', background: 'var(--panel)' }}
                  />
                </label>
              ))}
            </div>
          )}

          {groups.map((group) => (
            <div key={group} className="flex flex-col gap-2.5">
              <p className="text-[11px] font-bold tracking-wide text-sub">{group.toUpperCase()}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {challenge.fields
                  .filter((f) => f.group === group)
                  .map((field) => {
                    const status = fieldStatus(field.id);
                    return (
                      <label key={field.id} className="flex flex-col gap-1">
                        <span className="text-[11px] font-semibold text-sub">
                          {field.label}
                          {field.required && (
                            <span style={{ color: 'var(--bad)' }} aria-hidden>
                              {' '}
                              *
                            </span>
                          )}
                        </span>
                        {field.kind === 'select' ? (
                          <select
                            value={values[field.id] ?? ''}
                            onChange={(e) => {
                              setValues((v) => ({ ...v, [field.id]: e.target.value }));
                              setChecked(false);
                            }}
                            className="rounded-lg px-3 py-2 text-sm text-ink border focus:outline-none"
                            style={statusStyle(status)}
                          >
                            <option value="">— auswählen —</option>
                            {field.options?.map((o) => (
                              <option key={o} value={o}>
                                {o}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            value={values[field.id] ?? ''}
                            onChange={(e) => {
                              setValues((v) => ({ ...v, [field.id]: e.target.value }));
                              setChecked(false);
                            }}
                            placeholder="…"
                            className="rounded-lg px-3 py-2 text-sm text-ink border focus:outline-none"
                            style={statusStyle(status)}
                          />
                        )}
                        {status === 'wrong' && (
                          <span className="text-[11px]" style={{ color: 'var(--bad)' }}>
                            {field.expected === null
                              ? 'Sollte für diese Aufgabe leer bleiben.'
                              : `Richtig wäre: ${expectedDisplay(field.expected)}`}
                          </span>
                        )}
                      </label>
                    );
                  })}
              </div>
            </div>
          ))}

          {challenge.openItemChoices && (
            <div className="flex flex-col gap-2.5">
              <p className="text-[11px] font-bold tracking-wide text-sub">
                {(challenge.openItemsLabel ?? 'OFFENE POSTEN').toUpperCase()}
              </p>
              <div className="flex flex-col gap-2">
                {challenge.openItemChoices.map((choice) => {
                  const isSelected = selectedOpenItem === choice.id;
                  const status = checked && isSelected ? openItemStatus() : null;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => {
                        setSelectedOpenItem(choice.id);
                        setChecked(false);
                      }}
                      className="text-left px-3 py-2 rounded-lg text-[13px] text-ink border transition-colors"
                      style={
                        status
                          ? statusStyle(status)
                          : { borderColor: isSelected ? color : 'var(--line)', background: 'var(--panel-2)' }
                      }
                    >
                      {choice.label}
                    </button>
                  );
                })}
              </div>
              {checked && openItemStatus() === 'wrong' && (
                <span className="text-[11px]" style={{ color: 'var(--bad)' }}>
                  Richtig wäre: {challenge.openItemChoices.find((c) => c.correct)?.label}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2.5 pt-1">
            {challenge.buttons.map((b) => {
              const status = buttonStatus(b.id);
              const isClicked = clicked.has(b.id);
              return (
                <button
                  key={b.id}
                  onClick={() => {
                    setClicked((prev) => {
                      const next = new Set(prev);
                      if (next.has(b.id)) next.delete(b.id);
                      else next.add(b.id);
                      return next;
                    });
                    setChecked(false);
                  }}
                  className="px-3.5 py-2 rounded-lg text-[12.5px] font-bold border transition-colors"
                  style={
                    status
                      ? statusStyle(status)
                      : {
                          borderColor: isClicked ? color : 'var(--line)',
                          background: isClicked ? `color-mix(in srgb, ${color} 18%, var(--panel-2))` : 'var(--panel-2)',
                          color: 'var(--ink)',
                        }
                  }
                >
                  {isClicked ? '✓ ' : ''}
                  {b.label}
                </button>
              );
            })}
          </div>
          {checked && !allButtonsClicked && (
            <span className="text-[11px]" style={{ color: 'var(--bad)' }}>
              Noch anzuklicken: {challenge.buttons.filter((b) => !clicked.has(b.id)).map((b) => b.label).join(', ')}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {!allCorrect || !checked ? (
          <>
            <button className="btn-primary" style={{ background: color }} onClick={() => setChecked(true)}>
              Prüfen
            </button>
            <button className="btn-secondary" onClick={reset}>
              Zurücksetzen
            </button>
          </>
        ) : (
          <button className="btn-primary" style={{ background: color }} onClick={onComplete}>
            Weiter →
          </button>
        )}
      </div>

      {checked && !allCorrect && (
        <p className="text-[13px] font-semibold" style={{ color: 'var(--bad)' }}>
          ❌ Noch nicht ganz richtig — bei den rot markierten Feldern steht direkt darunter, was richtig wäre.
        </p>
      )}

      {checked && allCorrect && (
        <div
          className="rounded-[10px] p-3.5 text-[13px] leading-relaxed animate-fade-in-up"
          style={{
            background: 'color-mix(in srgb, var(--good) 10%, transparent)',
            border: '1px solid color-mix(in srgb, var(--good) 40%, transparent)',
          }}
        >
          <p className="font-bold text-ink mb-1">✅ Richtig!</p>
          <p className="text-ink/85">{challenge.explanation}</p>
        </div>
      )}
    </div>
  );
}
