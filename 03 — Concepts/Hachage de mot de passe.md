---
type: concept
domain: securite
module: "[[Module 10 - Authentification et sécurité]]"
status: a-decouvrir
level: debutant
niveau: 5
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Authentification]]"
parents:
  - "[[Authentification]]"
related:
  - "[[Session et cookie]]"
next_review: 
tags:
  - concept
  - securite
---
# Hachage de mot de passe

> [!info] En une phrase
> On ne stocke jamais un mot de passe : on stocke son empreinte calculée par une fonction lente et salée (bcrypt, argon2), et on compare les empreintes à la connexion.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Une **fonction de hachage** transforme un texte en empreinte de taille fixe, **sans retour possible**. À la connexion, on hache ce que l'utilisateur tape et on compare.
- **Sel** (*salt*) : une valeur aléatoire ajoutée à chaque mot de passe ; deux utilisateurs avec le même mot de passe ont des empreintes différentes.
- **Lente exprès** : **argon2**, **bcrypt**, **scrypt** prennent ~100 ms, ce qui rend les essais en masse très coûteux.
- **Jamais** MD5 ou SHA-256 seuls pour des mots de passe : trop rapides (des milliards d'essais par seconde).
- **Chiffrer** (réversible avec une clé) n'est pas **hacher** (irréversible).

### Pourquoi ça existe
Les bases de données fuient. Si les mots de passe y sont en clair, tous les comptes (et ceux des autres sites où les gens réutilisent le même mot de passe) tombent.

### Le problème résolu
Même en cas de fuite, retrouver les mots de passe doit être extrêmement long.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
M[Mot de passe] --> H[argon2 + sel]
  H --> E[Empreinte stockée]
  C[Saisie] --> H2[argon2 + même sel]
  H2 --> CMP{Égal ?}
```

### Exemple concret
```js
import bcrypt from "bcrypt";
const empreinte = await bcrypt.hash("MonMotDePasse!", 12);
// $2b$12$Q9h0…  (algorithme, coût, sel et empreinte dans une seule chaîne)
const ok = await bcrypt.compare("MonMotDePasse!", empreinte);   // true
```
```python
from argon2 import PasswordHasher
ph = PasswordHasher()
h = ph.hash("MonMotDePasse!")
ph.verify(h, "MonMotDePasse!")
```

### Cas d'utilisation
- Inscription et connexion
- Réinitialisation de mot de passe
- Comprendre pourquoi un site ne peut pas te « renvoyer » ton mot de passe

> [!warning] À ne pas confondre
> Un message « mot de passe incorrect » et « utilisateur inconnu » différents permettent de deviner qui a un compte : réponds pareil dans les deux cas.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine le trajet d'un mot de passe à l'inscription puis à la connexion : sel, fonction de hachage, empreinte stockée, comparaison.

> [!example] ⚖️ Avant / après
> Avant / après : une base qui stocke les mots de passe en clair, puis hachés. Dessine ce que voit un pirate qui la vole.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Hachage de mot de passe » et je l'intègre ici avec `![[Schéma - Hachage de mot de passe.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Prérequis** : [[Authentification]]
- **Complémentaires** : [[Session et cookie]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
