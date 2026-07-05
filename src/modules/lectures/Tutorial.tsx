import { useState } from 'react';
import { PrimaryButton, ProgressBar, SecondaryButton } from '../../components/ui';
import type { LectureChapter } from './types';

// Schritt-für-Schritt-Tutorial mit den Kernaussagen des Kapitels.
export function LectureTutorial({
  chapter,
  onDone,
  onSkip,
}: {
  chapter: LectureChapter;
  onDone: () => void;
  onSkip: () => void;
}) {
  const [i, setI] = useState(0);
  const step = chapter.tutorial[i];
  const isLast = i === chapter.tutorial.length - 1;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3">
        <ProgressBar value={(i + 1) / chapter.tutorial.length} color={chapter.color} />
        <span className="text-sub text-xs shrink-0">
          {i + 1} / {chapter.tutorial.length}
        </span>
      </div>

      <div key={i} className="card p-[22px] flex flex-col gap-3 animate-fade-in-up">
        <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: chapter.color }}>
          Lernkarte
        </span>
        <h2 className="text-ink font-bold text-xl leading-snug">{step.title}</h2>
        <p className="text-ink text-[15px] leading-relaxed whitespace-pre-line">{step.content}</p>
      </div>

      <div className="flex items-center justify-between gap-3">
        <SecondaryButton onClick={onSkip}>Tutorial überspringen →</SecondaryButton>
        <PrimaryButton
          color={chapter.color}
          onClick={() => {
            if (isLast) onDone();
            else setI((n) => n + 1);
          }}
        >
          {isLast ? 'Weiter zu den Übungen →' : 'Weiter →'}
        </PrimaryButton>
      </div>
    </div>
  );
}
