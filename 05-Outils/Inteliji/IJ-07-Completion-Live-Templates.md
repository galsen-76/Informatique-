---
created: 2026-09-16
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M01
aliases:
  - "Complétion de Code & Live Templates IntelliJ"
tags:
  - outils/intellij/completion
parent: "[[IntelliJ IDEA]]"
related_theory: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://www.jetbrains.com/help/idea/auto-completing-code.html"
---

# Complétion et Live Templates IntelliJ

> [!abstract] En bref
> IntelliJ complète ton code intelligemment (il propose seulement ce qui a du sens à cet endroit) et permet de créer des **live templates** : tu tapes une abréviation, `Tab`, et un bloc de code apparaît, avec des zones à remplir. Idéal pour ce que tu écris souvent.

## Les complétions

| Raccourci | Propose |
|---|---|
| `Ctrl+Espace` | complétion de base |
| `Ctrl+Shift+Espace` | complétion **selon le type attendu** (plus précise) |
| `Ctrl+Shift+Entrée` | **termine l'instruction** (ajoute `)`, `;`, `{}`) |
| `Tab` au lieu d'`Entrée` | **remplace** le mot existant au lieu d'insérer |

## Les « postfix » : écrire à l'envers

Tape une expression, puis `.` et un mot-clé :

| Tu tapes | Tu obtiens |
|---|---|
| `movies.for` + `Tab` | `for (const movie of movies) { }` |
| `user.null` | `if (user === null) { }` |
| `result.const` | `const result = …;` |
| `condition.if` | `if (condition) { }` |
| `promise.await` | `await promise` |
| `value.log` | `console.log(value)` |

## Les live templates

Des abréviations fournies, puis les tiennes (*Settings → Editor → Live Templates*) :

**Un composant Angular avec signals** (abréviation `ngsc`) :

```ts
@Component({
  selector: 'app-$NAME$',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `$END$`,
})
export class $CLASS$Component {
}
```

**Un test Vitest** (abréviation `desc`) :

```ts
describe('$SUBJECT$', () => {
  it('$SHOULD$', () => {
    $END$
  });
});
```

`$NAME$` = zone à remplir (on passe à la suivante avec `Tab`), `$END$` = position finale du curseur.

## Entourer du code : `Ctrl+Alt+T`

Sélectionne des lignes → `Ctrl+Alt+T` → *try / catch*, *if*, *for*… Le bloc est placé autour.

## Générer : `Alt+Insert`

Dans un fichier ou dans l'arborescence : créer un composant, un fichier de test, un constructeur, etc.

## Et l'IA ?

IntelliJ propose aussi une complétion par IA (ligne entière, fonction). Utile, mais **relis toujours** ce qui est proposé : voir [[IA-07-IA-Assistee-Dev|IA au quotidien]].

## Pièges

- **Accepter une complétion sans la lire**, surtout celle de l'IA.
- **Des templates pour tout** : crée-en seulement pour ce que tu tapes vraiment souvent.
