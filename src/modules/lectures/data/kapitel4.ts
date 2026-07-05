import type { LectureChapter } from '../types';

export const kapitel4: LectureChapter = {
  id: 'kapitel4',
  number: 4,
  title: 'Datenselektion, Relationale Algebra',
  subtitle: 'Projektion & Selektion, JOINs, Gruppierung und Aggregation mit SQL',
  icon: '🗃️',
  color: 'var(--sql-cyan)',
  tutorial: [
    {
      title: 'Relationale Algebra: Projektion und Selektion',
      content:
        'Die relationale Algebra ist eine Sammlung von Operationen, mit denen Daten aus Tabellen (Relationen) abgefragt werden. Das Ergebnis jeder Operation ist wieder eine neue Relation, also wieder eine Tabelle. Die Projektion wählt Spalten aus einer Tabelle aus, die Selektion wählt Zeilen aus einer Tabelle aus. Beide Operationen finden sich direkt in SQL wieder: Projektion im SELECT-Teil, Selektion im WHERE-Teil.',
    },
    {
      title: 'Projektion: Spalten auswählen',
      content:
        'Am Beispiel der Tabelle Kunde (KdNr, Name, Umsatz, Absatz): Eine Projektion auf die Spalten Name und Umsatz liefert eine neue Tabelle mit genau diesen zwei Spalten, aber weiterhin allen Zeilen der Ausgangstabelle. In SQL erfolgt die Projektion mit SELECT und der Angabe der gewünschten Spaltennamen. Der Platzhalter * projiziert auf alle Spalten, z. B. SELECT * FROM Kunde.',
    },
    {
      title: 'Selektion: Zeilen auswählen mit WHERE',
      content:
        'Die Selektion (auch Restriktion genannt) wählt bestimmte Zeilen einer Tabelle aus, z. B. alle Kunden mit Umsatz >= 100.000. In SQL erfolgt sie mit dem Befehl WHERE und einer Bedingung. Für Zahlen, Datum, Zeit und Währung stehen Vergleichsoperatoren wie =, >, >=, <, <=, <> zur Verfügung. Für Text gibt es zusätzlich LIKE mit den Platzhaltern % (beliebig viele Zeichen) und _ (genau ein Zeichen).',
    },
    {
      title: 'Bedingungen verknüpfen: AND, OR, NOT',
      content:
        'Mehrere Bedingungen in der WHERE-Klausel lassen sich mit den booleschen Operatoren AND, OR und NOT verknüpfen, z. B. Umsatz >= 100.000 AND Name LIKE \'Müller%\'. Jede Teilbedingung ist entweder WAHR oder FALSCH. AND verlangt, dass beide Teilbedingungen WAHR sind, bei OR reicht bereits eine erfüllte Teilbedingung, NOT kehrt das Ergebnis einer Bedingung um.',
    },
    {
      title: 'Projektion und Selektion kombiniert',
      content:
        'In der Praxis werden Projektion und Selektion meist gemeinsam verwendet: SELECT Name, Umsatz FROM Kunde WHERE Umsatz >= 100.000 wählt zuerst die passenden Zeilen aus (Selektion) und zeigt davon dann nur die Spalten Name und Umsatz (Projektion). Das Ergebnis ist wieder eine eigenständige Tabelle, die Ergebnisrelation.',
    },
    {
      title: 'Tabellen verknüpfen: das kartesische Produkt',
      content:
        'Um Daten aus zwei Tabellen zu kombinieren, wird gedanklich zunächst jede Zeile der einen Tabelle mit jeder Zeile der anderen Tabelle kombiniert – das kartesische Produkt (Tabelle1 × Tabelle2). Dieses Zwischenergebnis ist meist sehr groß und enthält viele unsinnige Kombinationen. Ein JOIN filtert daraus gezielt die sinnvollen Zeilenkombinationen heraus, in der Regel über inhaltlich zusammengehörige Spalten wie KdNr in Kunde und Auftrag.',
    },
    {
      title: 'INNER JOIN: die Schnittmenge',
      content:
        'Der INNER JOIN verknüpft zwei Tabellen über eine gemeinsame Spalte, z. B. ON Kunde.KdNr = Auftrag.KdNr, und liefert nur die Zeilen, für die es in beiden Tabellen einen übereinstimmenden Wert gibt. Kunden ohne Aufträge und Aufträge ohne passenden Kunden fallen dabei komplett aus dem Ergebnis heraus. Man kann sich das Ergebnis als Schnittmenge der beiden Tabellen vorstellen.',
    },
    {
      title: 'LEFT OUTER JOIN: alles aus der linken Tabelle',
      content:
        'Der LEFT OUTER JOIN liefert zusätzlich zur Schnittmenge auch die Zeilen der linken Tabelle, für die es in der rechten Tabelle keinen passenden Wert gibt; für die Spalten der rechten Tabelle werden dann NULL-Werte eingesetzt. Mit der Zusatzbedingung WHERE Auftrag.KdNr IS NULL lassen sich gezielt nur die Zeilen anzeigen, die ausschließlich in der linken Tabelle vorkommen, z. B. alle Kunden ohne Auftrag. Dieses Ergebnis entspricht der Differenz „linke Tabelle minus Schnittmenge“.',
    },
    {
      title: 'Gruppierung, Sortierung und Aggregation',
      content:
        'GROUP BY fasst Zeilen mit gleichen Werten in den angegebenen Spalten zu je einer Ergebniszeile zusammen; die nicht-aggregierten Spalten im SELECT müssen dabei auch in GROUP BY stehen. Aggregationsfunktionen wie COUNT, SUM, MAX, MIN und AVG erzeugen dabei eine neue Spalte mit einem Kennwert je Gruppe. ORDER BY sortiert das Ergebnis zusätzlich auf- (ASC) oder absteigend (DESC) nach einer oder mehreren Spalten, ändert dabei aber nichts an der Menge der Zeilen.',
    },
  ],
  exercises: {
    easy: [
      {
        q: 'Was ist das Ergebnis einer Projektion?',
        options: [
          'Ausgewählte Spalten einer Tabelle, aber alle Zeilen bleiben erhalten',
          'Ausgewählte Zeilen einer Tabelle, aber alle Spalten bleiben erhalten',
          'Nur die erste Zeile der Tabelle',
          'Eine leere Tabelle ohne Inhalt',
        ],
        correct: 0,
        explain:
          'Die Projektion wählt Spalten aus einer Tabelle aus; das Ergebnis enthält weiterhin alle Zeilen der Ausgangstabelle, aber nur die gewünschten Spalten.',
      },
      {
        q: 'Was ist das Ergebnis einer Selektion?',
        options: [
          'Auswahl von Zeilen einer Tabelle anhand einer Bedingung',
          'Auswahl von Spalten einer Tabelle',
          'Eine automatische Sortierung der Tabelle',
          'Das Löschen von Datensätzen aus der Tabelle',
        ],
        correct: 0,
        explain:
          'Die Selektion (Restriktion) wählt Zeilen aus, die eine bestimmte Bedingung erfüllen; die Spaltenstruktur bleibt unverändert.',
      },
      {
        q: 'Mit welchem SQL-Befehl erfolgt die Projektion auf bestimmte Spalten?',
        options: ['SELECT', 'WHERE', 'FROM', 'GROUP BY'],
        correct: 0,
        explain:
          'SELECT mit der Angabe von Spaltennamen führt die Projektion aus. WHERE filtert dagegen Zeilen, das ist die Selektion.',
      },
      {
        q: 'Mit welchem SQL-Befehl erfolgt die Selektion (Filterung von Zeilen)?',
        options: ['FROM', 'WHERE', 'SELECT', 'ORDER BY'],
        correct: 1,
        explain:
          'WHERE mit einer Bedingung filtert die Zeilen einer Tabelle. SELECT bestimmt dagegen nur die Spalten.',
      },
      {
        q: 'Wofür steht der Platzhalter * in der Anweisung SELECT * FROM Kunde?',
        options: [
          'Für alle Spalten der Tabelle',
          'Für alle Zeilen der Tabelle',
          'Für die erste Spalte der Tabelle',
          'Für ein beliebiges Zeichen in einem Text',
        ],
        correct: 0,
        explain:
          'Der Platzhalter * projiziert auf alle Attribute (Spalten) der Tabelle. Für Zeilen ist er nicht zuständig.',
      },
      {
        q: 'Mit welchem Operator vergleicht man Text mit einem Muster wie \'Müller%\'?',
        options: ['LIKE', '=', 'IN', 'BETWEEN'],
        correct: 0,
        explain:
          'LIKE erlaubt Mustervergleiche bei Text, mit % für beliebig viele und _ für genau ein Zeichen.',
      },
      {
        q: 'Welcher boolesche Operator verlangt, dass BEIDE Teilbedingungen erfüllt sind?',
        options: ['AND', 'OR', 'NOT', 'LIKE'],
        correct: 0,
        explain:
          'AND liefert nur dann WAHR, wenn beide Teilbedingungen WAHR sind. Bei OR genügt bereits eine erfüllte Teilbedingung.',
      },
      {
        q: 'Welcher SQL-Befehl fasst Zeilen mit gleichen Werten zu je einer Ergebniszeile zusammen?',
        options: ['GROUP BY', 'ORDER BY', 'WHERE', 'JOIN'],
        correct: 0,
        explain:
          'GROUP BY gruppiert die Zeilen nach den angegebenen Attributen und erzeugt eine Ergebniszeile je Wertekombination.',
      },
    ],
    advanced: [
      {
        q: 'Tabelle Kunde: 1234 Müller GmbH, Umsatz 80.000 · 1235 MStahl GmbH, Umsatz 100.000 · 1240 Meier AG, Umsatz 100.000 · 1241 abc GmbH, Umsatz 2.000.000 · 1250 Mtech GmbH, Umsatz 80.000. Was liefert SELECT Name, Umsatz FROM Kunde WHERE Umsatz >= 100.000?',
        options: [
          'MStahl GmbH, Meier AG und abc GmbH mit ihrem jeweiligen Umsatz',
          'Alle fünf Kunden mit Name und Umsatz',
          'Nur abc GmbH mit Umsatz 2.000.000',
          'Müller GmbH und Mtech GmbH mit ihrem jeweiligen Umsatz',
        ],
        correct: 0,
        explain:
          'Nur Kunden mit Umsatz >= 100.000 erfüllen die WHERE-Bedingung: MStahl GmbH (100.000), Meier AG (100.000) und abc GmbH (2.000.000). Müller GmbH und Mtech GmbH haben nur 80.000 Umsatz und fallen daher heraus.',
      },
      {
        q: 'Kunde 1236 (Schulz) hat keinen Eintrag in der Tabelle Auftrag. Was passiert mit Schulz bei einem INNER JOIN zwischen Kunde und Auftrag über KdNr?',
        options: [
          'Schulz erscheint nicht im Ergebnis',
          'Schulz erscheint mit NULL-Werten für die Auftragsspalten',
          'Schulz erscheint mehrfach im Ergebnis',
          'Der JOIN kann ohne Auftrag nicht ausgeführt werden',
        ],
        correct: 0,
        explain:
          'Der INNER JOIN liefert nur Zeilen mit übereinstimmenden Werten in beiden Tabellen. Ohne passenden Auftrag fällt Schulz komplett aus dem Ergebnis heraus.',
      },
      {
        q: 'Kunde 1234 (Meier) hat zwei Aufträge (AuftragsNr 100 und 101) in der Tabelle Auftrag. Wie oft erscheint Kunde 1234 im Ergebnis eines INNER JOIN zwischen Kunde und Auftrag über KdNr?',
        options: ['Einmal', 'Zweimal', 'Dreimal', 'Gar nicht'],
        correct: 1,
        explain:
          'Für jede passende Zeile in Auftrag entsteht eine eigene Ergebniszeile. Da Kunde 1234 zwei Aufträge hat, erscheint er im Ergebnis zweimal.',
      },
      {
        q: 'Was bewirkt die Bedingung WHERE Auftrag.KdNr IS NULL nach einem LEFT OUTER JOIN von Kunde und Auftrag?',
        options: [
          'Sie zeigt nur Kunden ohne passenden Auftrag',
          'Sie zeigt nur Kunden mit mindestens einem Auftrag',
          'Sie zeigt nur Aufträge ohne zugehörigen Kunden',
          'Sie entfernt alle NULL-Werte dauerhaft aus der Tabelle',
        ],
        correct: 0,
        explain:
          'Beim LEFT OUTER JOIN werden für Kunden ohne Auftrag NULL-Werte in den Auftragsspalten eingesetzt. WHERE ... IS NULL filtert genau diese Kunden ohne Auftrag heraus.',
      },
      {
        q: 'Was bewirkt ORDER BY Umsatz DESC in einer SQL-Abfrage?',
        options: [
          'Die Zeilen werden nach Umsatz absteigend sortiert, die Anzahl der Zeilen bleibt gleich',
          'Die Zeilen werden nach Umsatz aufsteigend sortiert',
          'Zeilen mit niedrigem Umsatz werden aus dem Ergebnis entfernt',
          'Es wird nur die Zeile mit dem höchsten Umsatz angezeigt',
        ],
        correct: 0,
        explain:
          'ORDER BY sortiert lediglich die vorhandenen Zeilen, verändert aber nicht deren Anzahl oder Auswahl. DESC steht für absteigend sortiert.',
      },
      {
        q: 'Kunde 1234 (Meier) hat drei Auftragspositionen mit Absatz-Werten 34, 34 und 60. SELECT Kunde.KdNr, Kunde.Name, AVG(Kunde.Absatz) FROM Kunde GROUP BY Kunde.KdNr, Kunde.Name liefert für Meier welchen Durchschnittswert?',
        options: ['21', '43', '60', '128'],
        correct: 1,
        explain:
          'AVG bildet den Durchschnitt aller Absatz-Werte der Gruppe Meier: (34 + 34 + 60) / 3 ≈ 43.',
      },
      {
        q: 'Es sollen alle Kunden ohne Umsatz gefunden werden. Welche Kombination aus JOIN-Typ und Bedingung liefert dieses Ergebnis?',
        options: [
          'INNER JOIN mit WHERE Umsatz.KdNr IS NULL',
          'LEFT OUTER JOIN mit WHERE Umsatz.KdNr IS NULL',
          'Kartesisches Produkt ohne jede Bedingung',
          'GROUP BY auf der Spalte Umsatz',
        ],
        correct: 1,
        explain:
          'Nur der LEFT OUTER JOIN liefert auch Kunden ohne passenden Umsatz-Datensatz (mit NULL in den Umsatzspalten); erst danach lässt sich mit WHERE ... IS NULL genau diese Teilmenge herausfiltern. Ein INNER JOIN würde solche Kunden von vornherein ausschließen.',
      },
      {
        q: 'Was ist der Hauptunterschied zwischen GROUP BY und ORDER BY?',
        options: [
          'GROUP BY fasst Zeilen zu Gruppen zusammen und reduziert dadurch die Zeilenanzahl, ORDER BY sortiert nur, ohne die Zeilenanzahl zu verändern',
          'Beide Befehle sortieren lediglich die Ergebnistabelle',
          'GROUP BY sortiert die Ergebnisse, ORDER BY gruppiert sie',
          'Beide Befehle filtern Zeilen anhand einer Bedingung',
        ],
        correct: 0,
        explain:
          'GROUP BY erzeugt eine Ergebniszeile je Wertekombination und reduziert damit meist die Zeilenanzahl. ORDER BY verändert nur die Reihenfolge der bereits vorhandenen Zeilen.',
      },
    ],
    pro: [
      {
        q: 'Welche Aussage zum INNER JOIN zwischen Kunde und Auftrag über KdNr ist FALSCH?',
        options: [
          'Kunden ohne Auftrag fehlen im Ergebnis',
          'Aufträge ohne passenden Kunden fehlen im Ergebnis',
          'Das Ergebnis kann mehr Zeilen enthalten als die Tabelle Kunde, wenn ein Kunde mehrere Aufträge hat',
          'Für nicht übereinstimmende Datensätze enthält das Ergebnis Zeilen mit NULL-Werten',
        ],
        correct: 3,
        explain:
          'Der INNER JOIN liefert ausschließlich Zeilen mit Übereinstimmung in beiden Tabellen. NULL-Zeilen für nicht übereinstimmende Datensätze entstehen erst bei einem OUTER JOIN, nicht beim INNER JOIN.',
      },
      {
        q: 'Ein Auftrag verweist über die Spalte KdNr auf einen Kunden 1240, der in der Tabelle Kunde selbst gar nicht existiert. Was passiert mit diesem Auftrag bei einem INNER JOIN zwischen Kunde und Auftrag?',
        options: [
          'Er erscheint im Ergebnis mit NULL statt Kundendaten',
          'Er fällt komplett aus dem Ergebnis heraus',
          'Er erscheint einmal pro Auftragsposition, unabhängig vom Kunden',
          'Die Abfrage bricht mit einem Fehler ab',
        ],
        correct: 1,
        explain:
          'Beim INNER JOIN müssen beide Seiten einen übereinstimmenden Wert in der Verknüpfungsspalte haben. Fehlt der Kunde 1240 in der Tabelle Kunde, fällt der zugehörige Auftrag vollständig aus dem Ergebnis heraus.',
      },
      {
        q: 'Welche Aussage zum LEFT OUTER JOIN ist FALSCH?',
        options: [
          'Er enthält alle Zeilen der linken Tabelle, auch ohne Treffer in der rechten Tabelle',
          'Für nicht zugeordnete Zeilen der rechten Tabelle werden NULL-Werte eingesetzt',
          'Er enthält garantiert auch alle Zeilen der rechten Tabelle, die keinen Treffer in der linken Tabelle haben',
          'Kombiniert mit WHERE rechteTabelle.Spalte IS NULL lassen sich nur die unverknüpften linken Zeilen anzeigen',
        ],
        correct: 2,
        explain:
          'Der LEFT OUTER JOIN bevorzugt die linke Tabelle. Zeilen der rechten Tabelle ohne Treffer links werden dabei nicht automatisch aufgenommen — das wäre die Aufgabe eines RIGHT OUTER JOIN oder FULL OUTER JOIN.',
      },
      {
        q: 'Kunde 1234 (Meier) hat drei Auftragspositionen mit den AuftragsNr 100, 101 und 101 (zwei Positionen im selben Auftrag 101). Was liefert COUNT(DISTINCT AuftragsNr) für Meier?',
        options: ['1', '2', '3', '0'],
        correct: 1,
        explain:
          'COUNT(DISTINCT ...) zählt nur unterschiedliche Werte. AuftragsNr 100 und 101 sind zwei verschiedene Aufträge, auch wenn 101 durch zwei Positionen zweimal vorkommt — das Ergebnis ist also 2.',
      },
      {
        q: 'Welche Aussage zu GROUP BY ist korrekt?',
        options: [
          'Die nicht-aggregierten Spalten im SELECT müssen auch in der GROUP-BY-Klausel stehen',
          'GROUP BY kann sich immer nur auf genau eine Spalte beziehen',
          'GROUP BY sortiert das Ergebnis zusätzlich automatisch aufsteigend',
          'GROUP BY funktioniert nur in Kombination mit einem JOIN',
        ],
        correct: 0,
        explain:
          'Die nicht-aggregierten SELECT-Spalten müssen auch in GROUP BY aufgeführt sein, damit jede Ergebniszeile eindeutig einer Wertekombination entspricht. Eine automatische Sortierung übernimmt dagegen ORDER BY, nicht GROUP BY.',
      },
      {
        q: 'Warum liefert ein kartesisches Produkt aus der Tabelle Kunde (4 Zeilen) und der Tabelle Auftrag (4 Zeilen) ohne jede Verknüpfungsbedingung 16 Ergebniszeilen?',
        options: [
          'Weil jede Zeile der einen Tabelle mit jeder Zeile der anderen Tabelle kombiniert wird (4 × 4)',
          'Weil doppelte Zeilen automatisch entfernt werden',
          'Weil nur Zeilen mit übereinstimmender KdNr kombiniert werden',
          'Weil NULL-Werte in beiden Tabellen doppelt gezählt werden',
        ],
        correct: 0,
        explain:
          'Das kartesische Produkt bildet alle möglichen Kombinationen beider Tabellen, also Zeilenzahl₁ × Zeilenzahl₂ = 4 × 4 = 16. Erst eine JOIN-Bedingung über ON bzw. WHERE filtert daraus die inhaltlich sinnvollen Kombinationen heraus.',
      },
    ],
  },
};
