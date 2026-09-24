---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
tags:
  - tests/code-review
aliases:
  - "Code Review"
parent: "[[Tests et Qualité]]"
children: []
related_theory:
  - "[[02-Merge-Requests|Merge Requests]]"
  - "[[ARCH-10-Clean-Code|Clean Code]]"
related_snippets:
  - "[[04_Snippets/test-07-code-review]]"
related_projects: []
source: "https://google.github.io/eng-practices/review/"
---

# Code Review

> [!abstract] Introduction
> La revue de code fait relire chaque changement par un pair avant intégration : elle détecte des bugs, diffuse la connaissance et harmonise les pratiques — à condition d'être bienveillante, rapide et centrée sur l'essentiel.

> [!warning]- Prérequis
> [[02-Merge-Requests|Merge Requests]]

---

## Théorie

> [!question]- C'est quoi ?
> Ce que regarde un relecteur (par priorité) :
> 1. **Correction** : le code fait-il ce qui est demandé ? cas limites, erreurs
> 2. **Sécurité** : autorisations, validation, données sensibles
> 3. **Conception** : bon endroit, bonne responsabilité, pas de duplication
> 4. **Lisibilité** : noms, taille des fonctions, complexité
> 5. **Tests** : présents, pertinents
> 6. Le style → laissé aux outils (Prettier, ESLint)

> [!example]- Analogie
> La relecture d'un article avant publication par un collègue : il ne réécrit pas ton style, il repère l'erreur factuelle et le paragraphe incompréhensible.

> [!question]- Pourquoi l'utiliser ?
> Moins de bugs en production, montée en compétence mutuelle (tu apprends énormément en relisant les seniors), bus factor réduit.

> [!question]- Comment ça marche ?
> Côté auteur : MR petite, description claire, auto-relecture, pipeline vert.
> Côté relecteur :
> - Commenter le code, pas la personne ; poser des questions (« Que se passe-t-il si la liste est vide ? »)
> - Préfixer : `bloquant:`, `suggestion:`, `question:`, `nit:` (détail)
> - Féliciter ce qui est bien fait
> - Répondre dans la journée

> [!question]- Quand l'utiliser ?
> Chaque MR. Relire aussi le code des seniors : c'est la meilleure école.

> [!danger]- Quand NE PAS l'utiliser / Limites
> La revue ne remplace pas les tests ; une revue de 2000 lignes est une formalité inefficace.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Nit | Remarque mineure non bloquante |
| LGTM | « Looks good to me » |
| Bus factor | Nombre de personnes dont le départ bloquerait le projet |

---

## Points clés

- Priorité au fond (correction, sécurité, conception)
- Style = outils automatiques
- Commentaires bienveillants et explicites sur leur importance
- Petites MR relues vite

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Débattre de style en revue
> - Approuver sans lire (« LGTM » réflexe)
> - Prendre les remarques personnellement

---

## Exemple minimal

```text
question: si `films` est vide, `films[0].id` lève une erreur ; ce cas peut-il arriver après un filtre ?
suggestion (non bloquant) : `toSorted` éviterait de muter le signal source.
nit: `data2` → `filmsFiltres` ?
👍 Très bonne idée d'avoir extrait `formaterDuree`, c'est testable maintenant.
```

> [!note] Ce que j'en retiens
> Chaque commentaire annonce son importance et propose une piste.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Mentorat via la revue : expliquer le pourquoi, partager des ressources

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Tests et Qualité]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/test-07-code-review]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Quelles sont les priorités d'une revue de code ?

> [!faq]- Questions d'entretien
> - Comment réagissez-vous à une critique de votre code ?

---

## Tâches

- [ ] #task Relire une MR d'un collègue senior par semaine et noter 1 chose apprise
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
