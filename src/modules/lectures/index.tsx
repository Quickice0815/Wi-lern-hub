import { useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';
import { BackBar, PageShell } from '../../components/ui';
import { LECTURE_CHAPTERS } from './data';
import { LectureTutorial } from './Tutorial';
import { LectureDifficultySelect } from './DifficultySelect';
import { LectureExercises } from './Exercises';
import { LecturePractice } from './Practice';
import type { LectureDifficulty, LecturesProgress } from './types';

export { LectureMenu } from './LectureMenu';

type Step = 'tutorial' | 'select' | 'exercises' | 'practice';

// Ablauf für ein Kapitel: Tutorial -> Stufenauswahl -> Übungen -> zurück
// zur Stufenauswahl. Lebt, wie die anderen Module, als lokaler State
// hinter einer einzigen Route ("lectureFlow").
export function LectureFlow({ chapterId }: { chapterId: string }) {
  const nav = useNavigator();
  const chapter = LECTURE_CHAPTERS.find((c) => c.id === chapterId) ?? LECTURE_CHAPTERS[0];
  const [progress, setProgress] = useCloudProgress<LecturesProgress>('lectures', {});
  const [step, setStep] = useState<Step>('tutorial');
  const [difficulty, setDifficulty] = useState<LectureDifficulty>('easy');

  function finishExercises(score: number, total: number) {
    setProgress((prev) => {
      const prevChapter = prev[chapterId] ?? {};
      const prevTier = prevChapter[difficulty];
      return {
        ...prev,
        [chapterId]: {
          ...prevChapter,
          [difficulty]: { bestScore: Math.max(prevTier?.bestScore ?? 0, score), total },
        },
      };
    });
  }

  const titles: Record<Step, string> = {
    tutorial: 'Lernkarten',
    select: chapter.title,
    exercises: chapter.title,
    practice: chapter.title,
  };

  return (
    <PageShell>
      {step !== 'exercises' && step !== 'practice' && <BackBar title={titles[step]} onBack={() => nav.pop()} />}

      {step === 'tutorial' && (
        <LectureTutorial chapter={chapter} onDone={() => setStep('select')} onSkip={() => setStep('select')} />
      )}

      {step === 'select' && (
        <LectureDifficultySelect
          chapter={chapter}
          progress={progress[chapterId]}
          onChoose={(d) => {
            setDifficulty(d);
            setStep('exercises');
          }}
          onTutorial={() => setStep('tutorial')}
          onExit={() => nav.pop()}
          onPractice={chapter.practice ? () => setStep('practice') : undefined}
        />
      )}

      {step === 'exercises' && (
        <LectureExercises
          questions={chapter.exercises[difficulty]}
          difficulty={difficulty}
          color={chapter.color}
          onFinish={finishExercises}
          onBack={() => setStep('select')}
        />
      )}

      {step === 'practice' && chapter.practice && (
        <LecturePractice
          practice={chapter.practice}
          color={chapter.color}
          title={chapter.title}
          onBack={() => setStep('select')}
        />
      )}
    </PageShell>
  );
}
