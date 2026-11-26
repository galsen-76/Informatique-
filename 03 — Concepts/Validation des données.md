---
type: concept
module: "[[Module 08 - Backend et API REST]]"
related:
  - "[[Code de statut HTTP]]"
  - "[[Injection SQL]]"
tags:
  - concept
  - backend
---
# Validation des données

> [!info] En une phrase
> Vérifier que les données reçues (corps, paramètres, fichiers) ont la bonne forme et des valeurs acceptables avant de les utiliser, et répondre 400 sinon.

## 1 · Comprendre
### Définition
**Règle d'or : ne jamais faire confiance à ce qui vient de l'extérieur** (client, formulaire, fichier, autre API). La validation du navigateur (`required`) ou les types [[TypeScript]] ne protègent pas : n'importe qui peut envoyer une requête avec curl.
On vérifie :
- la **présence** et le **type** des champs (`nom` est une chaîne non vide) ;
- les **valeurs** (longueur, plage, liste autorisée, format d'e-mail) ;
- l'**absence** de champs inattendus.
On utilise une bibliothèque de **schéma** : **Zod** (TypeScript), **Joi**, **Pydantic** (Python).

### Pourquoi ça existe
Des données inattendues provoquent des plantages, des données corrompues en base, et des failles (injection).

### Le problème résolu
Refuser tôt, avec un message clair, plutôt que d'échouer plus loin de façon incompréhensible.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
R[Requête] --> V{Schéma ok ?}
  V -->|non| E[400 + détails]
  V -->|oui| T[Traitement]
```

### Exemple concret
```js
import { z } from "zod";
const NouvelleTache = z.object({
  nom: z.string().min(1).max(100),
  priorite: z.enum(["basse", "normale", "haute"]).default("normale"),
  echeance: z.string().date().optional(),
});
app.post("/taches", (req, res) => {
  const r = NouvelleTache.safeParse(req.body);
  if (!r.success) return res.status(400).json({ erreurs: r.error.issues });
  const tache = r.data;           // propre et typé
  // …
  res.status(201).json(tache);
});
```
En Python, Pydantic fait la même chose (et FastAPI l'utilise automatiquement).

### Cas d'utilisation
- Toute route qui reçoit un corps
- Les paramètres de requête (`?page=abc`)
- La lecture d'un fichier de configuration

> [!warning] À ne pas confondre
> **Valider** (refuser ce qui ne va pas) et **assainir / échapper** (rendre une valeur sûre pour un contexte, comme le HTML ou le SQL). Les deux sont nécessaires.

## 3 · Relier
- **Prérequis** : [[JSON]] · [[Endpoint]]
- **Complémentaires** : [[Code de statut HTTP]] · [[Injection SQL]]
- **Outil** : [[Fiche - Zod, valider les données en TypeScript]]
