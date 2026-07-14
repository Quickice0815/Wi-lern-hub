import { useState } from 'react';
import { useNavigator } from '../../lib/navigation';
import { useCloudProgress } from '../../lib/progress';

/* ============================================================
   DESIGN TOKENS
   Farben: dunkles Schiefer-Blau als Basis (seriös, konzentriert),
   Bernstein/Amber als Führungs-/Fortschritts-Akzent (Kompass-Idee:
   man "navigiert" durch den Stoff), Petrol als Zweitakzent für
   Prüf-Modus-Elemente.
   ============================================================ */
const C = {
  bg: "#141A22",
  panel: "#1D2733",
  panel2: "#243040",
  border: "#324256",
  text: "#EAEEF3",
  muted: "#8FA0B3",
  amber: "#E3A340",
  amberDim: "#3A2E1A",
  teal: "#4FB0A5",
  tealDim: "#16302C",
  red: "#E2665B",
  redDim: "#3A1E1C",
  green: "#5CB88A",
  greenDim: "#173327",
};

const displayFont = '"Iowan Old Style", "Palatino Linotype", Georgia, serif';
const bodyFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

/* ============================================================
   KLEINE BAUSTEINE
   ============================================================ */
function Chip({ children, color = C.amber, bgColor }: { children: React.ReactNode; color?: string; bgColor?: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 0.5,
        textTransform: "uppercase",
        color,
        background: bgColor || "transparent",
        border: `1px solid ${color}55`,
      }}
    >
      {children}
    </span>
  );
}

function Card({
  title,
  eyebrow,
  children,
  accent = C.amber,
}: {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      style={{
        background: C.panel,
        border: `1px solid ${C.border}`,
        borderRadius: 14,
        padding: "20px 22px",
        marginBottom: 18,
        borderLeft: `4px solid ${accent}`,
      }}
    >
      {eyebrow && (
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: accent,
            marginBottom: 6,
          }}
        >
          {eyebrow}
        </div>
      )}
      {title && (
        <div
          style={{
            fontFamily: displayFont,
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 10,
            color: C.text,
          }}
        >
          {title}
        </div>
      )}
      <div style={{ color: "#D3DBE4", fontSize: 15, lineHeight: 1.6 }}>
        {children}
      </div>
    </div>
  );
}

function Def({ term, children }: { term: React.ReactNode; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: C.panel2,
        border: `1px dashed ${C.amber}66`,
        borderRadius: 10,
        padding: "12px 16px",
        margin: "10px 0",
      }}
    >
      <div style={{ color: C.amber, fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
        {term}
      </div>
      <div style={{ fontStyle: "italic", color: "#D3DBE4" }}>{children}</div>
    </div>
  );
}

function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 10,
        margin: "12px 0",
      }}
    >
      {children}
    </div>
  );
}

function Box({ label, children, color = C.teal }: { label?: React.ReactNode; children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        background: `${color}14`,
        border: `1px solid ${color}55`,
        borderRadius: 10,
        padding: "10px 12px",
      }}
    >
      {label && (
        <div style={{ fontSize: 12, fontWeight: 700, color, marginBottom: 4 }}>
          {label}
        </div>
      )}
      <div style={{ fontSize: 14, color: "#D3DBE4" }}>{children}</div>
    </div>
  );
}

/* ============================================================
   QUIZ-TYPEN & -KOMPONENTE (Mehrfach-Verwendbar: mc / blank / scenario)
   ============================================================ */
interface McQuiz {
  type: "mc";
  question: string;
  options: string[];
  correct: number;
  explain: string;
}
interface BlankQuiz {
  type: "blank";
  textBefore: string;
  textAfter: string;
  answers: string[];
  explain: string;
}
interface ScenarioQuiz {
  type: "scenario";
  situation: string;
  options: string[];
  correct: number;
  explain: string;
}
type QuizDef = McQuiz | BlankQuiz | ScenarioQuiz;

interface QuizAnswerState {
  chosen?: number;
  val?: string;
  correct?: boolean;
  answered?: boolean;
}
type QuizStateMap = Record<string, QuizAnswerState>;

function Quiz({
  q,
  qKey,
  state,
  setState,
}: {
  q: QuizDef;
  qKey: string;
  state: QuizStateMap;
  setState: (next: QuizStateMap) => void;
}) {
  const st = state[qKey] || {};
  const setSt = (patch: QuizAnswerState) => setState({ ...state, [qKey]: { ...st, ...patch } });

  if (q.type === "mc") {
    return (
      <div>
        <div style={{ fontWeight: 700, marginBottom: 10, color: C.text }}>
          {q.question}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options.map((opt, i) => {
            const chosen = st.chosen === i;
            const isCorrect = i === q.correct;
            let bg: string = C.panel2,
              border: string = C.border;
            if (chosen && st.answered) {
              bg = isCorrect ? C.greenDim : C.redDim;
              border = isCorrect ? C.green : C.red;
            } else if (st.answered && isCorrect) {
              bg = C.greenDim;
              border = C.green;
            }
            return (
              <button
                key={i}
                onClick={() => setSt({ chosen: i, answered: true })}
                style={{
                  textAlign: "left",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: `1px solid ${border}`,
                  background: bg,
                  color: C.text,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {st.answered && (
          <div
            style={{
              marginTop: 10,
              padding: "10px 14px",
              borderRadius: 8,
              background: st.chosen === q.correct ? C.greenDim : C.redDim,
              color: st.chosen === q.correct ? C.green : C.red,
              fontSize: 13,
            }}
          >
            {st.chosen === q.correct ? "✓ Richtig. " : "✗ Nicht ganz. "}
            {q.explain}
          </div>
        )}
      </div>
    );
  }

  if (q.type === "blank") {
    const val = st.val || "";
    const check = () => {
      const norm = (s: string) => s.trim().toLowerCase();
      const ok = q.answers.some((a) => norm(a) === norm(val));
      setSt({ answered: true, correct: ok });
    };
    return (
      <div>
        <div style={{ marginBottom: 10, color: C.text, lineHeight: 1.7 }}>
          {q.textBefore}{" "}
          <input
            value={val}
            onChange={(e) => setSt({ val: e.target.value })}
            style={{
              background: C.bg,
              border: `1px solid ${C.amber}`,
              borderRadius: 6,
              padding: "4px 8px",
              color: C.text,
              width: 160,
              fontSize: 14,
            }}
          />{" "}
          {q.textAfter}
        </div>
        <button
          onClick={check}
          style={{
            background: C.amber,
            color: "#241A08",
            border: "none",
            borderRadius: 8,
            padding: "8px 16px",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          Prüfen
        </button>
        {st.answered && (
          <div
            style={{
              marginTop: 10,
              padding: "10px 14px",
              borderRadius: 8,
              background: st.correct ? C.greenDim : C.redDim,
              color: st.correct ? C.green : C.red,
              fontSize: 13,
            }}
          >
            {st.correct ? "✓ Richtig. " : `✗ Lösung: „${q.answers[0]}". `}
            {q.explain}
          </div>
        )}
      </div>
    );
  }

  if (q.type === "scenario") {
    return (
      <div>
        <div
          style={{
            background: C.panel2,
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 10,
            fontStyle: "italic",
            color: "#D3DBE4",
            fontSize: 14,
          }}
        >
          {q.situation}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {q.options.map((opt, i) => {
            const chosen = st.chosen === i;
            const isCorrect = i === q.correct;
            let bg: string = C.panel2,
              border: string = C.border;
            if (chosen && st.answered) {
              bg = isCorrect ? C.greenDim : C.redDim;
              border = isCorrect ? C.green : C.red;
            }
            return (
              <button
                key={i}
                onClick={() => setSt({ chosen: i, answered: true })}
                style={{
                  flex: 1,
                  textAlign: "left",
                  padding: "12px 14px",
                  borderRadius: 8,
                  border: `1px solid ${border}`,
                  background: bg,
                  color: C.text,
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                <b>{i === 0 ? "A" : "B"}:</b> {opt}
              </button>
            );
          })}
        </div>
        {st.answered && (
          <div
            style={{
              marginTop: 10,
              padding: "10px 14px",
              borderRadius: 8,
              background: st.chosen === q.correct ? C.greenDim : C.redDim,
              color: st.chosen === q.correct ? C.green : C.red,
              fontSize: 13,
            }}
          >
            {st.chosen === q.correct ? "✓ Richtig. " : "✗ Nicht optimal. "}
            {q.explain}
          </div>
        )}
      </div>
    );
  }
  return null;
}

/* ============================================================
   MODUL-INHALTE — FÜHRUNG
   ============================================================ */
interface Module {
  num: number;
  title: string;
  category: string;
  content: React.ReactNode;
  quiz: QuizDef;
}

const fuehrungModules: Module[] = [
  {
    num: 1,
    title: "Was ist Führung?",
    category: "Grundlagen",
    content: (
      <>
        <Card eyebrow="1.1 Begriffsdefinition" title="Personalführung">
          <p>
            <b>Personalführung</b> ist Teil der Unternehmensführung. Nach{" "}
            <b>Jung</b> lautet die Definition:
          </p>
          <Def term="Definition nach Jung">
            „Kommunikative[r] Prozess der Einflussnahme auf die Mitarbeiter zum
            Zweck zielgerichteter Leistungserstellung"
          </Def>
          <p>
            Die <b>Führungsleistung</b> hat zentrale Bedeutung für den
            Unternehmenserfolg.
          </p>
          <p style={{ marginTop: 10 }}>
            <b>Merkmale von Führung</b> (nach Jung):
          </p>
          <ul style={{ paddingLeft: 20 }}>
            <li>mind. 2 Personen</li>
            <li>soziale Interaktion</li>
            <li>zielorientiert (Aufgaben/Ergebnisse)</li>
            <li>Verhaltensauslösung / -steuerung</li>
          </ul>
        </Card>
        <Card eyebrow="Funktion & Aufgabe" title="Die zwei Funktionen der Führung" accent={C.teal}>
          <Grid2>
            <Box label="Lokomotionsfunktion" color={C.teal}>
              Förderung der Aufgabenerfüllung und Zielerreichung der Gruppe.
            </Box>
            <Box label="Kohäsionsfunktion" color={C.teal}>
              Integration und Zusammenhalt der Gruppe — die richtigen
              Entscheidungen in einem förderlichen Umfeld.
            </Box>
          </Grid2>
        </Card>
      </>
    ),
    quiz: {
      type: "blank",
      textBefore:
        "Laut Jung ist Führung ein kommunikativer Prozess der Einflussnahme auf die Mitarbeiter zum Zweck",
      textAfter: "Leistungserstellung.",
      answers: ["zielgerichteter"],
      explain:
        "Die Definition nach Jung betont, dass Einflussnahme immer zielgerichtet erfolgt — reines Reden ohne Zielbezug ist keine Führung.",
    },
  },

  {
    num: 2,
    title: "Direkte vs. indirekte Führung & Effizienz",
    category: "Grundlagen",
    content: (
      <>
        <Card title="Zwei Arten von Führung">
          <Grid2>
            <Box label="Direkte Führung" color={C.amber}>
              Traditionelle Mitarbeiterführung / „Leadership" — persönliche,
              unmittelbare Einflussnahme.
            </Box>
            <Box label="Indirekte Führung" color={C.amber}>
              Sog. <b>organisatorische Führung</b> — Einfluss über Strukturen,
              Regeln, Systeme statt direkter Interaktion.
            </Box>
          </Grid2>
          <p style={{ marginTop: 10 }}>
            Praxisbeispiele für schriftlich fixierte Führung („wie Führung
            eigentlich sein sollte"): Bosch Führungsgrundsätze, CreditPlus
            Bank Führungsleitlinien, Lidl Führungsleitbild, Villeroy &amp; Boch
            Führungsgrundsätze.
          </p>
        </Card>
        <Card title="Zwei Maßstäbe für gute Führung" accent={C.teal}>
          <Grid2>
            <Box label="Wirtschaftliche Effizienz" color={C.teal}>
              Grad der Erreichung <b>institutioneller Ziele</b> (ökonomischer
              Aspekt).
            </Box>
            <Box label="Soziale Effizienz" color={C.teal}>
              Grad der Befriedigung <b>individueller Bedürfnisse</b> der
              Mitarbeiter (humaner Aspekt).
            </Box>
          </Grid2>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Ein Unternehmen erreicht seine Umsatzziele exzellent, aber die Mitarbeiter sind unzufrieden und fühlen sich nicht gehört. Welcher Effizienz-Aspekt fehlt?",
      options: [
        "Wirtschaftliche Effizienz",
        "Soziale Effizienz",
        "Beide fehlen",
        "Keiner, da Umsatz zählt",
      ],
      correct: 1,
      explain:
        "Die sozialen Effizienz misst die Befriedigung individueller Bedürfnisse der Mitarbeiter — genau die fehlt hier, obwohl die institutionellen (wirtschaftlichen) Ziele erreicht werden.",
    },
  },

  {
    num: 3,
    title: "Führungsstile — Grundlagen",
    category: "Führungsstile",
    content: (
      <>
        <Card title="Wie viele Dimensionen hat ein Führungsstil?">
          <p>Führungsstile sind:</p>
          <Grid2>
            <Box color={C.amber} label="Eindimensional">
              z. B. nur „autoritär ⟷ kooperativ"
            </Box>
            <Box color={C.amber} label="Zweidimensional">
              z. B. Aufgaben- <i>und</i> Beziehungsorientierung
            </Box>
          </Grid2>
          <div style={{ marginTop: 10 }}>
            <Box color={C.amber} label="Mehrdimensional (z. B. Führungsprofil)">
              Mehrere Dimensionen gleichzeitig — komplexeres, realistischeres
              Bild.
            </Box>
          </div>
        </Card>
        <Card title="Das zweidimensionale Stil-Modell" accent={C.teal}>
          <p>
            Aufgeteilt nach <b>Beziehungsorientierung</b> (vertikal) und{" "}
            <b>Aufgabenorientierung</b> (horizontal) ergeben sich vier
            Grundstile:
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
              marginTop: 10,
            }}
          >
            <Box color={C.teal} label="Delegations-Stil">
              niedrig Aufgabe / niedrig Beziehung
            </Box>
            <Box color={C.teal} label="Integrierender Stil">
              niedrig Aufgabe / hoch Beziehung
            </Box>
            <Box color={C.teal} label="Autoritärer Stil">
              hoch Aufgabe / niedrig Beziehung
            </Box>
            <Box color={C.teal} label="Partizipativer Stil">
              hoch Aufgabe / hoch Beziehung
            </Box>
          </div>
          <p style={{ marginTop: 10, fontSize: 13, color: C.muted }}>
            Übung aus dem Skript: Kann sich ein Führungsstil ändern? — Nach{" "}
            <b>Fiedlers Kontingenzmodell</b> hat jede Führungskraft einen
            eigenen Stil, der langfristig kaum veränderbar ist. Fiedler
            empfiehlt daher: entweder die Situation an die Führungskraft
            anpassen, oder — wenn das nicht machbar ist — die Führungskraft
            auszutauschen.
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Eine Führungskraft delegiert kurzfristig sehr viel Verantwortung, kümmert sich aber kaum um die Beziehung zum Team. Welcher Stil trifft am ehesten zu, wenn zusätzlich die Aufgabenorientierung niedrig ist?",
      options: [
        "Autoritärer Stil",
        "Partizipativer Stil",
        "Delegations-Stil",
        "Integrierender Stil",
      ],
      correct: 2,
      explain:
        "Niedrige Aufgaben- UND niedrige Beziehungsorientierung entspricht dem Delegations-Stil im zweidimensionalen Modell.",
    },
  },

  {
    num: 4,
    title: "Situatives Führungsmodell (Hersey/Blanchard)",
    category: "Führungsstile",
    content: (
      <>
        <Card title="Kernidee: Der beste Stil hängt von der Situation ab">
          <p>
            Effektivster Führungsstil = abhängig von <b>Aufgabenorientierung</b>,{" "}
            <b>Beziehungsorientierung</b> und der{" "}
            <b>Situationsvariable „Reifegrad des Mitarbeiters"</b> bezüglich
            der Aufgabe.
          </p>
          <Grid2>
            <Box label="Funktionsreife" color={C.amber}>
              = Können / Fähigkeit (Wissen, Fertigkeit, Erfahrung)
            </Box>
            <Box label="Psychologische Reife" color={C.amber}>
              = Wollen / Leistungsbereitschaft (Wille, Motivation,
              Selbstvertrauen)
            </Box>
          </Grid2>
        </Card>
        <Card title="Die 4 Führungsstile im Modell" accent={C.teal}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Box color={C.teal} label="Stil 4 · Delegierend (delegating)">
              Niedriger Reifegrad-Bedarf an Führung, hohe Reife des MA (M4)
            </Box>
            <Box color={C.teal} label="Stil 3 · Partizipativ (participating)">
              Reife M3
            </Box>
            <Box color={C.teal} label="Stil 2 · Integrierend (selling)">
              Reife M2
            </Box>
            <Box color={C.teal} label="Stil 1 · Autoritär (telling)">
              Reife M4 (niedrigste) → höchste Führungsintensität nötig
            </Box>
          </div>
          <p style={{ marginTop: 10, fontSize: 13, color: C.muted }}>
            Merksatz aus dem Skript: die Kurve beschreibt den optimalen
            Führungsstil des Vorgesetzten in Abhängigkeit vom Reifegrad —
            Beispiel M1 ⇒ Stil 1 (telling).
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "scenario",
      situation:
        "Ein neuer Auszubildender kennt die Abläufe noch nicht (geringes Können) und ist unsicher (geringe Motivation). Wie sollte die Führungskraft laut Hersey/Blanchard vorgehen?",
      options: [
        "Klare, konkrete Anweisungen geben (autoritär / telling)",
        "Aufgabe vollständig delegieren, da er selbst lernen soll",
      ],
      correct: 0,
      explain:
        "Bei niedrigem Reifegrad (M1: weder Können noch Wollen ausgeprägt) ist der autoritäre Stil (telling) mit klaren Anweisungen am effektivsten.",
    },
  },

  {
    num: 5,
    title: "Klassische, moderne & agile Führung",
    category: "Führungsstile",
    content: (
      <>
        <Card title="Führung im Wandel der Zeit" eyebrow="1.4.3 Agile Führung">
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr style={{ color: C.amber, textAlign: "left" }}>
                  <th style={{ padding: 6 }}></th>
                  <th style={{ padding: 6 }}>Klassisch (bis 50er)</th>
                  <th style={{ padding: 6 }}>Modern (80er–2000er)</th>
                  <th style={{ padding: 6 }}>Agil (seit ca. 2010)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Umfeld", "Stabilität", "Komplexität", "Disruption"],
                  ["Organisation", "Arbeit in Abteilungen", "Denken in Prozessen", "Interdisziplinäre Teams"],
                  ["Führungsrolle", "Vorgesetzter", "Führungskraft", "Mentor & Coach"],
                  ["Information", "Partiell & lokal", "Mehr Transparenz", "Umfassende Transparenz"],
                  ["Kooperation", "Loyalität als Wert", "Möglichkeit des Widerspruchs", "Gezielte Kontroverse"],
                  ["Menschenbild", "X", "X + Y", "Y"],
                  ["Rolle von Fehlern", "Vermeidung", "Möglichkeit in Ausnahmefällen", "Innovations-Erfordernis"],
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{
                      borderTop: `1px solid ${C.border}`,
                      color: "#D3DBE4",
                    }}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={j}
                        style={{
                          padding: 6,
                          fontWeight: j === 0 ? 700 : 400,
                          color: j === 0 ? C.text : "#D3DBE4",
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Welches Menschenbild ist typisch für die agile Führung (seit ca. 2010)?",
      options: ["Menschenbild X", "Menschenbild X+Y", "Menschenbild Y", "Kein Menschenbild relevant"],
      correct: 2,
      explain:
        "Agile Führung basiert auf dem Menschenbild Y (Mitarbeiter sind von sich aus motiviert), im Gegensatz zu X (klassisch) oder X+Y (modern).",
    },
  },

  {
    num: 6,
    title: "Kommunikation I — 4-Ohren-Modell & Eisbergmodell",
    category: "Kommunikation",
    content: (
      <>
        <Card eyebrow="Grundsatz" title="Watzlawick">
          <Def term="Paul Watzlawick">
            „Jede Kommunikation hat einen Inhalts- und einen
            Beziehungsaspekt, wobei Letzterer den Ersteren bestimmt."
          </Def>
        </Card>
        <Card title="(3) Vier-Seiten-einer-Nachricht-Modell (Schulz von Thun, 1981)" accent={C.teal}>
          <p>Jede Nachricht enthält 4 Seiten/Ohren — ein Wechselspiel zw. Senden/Empfangen:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
            <Box color="#5B8CD9" label="Sachinformation (blau)">worüber ich informiere</Box>
            <Box color="#5CB88A" label="Selbstkundgabe (grün)">was ich von mir zu erkennen gebe</Box>
            <Box color="#E3C240" label="Beziehungshinweis (gelb)">was ich von dir halte und wie ich zu dir stehe</Box>
            <Box color="#E2665B" label="Appell (rot)">was ich bei dir erreichen möchte</Box>
          </div>
        </Card>
        <Card title="(4) Eisbergmodell (allg. Theorie der Persönlichkeit nach Freud)" accent={C.amber}>
          <p>
            Die <b>sichtbare Störung</b> ist nur die Spitze des Eisbergs.
          </p>
          <Grid2>
            <Box color={C.amber} label="Sichtbar / überschaubar">
              Themen, Ziele, Termine, Rollen
            </Box>
            <Box color={C.amber} label="Unsichtbar (unter der Wasserlinie)">
              Gefühle, Ängste, Werte, Erfahrungen, Konflikte
            </Box>
          </Grid2>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
            Bedeutung für Führungskräfte im Mitarbeitergespräch: die
            eigentliche Ursache eines Konflikts liegt oft unterhalb der
            sichtbaren Sachebene.
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Ein Chef sagt: „Die Ampel ist grün.“ Auf welchem der 4 Ohren hört ein Mitarbeiter, wenn er denkt: „Er hält mich wohl für blind“?",
      options: ["Sachohr", "Selbstkundgabe-Ohr", "Beziehungsohr", "Appellohr"],
      correct: 2,
      explain:
        "Das Beziehungsohr (gelb) hört heraus, was der Sender von einem hält bzw. wie er zu einem steht — hier eine (vermeintliche) Herabsetzung.",
    },
  },

  {
    num: 7,
    title: "Kommunikation II — Teufelskreis, Zuhören & Feedback",
    category: "Kommunikation",
    content: (
      <>
        <Card title="(5) Teufelskreismodell (nach Schulz von Thun)">
          <p>
            Sobald sich zwei Personen begegnen, reagieren sie aufeinander
            (Aktion/Reaktion) — es entsteht eine <b>Beziehungsdynamik</b>{" "}
            (Folgeeffekt: positiv oder negativ), <b>ohne Anfang und Ende</b>.
          </p>
          <p style={{ fontSize: 13, color: C.muted }}>
            Klassisches Beispiel von Watzlawick: das Ehepaar, bei dem sich die
            Frau darüber beklagt, dass der Mann nie abends weggeht — je öfter
            sie klagt, desto häufiger bleibt er weg.
          </p>
        </Card>
        <Card title="2.2 Techniken der Gesprächsführung: Zuhören" accent={C.teal}>
          <p>Die vier Stufen des Zuhörens:</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Box color={C.teal}>Emphatisches Zuhören</Box>
            <Box color={C.teal}>Aufmerksames Zuhören</Box>
            <Box color={C.teal}>Analytisches Zuhören</Box>
            <Box color={C.teal}>Aktives Zuhören</Box>
          </div>
        </Card>
        <Card title="(3) Feedback als Führungsaufgabe — Johari-Fenster" accent={C.amber}>
          <p>Ziel: Selbst-/Fremdbildabgleich, Rückmeldung über Wirkung, Orientierung/Entwicklung.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
            <Box color={C.amber} label="Freies Handeln">mir bekannt & anderen bekannt</Box>
            <Box color={C.amber} label="Blinder Fleck">anderen bekannt, mir unbekannt</Box>
            <Box color={C.amber} label="Verborgenes">mir bekannt, anderen unbekannt</Box>
            <Box color={C.amber} label="Unbekanntes">mir unbekannt & anderen unbekannt</Box>
          </div>
        </Card>
      </>
    ),
    quiz: {
      type: "blank",
      textBefore:
        "Der Bereich im Johari-Fenster, der anderen bekannt, mir selbst aber unbekannt ist, heißt",
      textAfter: ".",
      answers: ["blinder fleck", "der blinde fleck"],
      explain:
        "Der 'Blinde Fleck' ist genau der Bereich, den Feedback aufdecken soll — deshalb ist Feedback als Führungsaufgabe so wichtig.",
    },
  },

  {
    num: 8,
    title: "Ziele vereinbaren: MbO, SMART & OKR",
    category: "Zielführung",
    content: (
      <>
        <Card title="3.3 Ziele vereinbaren (MbO & Leistungsbeurteilung)">
          <p>
            Zielkoordination zwischen Mitarbeiterzielen (privat ⟷ beruflich)
            und Unternehmenszielen — Ziele können <b>konfliktär</b>,{" "}
            <b>komplementär</b> oder <b>neutral</b> zueinander stehen.
          </p>
        </Card>
        <Card title="SMART-Kriterien" accent={C.teal}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Box color={C.teal} label="S – Spezifisch">z. B. Steigerung der Verkaufszahlen</Box>
            <Box color={C.teal} label="M – Messbar">z. B. Reduktion der Ausschussquote</Box>
            <Box color={C.teal} label="A – Attraktiv">z. B. Verbesserung der Kundenorientierung</Box>
            <Box color={C.teal} label="R – Realisierbar">passend zu Ressourcen</Box>
          </div>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
            + T = terminiert. Beispiel: Verbesserung des Images.
          </p>
        </Card>
        <Card title="OKR-Methode = agile Zielvereinbarung (analog SCRUM)" accent={C.amber}>
          <p>
            Zeitgeschichtlich: <b>MBOs</b> (Peter Drucker) → <b>SMART</b>{" "}
            (George Doran) → <b>KPIs</b> → <b>OKRs</b> (populär durch Google
            seit 2012 / Rick Klau, Google Ventures, 2013).
          </p>
          <p style={{ marginTop: 8 }}>
            <b>OKR-Zyklus:</b> Planning → Ziele/strategische Initiativen →
            Weekly (Meeting/Alignment) → Review → Retrospektive → alle 3–4
            Monate von vorn.
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question: "Wofür steht das 'A' in den SMART-Kriterien laut Skript?",
      options: ["Anspruchsvoll", "Attraktiv", "Aktuell", "Anpassbar"],
      correct: 1,
      explain: "Im Skript steht A für Attraktiv (Beispiel: Verbesserung der Kundenorientierung).",
    },
  },

  {
    num: 9,
    title: "Delegation, Beurteilen & Motivation",
    category: "Führungsinstrumente",
    content: (
      <>
        <Card title="3.5 Delegieren">
          <p>
            Delegation überträgt Aufgaben, Rechte und Verantwortung — Frage:
            welche Aufgaben sind delegierbar, welche nicht (z. B.
            Führungsgrundsatzentscheidungen bleiben i. d. R. bei der
            Führungskraft)?
          </p>
        </Card>
        <Card title="3.6 Kontrollieren & Beurteilen" accent={C.teal}>
          <p>
            Grundlage: <b>Soll-Ist-Vergleich</b> sowie <b>Können & Wollen</b>.
            Die Matrix aus Leistung × Verhalten ergibt vier Beurteilungsfelder,
            u. a. <i>Lob</i>, <i>Anerkennung</i>, <i>Kritik</i>, <i>Tadel</i>.
          </p>
        </Card>
        <Card title="3.7 Mitarbeiter motivieren — Herzberg" accent={C.amber}>
          <p>
            <b>Zwei-Faktoren-Theorie (Herzberg et al.):</b> Wie entsteht
            (Arbeits-)Zufriedenheit?
          </p>
          <Grid2>
            <Box color={C.amber} label="Hygienefaktoren">
              Verhindern Unzufriedenheit (z. B. Gehalt, Arbeitsbedingungen) —
              schaffen aber keine echte Zufriedenheit.
            </Box>
            <Box color={C.amber} label="Motivatoren">
              Schaffen echte Zufriedenheit (z. B. Anerkennung, Verantwortung,
              Erfolg).
            </Box>
          </Grid2>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
            Unterscheidung: Selbst- vs. Fremdmotivation.
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "scenario",
      situation:
        "Ein Mitarbeiter beklagt sich über zu geringes Gehalt. Sie erhöhen das Gehalt deutlich. Wird der Mitarbeiter dadurch nach Herzberg dauerhaft hochmotiviert sein?",
      options: [
        "Nein — Gehalt ist ein Hygienefaktor, er verhindert nur Unzufriedenheit",
        "Ja — Geld ist immer der stärkste Motivator",
      ],
      correct: 0,
      explain:
        "Nach Herzberg zählt Gehalt zu den Hygienefaktoren: Es beseitigt Unzufriedenheit, erzeugt aber keine dauerhafte, echte Motivation. Dafür braucht es Motivatoren wie Anerkennung oder Verantwortung.",
    },
  },

  {
    num: 10,
    title: "Konflikte, Mobbing & das Werte-Quadrat",
    category: "Konfliktmanagement",
    content: (
      <>
        <Card title="Eskalationsstufen nach Glasl">
          <p>
            Konfliktdynamik verläuft in Phasen mit abnehmender
            Konsensfähigkeit:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 6 }}>
            <Box color={C.teal} label="1. Phase (noch konstruktiv)">Gespräche</Box>
            <Box color={C.amber} label="2. Phase (destruktiv)">Ex-/interne Moderation</Box>
            <Box color={C.red} label="3. Phase (selbstzerstörerisch)">Machteingriff</Box>
          </div>
        </Card>
        <Card title="Konfliktbehandlung II: WIN-WIN-Prinzip (Harvard-Modell)" accent={C.teal}>
          <p>Nach Fisher/Ury (1991) — Kernprinzip: <b>Person und Sache trennen</b>.</p>
          <p style={{ fontSize: 13, color: C.muted }}>
            Ablauf: 1) Menschen/Probleme getrennt sehen, aber „gemeinsam"
            behandeln → 2) Auf Interessen konzentrieren, nicht auf Positionen →
            3) Entscheidungsoptionen zum beiderseitigen Nutzen entwickeln → 4)
            Objektive Kriterien anwenden.
          </p>
        </Card>
        <Card title="Konfliktbehandlung III: Werte-/Entwicklungsquadrat (Schulz von Thun)" accent={C.amber}>
          <p>
            Jede Tugend hat eine Schwesterwerte und kippt bei Übertreibung ins
            Negative:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
            <Box color={C.green} label="Wertschätzung">Anerkennung, Würdigung</Box>
            <Box color={C.teal} label="Kritik">offene, ehrliche Konfrontation</Box>
            <Box color={C.red} label="Schmeichelei (Übertreibung)">unkritische Idealisierung</Box>
            <Box color={C.red} label="Geringschätzung (Übertreibung)">Herabsetzung, Verachtung</Box>
          </div>
        </Card>
        <Card title="Mobbing" accent={C.red}>
          <p>
            Mögliche Folgen unlösbarer Konflikte: schwierige MA-Gespräche mit
            arbeitsrechtlichen Konsequenzen (Ermahnung → Abmahnung → Kündigung
            /Trennung). Ablauf: <b>Auslösephase</b> (ungelöste Konflikte, FK
            wartet ab) → <b>Mobbingphase</b>.
          </p>
          <p style={{ fontSize: 13, color: C.muted }}>
            Prävention auf 3 Ebenen: Individuum (Aufklärung, Training),
            Gruppe (Kommunikationstraining, Supervision), Organisation
            (Organisationsentwicklung, Konfliktmanagementsystem).
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Im Harvard-Konzept nach Fisher/Ury gilt als Kernprinzip:",
      options: [
        "Sache und Person immer gemeinsam hart verhandeln",
        "Person und Sache trennen, auf Interessen statt Positionen fokussieren",
        "Der Ranghöhere entscheidet autoritär",
        "Konflikte grundsätzlich aussitzen",
      ],
      correct: 1,
      explain:
        "Harvard-Konzept: Menschen und Probleme getrennt betrachten, auf Interessen (nicht starre Positionen) konzentrieren, Optionen zum beiderseitigen Nutzen entwickeln, objektive Kriterien anwenden.",
    },
  },

  {
    num: 11,
    title: "Teamarbeit: Gruppe, Team & Teamentwicklung",
    category: "Teamarbeit",
    content: (
      <>
        <Card title="Definition Teamarbeit — Gruppe vs. Team">
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ color: C.amber, textAlign: "left" }}>
                  <th style={{ padding: 6 }}>Merkmale</th>
                  <th style={{ padding: 6 }}>Gruppe</th>
                  <th style={{ padding: 6 }}>Team</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Wettbewerb", "Gegner auch innerhalb", "Gegner meist außerhalb"],
                  ["Innovation", "Wenig Wunsch nach Veränderung", "Innovation wird gesucht"],
                  ["Entscheidungen", "Durch den Leiter von außen", "Intern durch Konsens"],
                  ["Erfolg", "Persönliche Erfolge haben Stellenwert", "Erfolg des Teams steht im Vordergrund"],
                  ["Abhängigkeit", "Mitglieder relativ unabhängig", "Mitglieder voneinander abhängig"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: 6, color: j === 0 ? C.text : "#D3DBE4", fontWeight: j === 0 ? 700 : 400 }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card title="Teamentwicklungsuhr (Tuckman) & Gruppenleistung" accent={C.teal}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["forming", "storming", "norming", "performing", "adjourning"].map((p) => (
              <Chip key={p} color={C.teal}>{p}</Chip>
            ))}
          </div>
          <p style={{ marginTop: 10, fontSize: 13, color: C.muted }}>
            Leistungsfähigkeit sinkt zunächst im „Konflikt" (storming), bevor
            sie im „performing" das Niveau eines echten Spitzenteams
            erreicht: gegenseitige Nähe, Anerkennung, jeder hat seinen Platz.
          </p>
        </Card>
        <Card title="Chancen & Risiken der Gruppen-/Teamarbeit" accent={C.amber}>
          <Grid2>
            <Box color={C.green} label="Chancen">
              Synergieeffekte, erhöhte Innovationskraft, höhere
              Entscheidungsqualität (Vier-Augen-Prinzip), mehr Motivation &
              Zufriedenheit, Wissenstransfer & Flexibilität.
            </Box>
            <Box color={C.red} label="Risiken">
              Leistungsverluste (Social Loafing), hoher
              Koordinationsaufwand, Gefahr von „Groupthink", destruktives
              Konfliktpotenzial, Verantwortungsdiffusion.
            </Box>
          </Grid2>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Ein Teammitglied leistet bewusst weniger, weil es sich in der Gruppe 'versteckt' fühlt und denkt, es fällt nicht auf. Wie heißt dieses Risiko der Teamarbeit?",
      options: ["Groupthink", "Social Loafing", "Storming", "Verantwortungsdiffusion"],
      correct: 1,
      explain:
        "Social Loafing beschreibt die unbewusste Leistungsreduktion Einzelner in der Gruppe, weil der individuelle Beitrag weniger sichtbar ist.",
    },
  },

  {
    num: 12,
    title: "Change Management: Wandel-Typen & Modelle",
    category: "Change Management",
    content: (
      <>
        <Card title="4.2 Kennzeichnung der Steuerung von Veränderung und Wandel">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Box color={C.red} label="a) Revolutionärer Wandel">
              Hoher Veränderungsdruck + kurzfristiger Zeit-/Planungshorizont →
              Revolution/Krise, ad hoc, unvorhersehbar, harte Schritte.
            </Box>
            <Box color={C.teal} label="b) Evolutionärer Wandel">
              Geringer bis mäßiger Druck + langfristiger Horizont →
              Organisationsentwicklung, planbar, kontrollierbar,
              systemstimulierend, Vermeidung von Kollateralschäden.
            </Box>
          </div>
        </Card>
        <Card title="Erklärungsmodelle für Wachstum & Krisen" accent={C.amber}>
          <p>
            <b>Greiner:</b> Wachstum der Organisation verläuft in Phasen, jede
            endet in einer typischen Krise (z. B. Krise durch fehlende
            Kontrolle, Bürokratie …), bevor die nächste Wachstumsphase
            (Kreativität, Autonomie, Delegation, Koordination …) beginnt.
          </p>
          <p style={{ marginTop: 8 }}>
            <b>Bleicher (Phasenmodell der Unternehmensentwicklung):</b>{" "}
            Pionierphase → Markterschließung → Diversifikation → Akquisition
            → Kooperation → Restrukturierung, mit wiederkehrenden Krisen
            entlang des Umsatzverlaufs.
          </p>
        </Card>
        <Card title="Hemmnisse bei Veränderungen (Widerstände)" accent={C.red}>
          <p style={{ fontStyle: "italic" }}>
            „Wenn der Wind der Veränderung weht, bauen die einen Mauern, die
            anderen Windmühlen."
          </p>
          <p>
            Ursachen für Widerstände: <b>rationale Gründe</b>,{" "}
            <b>politische Gründe</b>, <b>emotionale Gründe</b>.
          </p>
          <p style={{ fontSize: 13, color: C.muted }}>
            2 Ordnungen des Ausmaßes: 1. Ordnung = überschaubar, logisch,
            rational. 2. Ordnung = Turnaround/Paradigmenwechsel (Komplexität).
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Ein Unternehmen plant einen langfristig angelegten, schrittweisen Kulturwandel bei geringem akutem Druck. Welcher Wandel-Typ liegt vor?",
      options: ["Revolutionärer Wandel", "Evolutionärer Wandel", "Krisen-Wandel", "Kein Wandel nötig"],
      correct: 1,
      explain:
        "Geringer Veränderungsdruck kombiniert mit langfristigem Zeithorizont entspricht dem evolutionären Wandel (Organisationsentwicklung) im Skript-Diagramm.",
    },
  },

  {
    num: 13,
    title: "Change Management: Kraftfeld, Phasen & Emotionale Führung",
    category: "Change Management",
    content: (
      <>
        <Card title="Kraftfeld-Ansatz nach Lewin (Gleichgewichtsmodell)">
          <p>
            Treibende Kräfte vs. widerstrebende Kräfte halten die
            Betriebsleistung im Gleichgewicht. Drei Phasen:{" "}
            <b>Unfreezing</b> → <b>Changing</b> → <b>Refreezing</b>. Während
            des Wandels sinkt die Leistung typischerweise erst ab, bevor sie
            (im besten Fall) ein neues, höheres Niveau erreicht.
          </p>
        </Card>
        <Card title="Veränderungsphasen-Ansatz (Streich) — der emotionale Prozess des Wandels" accent={C.teal}>
          <p>
            Die emotionalen Reaktionen der Betroffenen folgen (nach Streich)
            immer demselben Muster, das nicht notwendigerweise linear
            verläuft — Rückschritte und Stillstand sind jederzeit möglich,
            wenn Emotionen nicht aufgefangen werden:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {[
              "1. Verneinung/Sorge",
              "2. Verunsicherung/Angst",
              "3. Widerstand: Ärger, Wut",
              "4. Rationale Einsicht/Frustration",
              "5. Emotionale Akzeptanz: Trauer/'Tal der Tränen'",
              "6. Öffnung: Neugier/Enthusiasmus",
              "7. Integration: Selbstvertrauen/Zuversicht/Freude",
            ].map((p, i) => (
              <Chip key={i} color={C.teal}>{p}</Chip>
            ))}
          </div>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
            Geeignete Haltung der Führungskraft: 1. Ernst nehmen, 2.
            Offenheit, 3. Kommunikation, 4. Ermutigung, 5. Verständnis, 6.
            Unterstützung, 7. Bestätigung.
          </p>
        </Card>
        <Card title="Emotionale Intelligenz & emotionale Führung (Goleman)" accent={C.amber}>
          <p>Vier Dimensionen (Goleman & Boyatzis):</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
            <Box color={C.amber} label="Selbstwahrnehmung (Ich)">
              Emotionale Selbstwahrnehmung, zutreffende Selbsteinschätzung,
              Selbstvertrauen
            </Box>
            <Box color={C.amber} label="Soziales Bewusstsein (Andere)">
              Empathie, Organisationsbewusstsein, Serviceorientierung
            </Box>
            <Box color={C.amber} label="Selbstmanagement (Ich)">
              Selbstkontrolle, Transparenz, Optimismus, Anpassungsfähigkeit,
              Ergebnisorientierung, Initiative
            </Box>
            <Box color={C.amber} label="Beziehungsmanagement (Andere)">
              Entwicklung fördern, inspirierende Führung, Einfluss,
              Konfliktmanagement, Teamwork & Kooperation
            </Box>
          </div>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Ein Mitarbeiter reagiert auf eine angekündigte Umstrukturierung zunächst mit Verneinung, dann mit Angst und später mit Wut. Was sollte eine Führungskraft laut Streich-Modell in dieser frühen Phase NICHT tun?",
      options: [
        "Die Gefühle ernst nehmen und offen kommunizieren",
        "Die Reaktion als 'Unsinn' abtun und einfach zur Tagesordnung übergehen",
      ],
      correct: 0,
      explain:
        "Das Streich-Modell empfiehlt für frühe Phasen: Ernst nehmen, Offenheit und Kommunikation — wer Emotionen ignoriert, riskiert Rückschritte oder Stillstand im Veränderungsprozess.",
    },
  },
];

/* ============================================================
   MODUL-INHALTE — STRATEGIE
   ============================================================ */
const strategieModules: Module[] = [
  {
    num: 1,
    title: "Klausur-Aufgabentypen im Überblick",
    category: "Einstieg",
    content: (
      <>
        <Card eyebrow="Wie könnten Prüfungsaufgaben aussehen?" title="Typische Aufgabenformate (Hartenstein, Billing, Schawel, Grein)">
          <p>
            Die Klausur im Modul Strategie orientiert sich stark an{" "}
            <b>Fallstudien/Case-Studies</b>, wie sie in
            Unternehmensberatungs-Interviews gestellt werden. Typische
            Aufgaben aus der Sammlung:
          </p>
          <ul style={{ paddingLeft: 20 }}>
            <li>Porter'sche Wertschöpfungskette anwenden</li>
            <li>SWOT-Analyse durchführen</li>
            <li>4-C-Methode anwenden (z. B. Flugbranche, Expansionsfall)</li>
            <li>Branchenstrukturanalyse mit den 5 Forces</li>
            <li>3 generische Strategien nennen & mit Beispiel erläutern</li>
            <li>
              Methoden einer Perspektive zuordnen: intern / extern / gemischt
            </li>
            <li>Schätzaufgaben ("Brainteaser") wie McBurger oder Kugelwaage</li>
          </ul>
          <Def term="Wichtiger Aufgabentyp">
            „Sie sind Referent/Referentin der Abteilung
            Unternehmensstrategie. Entwerfen Sie einen Vorschlag und
            begründen Sie Ihre Methodenwahl." — hier zählt vor allem die{" "}
            <b>Begründung, warum</b> ein Framework passt, nicht nur seine
            Anwendung.
          </Def>
        </Card>
        <Card title="Interne, externe oder gemischte Perspektive?" accent={C.teal}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            <Box color={C.teal} label="Intern">Wertschöpfungskette</Box>
            <Box color={C.amber} label="Extern">5 Forces</Box>
            <Box color={C.green} label="Gemischt">SWOT, 4C-Konzept, BCG</Box>
          </div>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Welches Rahmenkonzept betrachtet laut Skript ausschließlich die interne Perspektive eines Unternehmens?",
      options: ["5 Forces", "Wertschöpfungskette", "SWOT-Analyse", "4-C-Konzept"],
      correct: 1,
      explain:
        "Die Wertschöpfungskette (Value Chain) analysiert die internen primären und sekundären Aktivitäten des Unternehmens — eine reine interne Betrachtung.",
    },
  },

  {
    num: 2,
    title: "Das Five-Forces-Modell (Porter)",
    category: "Externe Analyse",
    content: (
      <>
        <Card eyebrow="3.2" title="Fünf Kräfte bestimmen die Branchenattraktivität">
          <p>
            Organisationen werden direkt durch mindestens fünf
            Einflussfaktoren tangiert, deren Zusammenwirken die{" "}
            <b>Attraktivität einer Branche</b> und damit einen Teil der{" "}
            <b>Profitabilität</b> von Unternehmen beeinflusst.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 8,
              marginTop: 10,
              alignItems: "center",
            }}
          >
            <div />
            <Box color={C.amber} label="Neue Wettbewerber">Markteintrittsbarrieren entscheidend</Box>
            <div />
            <Box color={C.teal} label="Lieferanten">Verhandlungsmacht</Box>
            <Box color={C.red} label="Branchenwettbewerber">Rivalität im Kern</Box>
            <Box color={C.teal} label="Kunden">Verhandlungsmacht</Box>
            <div />
            <Box color={C.amber} label="Substitutionsprodukte">Wechselkosten & wahrgenommene Gleichwertigkeit</Box>
            <div />
          </div>
        </Card>
        <Card title="Die 5 Kräfte im Detail" accent={C.teal}>
          <ul style={{ paddingLeft: 20, lineHeight: 1.9 }}>
            <li><b>I. Branchenwettbewerber:</b> größte Bedeutung der 5 Faktoren — Rivalität um Marktanteile führt zu Preiskämpfen, Werbeschlachten, Serviceverbesserungen.</li>
            <li><b>II. Neue Wettbewerber:</b> Gefahr steigt mit Attraktivität der Branche; entscheidend sind Markteintritts-/-austrittsbarrieren: Economies of Scale, Produktdifferenzierung, Kapitalbedarf, regulative Eingriffe des Staates.</li>
            <li><b>III. Substitutionsprodukte:</b> Gefahr umso größer, je geringer die Wechselkosten (switching costs) und je größer der Glaube an qualitative Gleichwertigkeit.</li>
            <li><b>IV. Lieferanten:</b> Macht umso größer, je konzentrierter/organisierter Lieferanten sind und je weniger Substitutionsmöglichkeiten bestehen.</li>
            <li><b>V. Kunden:</b> Macht umso größer, je indifferenter das Produkt ist und je konzentrierter/organisierter die Käufer auftreten.</li>
          </ul>
        </Card>
      </>
    ),
    quiz: {
      type: "scenario",
      situation:
        "In einem Markt gibt es nur zwei riesige Einkaufsketten, die den Großteil aller Produkte eines Herstellers abnehmen. Wie wirkt sich das nach Porter aus?",
      options: [
        "Hohe Abnehmermacht (Kunden) — die Ketten können Preise drücken",
        "Das betrifft nur die Substitutionsprodukte, nicht die Kundenmacht",
      ],
      correct: 0,
      explain:
        "Wenige, konzentrierte Abnehmer haben eine hohe Verhandlungsmacht und können Preiszugeständnisse durchsetzen — klassisches Beispiel für die Kraft 'Kunden' im Five-Forces-Modell.",
    },
  },

  {
    num: 3,
    title: "Die SWOT-Analyse",
    category: "Gemischte Analyse",
    content: (
      <>
        <Card eyebrow="3.3" title="Kernkompetenzen als zentraler Erfolgsfaktor">
          <p>
            Die SWOT-Analyse besteht aus einer <b>internen</b> und einer{" "}
            <b>externen</b> Betrachtung des Unternehmens.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
            <Box color={C.green} label="Strengths (Stärken) — intern">Interne Ressourcen & Strukturen</Box>
            <Box color={C.red} label="Weaknesses (Schwächen) — intern">Interne Ressourcen & Strukturen</Box>
            <Box color={C.teal} label="Opportunities (Chancen) — extern">Markt, Technologie, Demografie, Regulierung</Box>
            <Box color={C.amber} label="Threats (Gefahren) — extern">Markt, Technologie, Demografie, Regulierung</Box>
          </div>
        </Card>
        <Card title="Interne vs. externe Analyse" accent={C.teal}>
          <Grid2>
            <Box color={C.teal} label="I. Interne Analyse">
              Identifikation von Stärken/Schwächen anhand von{" "}
              <b>Hard Facts</b> (Marketing, Finanzen, Fertigung, Personal —
              z. B. via Wertschöpfungskette) und <b>Soft Facts</b> (v. a.
              Unternehmenskultur).
            </Box>
            <Box color={C.amber} label="II. Externe Analyse">
              Fokus auf das gesamte Umfeld: Wettbewerber, Marktstruktur,
              Marktdynamik — Bewertung von Marktposition, Ressourcen/
              Kernkompetenzen und Stärken/Schwächen der Konkurrenz.
            </Box>
          </Grid2>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
            Erst die Kombination der internen und externen Analyseergebnisse
            gibt endgültige und richtungsweisende Hinweise zur Formulierung
            der Unternehmensstrategie.
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "blank",
      textBefore:
        "Im SWOT-Modell gehören Stärken und Schwächen zur internen Analyse, während Chancen und Gefahren zur",
      textAfter: "Analyse gehören.",
      answers: ["externen", "externe"],
      explain:
        "Opportunities (Chancen) und Threats (Gefahren) beschreiben das Marktumfeld außerhalb des Unternehmens — daher externe Analyse.",
    },
  },

  {
    num: 4,
    title: "Die Wertschöpfungskette (Value Chain, Porter)",
    category: "Interne Analyse",
    content: (
      <>
        <Card eyebrow="3.6" title="Primäre & sekundäre Aktivitäten">
          <p>
            Die Wertschöpfungskette differenziert zwischen den{" "}
            <b>primären Aktivitäten</b> (Erstellung der Produkte/
            Dienstleistungen vom Eingang der Produktionsfaktoren bis zum
            Verkauf) und den <b>sekundären Aktivitäten</b> (unterstützen die
            Leistungserstellung, abteilungsübergreifend).
          </p>
        </Card>
        <Card title="Die fünf primären Aktivitäten" accent={C.teal}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Eingangslogistik", "Produktion", "Ausgangslogistik", "Marketing & Vertrieb", "Service"].map((p) => (
              <Chip key={p} color={C.teal}>{p}</Chip>
            ))}
          </div>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
            I. Eingangslogistik: Eingang, Kontrolle, Lagerung, Weitertransport
            von Einsatzmengen. II. Produktion: wertsteigernde Transformation
            (inkl. Qualitätsprüfung, Wartung). III. Ausgangslogistik:
            Lagerung & Distribution der Leistung an Kunden. IV. Marketing &
            Vertrieb: alle verkaufsgerichteten Aktivitäten. V. Service:
            Kundenbetreuung, Ersatzteillieferung.
          </p>
        </Card>
        <Card title="Die vier sekundären Aktivitäten" accent={C.amber}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["General Management", "Personalmanagement", "Technologie- & Informationsmanagement", "Beschaffung von Produktionsfaktoren"].map((p) => (
              <Chip key={p} color={C.amber}>{p}</Chip>
            ))}
          </div>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
            Die Analyse eignet sich besonders zur Schwachstellenfindung an
            den <b>Schnittstellen</b> zwischen primären und sekundären
            Bereichen.
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Ein Unternehmen möchte seine Kundenbetreuung nach dem Verkauf und die Ersatzteillieferung analysieren. Welcher primären Aktivität der Wertschöpfungskette entspricht das?",
      options: ["Eingangslogistik", "Produktion", "Service", "Beschaffung von Produktionsfaktoren"],
      correct: 2,
      explain:
        "Service umfasst genau die Betreuung des Kunden und die Lieferung von Ersatzteilen nach dem Verkauf — eine der fünf primären Aktivitäten.",
    },
  },

  {
    num: 5,
    title: "4P & 4C des Marketing-Mix",
    category: "Marktbearbeitung",
    content: (
      <>
        <Card eyebrow="3.4" title="McCarthy trifft Lauternborn">
          <p>
            Das <b>Vier-P-Modell</b> (Product, Price, Place, Promotion) von
            McCarthy wird durch das <b>Vier-C-Konzept</b> von Robert
            Lauternborn sinnvoll ergänzt — die simultane Anwendung ergibt ein
            abgerundetes Gesamtbild.
          </p>
        </Card>
        <Card title="Die vier Paare" accent={C.teal}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Box color={C.teal} label="Product ⟷ Customer needs">Produktpolitik ⟷ Kundenbedürfnisse</Box>
            <Box color={C.teal} label="Price ⟷ Cost to the customer">Preispolitik ⟷ Kosten für den Kunden</Box>
            <Box color={C.teal} label="Place ⟷ Convenience">Distributionspolitik ⟷ Mühelosigkeit des Zugriffs</Box>
            <Box color={C.teal} label="Promotion ⟷ Communication">Absatzförderung ⟷ Kommunikation</Box>
          </div>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
            Jedem P-Element ist ein korrespondierender C-Aspekt hinsichtlich
            des Kundennutzens zugeordnet — die 4P beschreiben die
            Anbieter-Sicht, die 4C die Kunden-Sicht auf dasselbe Instrument.
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Welcher C-Aspekt entspricht der Preispolitik (Price) im Vier-C-Konzept von Lauternborn?",
      options: [
        "Customer needs (Kundenbedürfnisse)",
        "Cost to the customer (Kosten für den Kunden)",
        "Convenience (Mühelosigkeit des Zugriffs)",
        "Communication (Kommunikation)",
      ],
      correct: 1,
      explain:
        "Price korrespondiert mit 'Cost to the customer' — der Preis aus Anbietersicht entspricht den Kosten, die der Kunde tatsächlich empfindet/trägt.",
    },
  },

  {
    num: 6,
    title: "Die drei generischen Strategien (Porter)",
    category: "Strategiewahl",
    content: (
      <>
        <Card eyebrow="3.7" title="Kostenführerschaft, Differenzierung, Konzentration">
          <p>
            Im Streben nach Wettbewerbsvorteilen lassen sich Geschäfts-
            strategien in <b>Kostenführerschaft</b> (Overall Cost
            Leadership), <b>Differenzierung</b> (Differentiation) und{" "}
            <b>Konzentration</b> (Focus) unterteilen. Das Modell heißt{" "}
            <i>generisch</i>, weil es auf jede Art von Organisation anwendbar
            ist.
          </p>
          <p style={{ fontSize: 13, color: C.muted }}>
            Zwei Achsen: <b>Strategische Ausrichtung</b> (Gesamtmarkt vs.
            Teilmarkt) und <b>Strategischer Vorteil</b> (Einzigartigkeit vs.
            Kostenminimum).
          </p>
        </Card>
        <Card title="Die drei Strategien im Detail" accent={C.teal}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <Box color={C.amber} label="I. Differenzierung">
              Wettbewerb über eine vom Kunden als einzigartig empfundene
              Leistung (z. B. BMW: Produktdesign, Mercedes-Benz:
              Markenimage). Risiko: Konkurrenz kann Alleinstellungsmerkmale
              kopieren.
            </Box>
            <Box color={C.teal} label="II. Kostenführerschaft">
              Wettbewerb über den Preis bei vergleichbarem Produkt.
              Kernkompetenz in Einkauf, Produktion, Logistik. Historisch
              stark bei asiatischen Automarken. Braucht meist hohe
              Absatzzahlen und/oder starkes Marktwachstum.
            </Box>
          </div>
          <div style={{ marginTop: 8 }}>
            <Box color={C.red} label="III. Konzentration (Focus)">
              Beschränkung auf einen Nischenmarkt (Teilmarkt), wobei dort
              entweder auf Differenzierung oder auf Kostenführerschaft
              gesetzt wird. Beispiel: Hersteller im Luxuslimousinen-/
              Sportwagensegment.
            </Box>
          </div>
        </Card>
      </>
    ),
    quiz: {
      type: "scenario",
      situation:
        "Ein Automobilhersteller bewirbt gezielt Luxus-Fahrzeuge für eine kleine, zahlungskräftige Zielgruppe mit exklusivem Markenimage — nicht für den Massenmarkt. Welche generische Strategie nach Porter trifft am besten zu?",
      options: [
        "Konzentration (Focus) mit Differenzierungsschwerpunkt in einem Nischenmarkt",
        "Kostenführerschaft auf dem Gesamtmarkt",
      ],
      correct: 0,
      explain:
        "Die Beschränkung auf ein enges Kundensegment (Teilmarkt) mit Fokus auf Einzigartigkeit entspricht der Konzentrationsstrategie mit differenzierender Ausrichtung — z. B. Luxuslimousinen-Hersteller im Skript.",
    },
  },

  {
    num: 7,
    title: "Das 4-C-Konzept in der Fallstudienpraxis",
    category: "Case-Study-Praxis",
    content: (
      <>
        <Card eyebrow="Beispiel: Flugbranche & Expansionsfall" title="Customer – Competition – Costs – Capabilities">
          <p>
            Das 4-C-Konzept betrachtet das <b>Kerngeschäft</b> eines
            Unternehmens aus vier Blickwinkeln und wird in Fallstudien oft
            mit dem Five-Forces-Modell kombiniert.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
            <Box color={C.teal} label="I. Customer (Kunden)">Wer sind die Kunden? Was sind ihre Bedürfnisse? Warum, wann und wie befriedigen sie diese?</Box>
            <Box color={C.teal} label="II. Competition (Wettbewerb)">Durch welche Einflussgrößen ist der Markt charakterisiert? (Ergänzung: Five Forces)</Box>
            <Box color={C.teal} label="III. Costs (Kosten)">Was sind die Hauptkostentreiber bei den Anbietern?</Box>
            <Box color={C.teal} label="IV. Capabilities (Fähigkeiten)">Welche Wettbewerbsvorteile/Kompetenzen haben die Unternehmen?</Box>
          </div>
        </Card>
        <Card title="Praxisbeispiel: Billig- vs. Hochkostenfluglinien" accent={C.amber}>
          <p style={{ fontWeight: 700, marginBottom: 4 }}>
            Kernfrage: Warum überleben etablierte Hochkostenfluglinien (mit
            teurem Service), während neue Billigfluglinien nach der
            Deregulierung reihenweise pleitegingen?
          </p>
          <p style={{ fontSize: 13, color: C.muted }}>
            Lösung im Skript: Hochkostenfluglinien differenzieren sich über{" "}
            <b>Capabilities</b> — hochqualifiziertes Personal und
            entwickelte IT-Systeme fürs Pricing (Yield Management), mit
            denen sie Angebot und Nachfrage in Echtzeit überwachen und Preise
            anpassen können. Das ist der entscheidende Wettbewerbsvorteil
            gegenüber reinen Billigfliegern.
          </p>
        </Card>
        <Card title="Transfer-Idee: Etablierte Autobauer vs. Tesla & China-Hersteller" accent={C.teal}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ color: C.amber, textAlign: "left" }}>
                  <th style={{ padding: 6 }}>4C-Dimension</th>
                  <th style={{ padding: 6 }}>Etablierte (VW, BMW, Mercedes)</th>
                  <th style={{ padding: 6 }}>Angreifer (Tesla, BYD)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Customer", "Premium-/Flottenkunden, Markenloyalisten, Status & Service", "Tech-Käufer, Preisbewusste, Software & Reichweite"],
                  ["Competition", "Dilemma: müssen in E-Mobilität investieren, altes Geschäft schrumpft", "Aggressive Preiskriege, wollen Markt disruptieren"],
                  ["Costs", "Teure Altlasten, komplexe Lieferketten, hohe Löhne", "Effiziente Gigafactories, Direktvertrieb, chin. Subventionen"],
                  ["Capabilities", "Massenproduktion, Marke, Händlernetz", "Software-Updates, autonomes Fahren, Batterie-Integration"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: 6, fontWeight: j === 0 ? 700 : 400, color: j === 0 ? C.text : "#D3DBE4" }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "In der Fallstudie zur Flugbranche liegt der entscheidende Wettbewerbsvorteil der Hochkostenfluglinien laut Lösungsvorschlag in welcher 4C-Dimension?",
      options: ["Customer", "Competition", "Costs", "Capabilities"],
      correct: 3,
      explain:
        "Capabilities: die hochmodernen IT- und Buchungssysteme sowie die Profis im Pricing (Yield Management), mit denen Preise in Echtzeit angepasst werden können, sind der entscheidende Vorteil.",
    },
  },

  {
    num: 8,
    title: "Das Gesamtkonzept zur Fallstudienlösung",
    category: "Toolkit",
    content: (
      <>
        <Card eyebrow="3.11" title="Werkzeugkasten: alle Methoden im Zusammenspiel">
          <p>
            Nach dem Erlernen der einzelnen Werkzeuge steht eine
            anspruchsvollere Leistung: die Integration zu einem
            einsatzbereiten Gesamtkonzept. Es unterscheidet zwischen{" "}
            <b>interner</b> und <b>externer Betrachtung</b> des Unternehmens.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
            <Box color={C.teal} label="Interne Betrachtung">
              Wertschöpfungskette → Gewinn-Gleichung → 4P & 4C → BCG-Portfolio
            </Box>
            <Box color={C.amber} label="Externe / gemischte Betrachtung">
              SWOT → 4-C-Konzept → Generische Strategien → 5 Forces →
              Businessplan
            </Box>
          </div>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 8 }}>
            Bei primär unternehmensbezogenen Fragen (z. B.
            Profitabilitätsanalysen) bietet sich die Wertschöpfungskette als
            Startpunkt an. Bei Fragen zum Umfeld eignet sich das
            Five-Forces-Modell. Für gemischte Fragestellungen (SWOT, 4C,
            generische Strategien) werden interne und externe Potenziale
            gleichzeitig betrachtet.
          </p>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
            Das <b>QHAR-Konzept</b> ist davon losgelöst als übergeordnetes,
            universell einsetzbares Prinzip zur strukturierten
            Problemlösung zu verstehen.
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Ein Bewerber soll primär eine reine Profitabilitätsanalyse eines einzelnen Unternehmens durchführen, ohne den Markt vertieft zu betrachten. Welches Konzept bietet sich laut Gesamtkonzept als Startpunkt an?",
      options: ["Five-Forces-Modell", "Wertschöpfungskette", "SWOT-Analyse", "Generische Strategien"],
      correct: 1,
      explain:
        "Bei primär unternehmensbezogenen Betrachtungen wie Profitabilitätsanalysen liegt es nahe, mit der internen Perspektive der Wertschöpfungskette zu beginnen.",
    },
  },

  {
    num: 9,
    title: "Schätzaufgaben (Brainteaser)",
    category: "Case-Study-Praxis",
    content: (
      <>
        <Card eyebrow="5.3 McBurger" title="Schätzaufgabe: Jahresumsatz einer Filiale">
          <p>
            Vorgehensweise: Ausgehend von der <b>kleinsten Einheit</b> des
            Umsatzes (dem einzelnen Kunden) wird hochgerechnet:
          </p>
          <ul style={{ paddingLeft: 20, fontSize: 14 }}>
            <li>Ø Ausgabe pro Gast: ca. 5 EUR</li>
            <li>Ø Gäste pro Stunde: ca. 100</li>
            <li>Öffnungszeit: 14 Std./Tag → 1.400 Gäste/Tag → 7.000 EUR/Tag</li>
            <li>Jahresumsatz ≈ <b>2,6 Mio. EUR pro Filiale</b></li>
          </ul>
        </Card>
        <Card eyebrow="5.4 Kugel-Brain-Teaser" title="9 Kugeln, 1 schwerer — wie viele Wiegevorgänge?" accent={C.teal}>
          <p>
            Acht Kugeln wiegen gleich viel, eine ist schwerer. Mit einer
            klassischen Waage (2 Wiegearme): wie oft muss man mindestens
            wiegen, um die schwere Kugel sicher zu identifizieren?
          </p>
        </Card>
      </>
    ),
    quiz: {
      type: "mc",
      question:
        "Wie viele Wiegevorgänge braucht man höchstens, um bei 9 Kugeln (1 davon schwerer) die schwere Kugel zu finden?",
      options: ["1", "2", "3", "4"],
      correct: 1,
      explain:
        "Man teilt in drei 3er-Gruppen. 1. Wiegen: zwei Gruppen gegeneinander → identifiziert die Gruppe mit der schweren Kugel (oder es ist die dritte). 2. Wiegen: zwei der drei verbliebenen Kugeln gegeneinander → die schwere Kugel ist eindeutig bestimmt. Macht insgesamt nur 2 Wiegevorgänge.",
    },
  },
];

/* ============================================================
   APP
   ============================================================ */
type AreaKey = "fuehrung" | "strategie";

const AREAS: Record<AreaKey, { label: string; subtitle: string; modules: Module[]; accent: string }> = {
  fuehrung: {
    label: "Führung",
    subtitle: "Kommunikation, Führungsstile & Change Management",
    modules: fuehrungModules,
    accent: C.amber,
  },
  strategie: {
    label: "Strategie",
    subtitle: "Frameworks & Case-Study-Methodik",
    modules: strategieModules,
    accent: C.teal,
  },
};

type DoneState = Record<AreaKey, Record<number, boolean>>;
const initialDone: DoneState = { fuehrung: {}, strategie: {} };

function HomeScreen({
  onSelect,
  onExit,
  done,
}: {
  onSelect: (key: AreaKey) => void;
  onExit: () => void;
  done: DoneState;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        fontFamily: bodyFont,
        color: C.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <button
        onClick={onExit}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          background: "transparent",
          border: "none",
          color: C.muted,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        ← Zurück zum Lern-Hub
      </button>
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: C.muted,
            marginBottom: 8,
          }}
        >
          Klausurvorbereitung · Hochschule Coburg
        </div>
        <h1 style={{ fontFamily: displayFont, fontSize: 36, margin: 0 }}>
          Welches Modul lernst du heute?
        </h1>
      </div>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
        {(Object.entries(AREAS) as [AreaKey, (typeof AREAS)[AreaKey]][]).map(([key, area]) => {
          const doneCount = Object.values(done[key] || {}).filter(Boolean).length;
          const pct = Math.round((doneCount / area.modules.length) * 100);
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              style={{
                width: 300,
                textAlign: "left",
                background: C.panel,
                border: `1px solid ${C.border}`,
                borderTop: `4px solid ${area.accent}`,
                borderRadius: 16,
                padding: "26px 24px",
                cursor: "pointer",
                color: C.text,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 700, color: area.accent, textTransform: "uppercase", letterSpacing: 1 }}>
                {area.modules.length} Themenblöcke
              </div>
              <div style={{ fontFamily: displayFont, fontSize: 26, fontWeight: 700, margin: "8px 0 6px" }}>
                {area.label}
              </div>
              <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>
                {area.subtitle}
              </div>
              <div style={{ height: 6, background: C.panel2, borderRadius: 999, overflow: "hidden" }}>
                <div style={{ width: `${pct}%`, height: "100%", background: area.accent }} />
              </div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>
                {doneCount} / {area.modules.length} gelernt
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StrategyHub() {
  const nav = useNavigator();
  const [area, setArea] = useState<AreaKey | null>(null);
  const [idx, setIdx] = useState(0);
  const [quizState, setQuizState] = useState<QuizStateMap>({});
  const [done, setDone] = useCloudProgress<DoneState>("strategyFuehrung", initialDone);

  if (!area) {
    return (
      <HomeScreen
        onSelect={(key) => {
          setArea(key);
          setIdx(0);
        }}
        onExit={() => nav.pop()}
        done={done}
      />
    );
  }

  const areaInfo = AREAS[area];
  const modules = areaInfo.modules;
  const accent = areaInfo.accent;
  const mod = modules[idx];
  const total = modules.length;
  const progress = Math.round(((idx + 1) / total) * 100);
  const areaDone = done[area] || {};

  const goTo = (i: number) => {
    setIdx(Math.max(0, Math.min(total - 1, i)));
    window.scrollTo?.(0, 0);
  };

  const markDoneAndNext = () => {
    setDone({ ...done, [area]: { ...areaDone, [idx]: true } });
    if (idx < total - 1) goTo(idx + 1);
  };

  const goHome = () => setArea(null);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        fontFamily: bodyFont,
        color: C.text,
        display: "flex",
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: 230,
          flexShrink: 0,
          borderRight: `1px solid ${C.border}`,
          padding: "22px 14px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
        }}
      >
        <button
          onClick={goHome}
          style={{
            background: "transparent",
            border: "none",
            color: C.muted,
            fontSize: 12,
            cursor: "pointer",
            padding: 0,
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          ← Hauptmenü
        </button>

        <div
          style={{
            fontFamily: displayFont,
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 4,
            color: accent,
          }}
        >
          {areaInfo.label}
        </div>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>
          Klausurvorbereitung · Hochschule Coburg
        </div>

        <div
          style={{
            height: 6,
            background: C.panel2,
            borderRadius: 999,
            marginBottom: 18,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              background: accent,
              transition: "width .3s",
            }}
          />
        </div>

        {modules.map((m, i) => (
          <button
            key={m.num}
            onClick={() => goTo(i)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              width: "100%",
              textAlign: "left",
              background: i === idx ? C.panel2 : "transparent",
              border: "none",
              borderRadius: 8,
              padding: "8px 10px",
              marginBottom: 2,
              cursor: "pointer",
              color: i === idx ? C.text : C.muted,
            }}
          >
            <span
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: areaDone[i] ? C.green : i === idx ? accent : C.panel2,
                color: areaDone[i] || i === idx ? "#1A1200" : C.muted,
                flexShrink: 0,
              }}
            >
              {areaDone[i] ? "✓" : m.num}
            </span>
            <span style={{ fontSize: 12.5, lineHeight: 1.3 }}>{m.title}</span>
          </button>
        ))}
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "32px 40px", maxWidth: 820 }}>
        <div style={{ marginBottom: 6 }}>
          <Chip color={accent}>{mod.category}</Chip>
          <span style={{ color: C.muted, fontSize: 12, marginLeft: 10 }}>
            Themenblock {mod.num} von {total}
          </span>
        </div>
        <h1
          style={{
            fontFamily: displayFont,
            fontSize: 30,
            margin: "6px 0 20px",
          }}
        >
          {mod.title}
        </h1>

        {mod.content}

        {/* PRÜF-MODUS */}
        <div
          style={{
            marginTop: 26,
            background: C.panel,
            border: `1px solid ${C.teal}55`,
            borderRadius: 14,
            padding: "20px 22px",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: C.teal,
              marginBottom: 12,
            }}
          >
            ✎ Prüf-Modus
          </div>
          <Quiz
            q={mod.quiz}
            qKey={`${area}-q${idx}`}
            state={quizState}
            setState={setQuizState}
          />
        </div>

        {/* NAV */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 28,
            paddingBottom: 40,
          }}
        >
          <button
            onClick={() => goTo(idx - 1)}
            disabled={idx === 0}
            style={{
              padding: "10px 18px",
              borderRadius: 8,
              border: `1px solid ${C.border}`,
              background: "transparent",
              color: idx === 0 ? C.muted : C.text,
              cursor: idx === 0 ? "default" : "pointer",
              opacity: idx === 0 ? 0.4 : 1,
            }}
          >
            ← Zurück
          </button>
          <button
            onClick={markDoneAndNext}
            disabled={idx === total - 1 && areaDone[idx]}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: accent,
              color: "#1A1200",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {idx === total - 1 ? "Abschließen ✓" : "Als gelernt markieren → weiter"}
          </button>
        </div>
      </main>
    </div>
  );
}
