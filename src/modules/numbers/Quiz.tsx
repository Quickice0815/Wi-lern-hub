import { useEffect, useState } from 'react';
import type { NumSystem, NumQuestion } from './data';
import { makeQuestion } from './data';
import { PrimaryButton, SecondaryButton, TagPill } from '../../components/ui';
import { MayaNumberView, SymbolLegend } from './Glyphs';
import { GlyphText, SysFlag } from './PictoGlyphs';

// ============================================================
// ENDLOS-QUIZ — Pendant zu NumQuizView (NumQuizView.swift).
// Drei Fragetypen (Konvertierung, Rückrechnung, Logik & Grenzen)
// werden zufällig generiert; nach jeder Antwort direkt Feedback +
// "Nächste Frage" — es gibt kein Ende, keine Fragenanzahl-Grenze.
// ============================================================

const PRAISE = ['Stark!', 'Richtig!', 'Perfekt!', 'Sehr gut!', 'Genau!', 'Top!'];

export function Quiz({
  sys,
  onMenu,
  onAnswer,
}: {
  sys: NumSystem;
  onMenu: () => void;
  onAnswer?: (correct: boolean, streakAfter: number) => void;
}) {
  const [question, setQuestion] = useState<NumQuestion>(() => makeQuestion(sys.id));
  const [picked, setPicked] = useState<number | null>(null);
  const [inputText, setInputText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [right, setRight] = useState(0);
  const [total, setTotal] = useState(0);
  const [praiseText, setPraiseText] = useState(PRAISE[0]);

  // Systemwechsel: Quiz-Zustand zurücksetzen und neue Frage für das
  // aktuelle System ziehen (mirrors .onAppear in NumQuizView).
  useEffect(() => {
    setQuestion(makeQuestion(sys.id));
    setPicked(null);
    setInputText('');
    setSubmitted(false);
  }, [sys.id]);

  const isCorrect = submitted
    ? question.isInput
      ? /^-?\d+$/.test(inputText.trim()) && Number(inputText.trim()) === question.correctValue
      : picked === question.correctIndex
    : false;

  // Gemeinsame Auswertung für beide Fragearten — wird sofort nach der
  // Eingabe/Auswahl aufgerufen (kein separater "Bestätigen"-Schritt nötig
  // bei Multiple-Choice, wie im Original).
  function evaluate(correctNow: boolean) {
    if (submitted) return;
    setSubmitted(true);
    setTotal((t) => t + 1);
    const newStreak = correctNow ? streak + 1 : 0;
    if (correctNow) {
      setRight((r) => r + 1);
      setStreak(newStreak);
      setPraiseText(PRAISE[Math.floor(Math.random() * PRAISE.length)]);
    } else {
      setStreak(0);
    }
    onAnswer?.(correctNow, newStreak);
  }

  function submit() {
    evaluate(/^-?\d+$/.test(inputText.trim()) && Number(inputText.trim()) === question.correctValue);
  }

  function pick(oi: number) {
    if (submitted) return;
    setPicked(oi);
    evaluate(oi === question.correctIndex);
  }

  function next() {
    setQuestion(makeQuestion(sys.id));
    setPicked(null);
    setInputText('');
    setSubmitted(false);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="leading-none h-[22px] flex items-center">
          <SysFlag id={sys.id} flag={sys.flag} size={20} />
        </span>
        <span className="text-ink font-bold text-[15px]">{sys.name}</span>
        <TagPill text={question.typeLabel} color={sys.color} />
        <div className="flex-1" />
        <span className="text-xs" style={{ color: streak > 0 ? 'var(--good)' : 'var(--sub)' }}>
          🔥 {streak}
        </span>
        <span className="text-sub text-xs">
          ✓ {right}/{total}
        </span>
      </div>

      <SymbolLegend sys={sys} />

      <div className="card p-[22px] flex flex-col gap-4">
        <p className="text-ink font-bold text-[17px] leading-snug">{question.q}</p>

        {question.isInput ? (
          <>
            <div className="bg-bg rounded-[10px] py-5 px-5 flex items-center justify-center">
              {question.sysID === 'maya' && question.displayDigits ? (
                <MayaNumberView digits={question.displayDigits} color="var(--ink)" scale={1} />
              ) : (
                <GlyphText
                  text={question.display ?? ''}
                  size={24}
                  color="var(--ink)"
                  gap={2}
                  style={{ color: 'var(--ink)', fontSize: 26, justifyContent: 'center' }}
                />
              )}
            </div>

            {!submitted && (
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && inputText !== '') submit();
                  }}
                  inputMode="numeric"
                  placeholder="Dezimalzahl eingeben…"
                  className="flex-1 min-w-[160px] bg-bg border border-line rounded-[10px] px-3 py-3 text-ink placeholder:text-sub outline-none focus:border-[color:var(--line)]"
                />
                <PrimaryButton
                  color={inputText === '' ? 'var(--panel-2)' : sys.color}
                  textColor={inputText === '' ? 'var(--sub)' : '#fff'}
                  onClick={submit}
                  disabled={inputText === ''}
                >
                  Prüfen
                </PrimaryButton>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-[9px]">
            {question.options.map((opt, oi) => (
              <OptionRow
                key={oi}
                oi={oi}
                opt={opt}
                question={question}
                picked={picked}
                submitted={submitted}
                onPick={pick}
              />
            ))}
          </div>
        )}

        {submitted && (
          <FeedbackView question={question} isCorrect={isCorrect} praiseText={praiseText} />
        )}
      </div>

      {submitted ? (
        <div className="flex items-center gap-3 flex-wrap">
          <SecondaryButton onClick={onMenu}>← Hauptmenü (Systeme)</SecondaryButton>
          <div className="flex-1" />
          <PrimaryButton color={sys.color} onClick={next}>
            Nächste Frage →
          </PrimaryButton>
        </div>
      ) : (
        <button
          onClick={onMenu}
          className="self-start text-sub text-[13px] px-3.5 py-2.5 rounded-lg border border-line hover:text-ink transition-colors"
        >
          ← Andere Systeme
        </button>
      )}
    </div>
  );
}

function OptionRow({
  oi,
  opt,
  question,
  picked,
  submitted,
  onPick,
}: {
  oi: number;
  opt: string;
  question: NumQuestion;
  picked: number | null;
  submitted: boolean;
  onPick: (oi: number) => void;
}) {
  const showCorrect = submitted && oi === question.correctIndex;
  const showWrong = submitted && oi === picked && oi !== question.correctIndex;
  const mayaDigits = question.sysID === 'maya' ? question.optionDigits?.[oi] : undefined;

  const badgeBg = showCorrect ? 'var(--good)' : showWrong ? 'var(--bad)' : 'var(--bg)';
  const badgeFg = showCorrect || showWrong ? '#fff' : 'var(--ink)';
  const rowBg = showCorrect
    ? 'color-mix(in srgb, var(--good) 15%, transparent)'
    : showWrong
      ? 'color-mix(in srgb, var(--bad) 15%, transparent)'
      : 'var(--panel-2)';
  const rowBorder = showCorrect ? 'var(--good)' : showWrong ? 'var(--bad)' : 'transparent';

  return (
    <button
      onClick={() => onPick(oi)}
      disabled={submitted}
      className="flex items-center gap-3 rounded-[10px] text-left transition-colors disabled:cursor-default"
      style={{
        padding: question.bigOptions ? 16 : 13,
        background: rowBg,
        border: `1.5px solid ${rowBorder}`,
      }}
    >
      <span
        className="flex items-center justify-center rounded-full shrink-0 text-xs font-bold"
        style={{ width: 24, height: 24, background: badgeBg, color: badgeFg }}
      >
        {showCorrect ? '✓' : showWrong ? '×' : String.fromCharCode(65 + oi)}
      </span>
      {mayaDigits ? (
        <MayaNumberView digits={mayaDigits} color="var(--ink)" scale={0.6} />
      ) : (
        <GlyphText
          text={opt}
          size={question.bigOptions ? 18 : 14}
          color="var(--ink)"
          gap={2}
          style={{
            color: 'var(--ink)',
            fontSize: question.bigOptions ? 20 : 14.5,
            fontWeight: question.bigOptions ? 600 : 400,
          }}
        />
      )}
    </button>
  );
}

function FeedbackView({
  question,
  isCorrect,
  praiseText,
}: {
  question: NumQuestion;
  isCorrect: boolean;
  praiseText: string;
}) {
  const color = isCorrect ? 'var(--good)' : 'var(--bad)';
  return (
    <div
      className="flex flex-col gap-1.5 rounded-lg p-[15px]"
      style={{
        background: `color-mix(in srgb, ${color} 12%, transparent)`,
        borderLeft: `3px solid ${color}`,
      }}
    >
      <span className="font-bold text-[15px]" style={{ color }}>
        {isCorrect ? `${praiseText} ✓` : 'Leider falsch'}
      </span>
      {!isCorrect && question.isInput && question.correctValue !== null && (
        <span className="text-ink text-sm">Richtige Antwort: {question.correctValue}</span>
      )}
      {!isCorrect && !question.isInput && (
        <span className="text-ink text-sm flex items-center flex-wrap gap-1">
          Richtig wäre:{' '}
          <GlyphText
            text={question.options[question.correctIndex]}
            size={13}
            color="var(--ink)"
            style={{ color: 'var(--ink)', fontSize: 14 }}
          />
        </span>
      )}
      <GlyphText
        text={question.explain}
        size={14}
        color="var(--ink)"
        gap={3}
        style={{ color: 'var(--ink)', fontSize: 14, lineHeight: 1.6 }}
      />
    </div>
  );
}
