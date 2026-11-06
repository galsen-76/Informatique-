---
type: concept
domain: devops
module: "[[Module 14 - DevOps et déploiement]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Pipeline GitLab CI]]"
  - "[[Variables CI-CD GitLab]]"
  - "[[YAML]]"
parents:
  - "[[Pipeline GitLab CI]]"
related:
  - "[[extends GitLab CI]]"
next_review: 
method: []
tags:
  - concept
  - devops
---
# Règles d'un job GitLab (rules)

> [!info] En une phrase
> La section rules: d'un job décide s'il est lancé, quand (automatique ou manuel) et si son échec bloque la pipeline.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
`rules:` est une liste de conditions lues **dans l'ordre** ; la **première** qui correspond décide. Chaque règle peut dire :
- `if:` une condition sur des variables (`$CI_COMMIT_BRANCH == "main"`) ;
- `changes:` seulement si certains fichiers ont changé ;
- `when:` `on_success` (par défaut), `manual` (bouton ▶), `never` (jamais), `always` ;
- `allow_failure: true` : un échec n'arrête pas la pipeline.

Si **aucune** règle ne correspond, le job n'est **pas ajouté** à la pipeline.

### Pourquoi ça existe
Tous les jobs ne doivent pas tourner tout le temps : publier seulement sur `main`, déployer seulement sur demande, ignorer un job instable.

### Le problème résolu
Des pipelines qui font tout à chaque push (lentes, coûteuses) ou qui publient des images depuis n'importe quelle branche.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  R1{Règle 1 ?} -- oui --> D1[Décide]
  R1 -- non --> R2{Règle 2 ?}
  R2 -- non --> N[Pas de job]
```

### Exemple concret
```yaml
publier:
  stage: publish
  script: ./publier.sh
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH   # sur main : automatique
    - if: $CI_COMMIT_TAG                            # sur un tag : automatique
    - when: manual                                  # ailleurs : bouton ▶
      allow_failure: true                           # sans bloquer la pipeline

tests-lents:
  script: pytest tests/lents
  rules:
    - changes: [cvat/**/*]                          # seulement si le code a changé
```
Un job **manuel** sans `allow_failure: true` **bloque** les stages suivants jusqu'au clic.

### Cas d'utilisation
- Construire à chaque push, publier seulement sur `main` ou un tag
- Un job manuel de déploiement
- Projet CVAT : ne lancer que les jobs utiles sur ta branche

> [!warning] À ne pas confondre
> `when: never` / aucune règle (le job **n'existe pas** dans la pipeline) et `skipped` (le job existe mais n'a pas été lancé). Et l'ancien `only:` / `except:` : même rôle, à ne pas mélanger avec `rules:` dans un même job.

## 3 · Pratiquer
- Écris un job qui tourne automatiquement sur `main` et en manuel ailleurs, et vérifie son comportement sur deux branches.
- Dans la CI de CVAT, trouve un job `allow_failure` et un job `manual`, et explique pourquoi ils le sont.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Pipeline GitLab CI]] · [[Variables CI-CD GitLab]] · [[YAML]]
- **Complémentaires** : [[extends GitLab CI]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
