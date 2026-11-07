---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Permissions Linux]]"
tags:
  - exercice
---
# Exercice — Qui a le droit de quoi

> [!info] Avant de commencer
> **Notion travaillée :** [[Permissions Linux]]
> **À voir avant :** [[Bash]]
> **Objectif :** Savoir lire des permissions, prédire si une action sera autorisée, et choisir la bonne correction.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 💬 Expliquer
Lis cette ligne et dis qui peut lire, écrire et exécuter : `-rwxr-x--- 1 oumar devs 310 nov. 7 deploy.sh`
- [ ] Fait
### 2. 🔮 Prédire
Tu crées un script avec un éditeur, puis tu essaies de le lancer avec `./`. Prédis le résultat, et pourquoi.
- [ ] Fait
### 3. 🧪 Vérifier
Essaie, regarde ses permissions, puis corrige **sans** `sudo`.
- [ ] Fait
### 4. 🔮 Prédire
Tu retires le droit d'écriture sur un **dossier** à toi, puis tu essaies de créer un fichier dedans, puis de modifier un fichier qui y existe déjà. Prédis les deux résultats.
- [ ] Fait
### 5. 🧪 Vérifier
Teste, puis remets les droits.
- [ ] Fait
### 6. 🔧 Réparer
Un collègue lance `sudo python script.py` « parce que ça marchait pas ». Maintenant, il ne peut plus modifier les fichiers que le script a créés. Explique pourquoi, comment le constater, et comment le réparer.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Trois groupes (propriétaire, groupe, autres) × trois droits (`r`, `w`, `x`). Sur un dossier, `w` = créer ou supprimer des fichiers **dedans**, `x` = pouvoir y entrer.

> [!question]- Solution et raisonnement
> - `oumar` : lire, écrire, exécuter. Groupe `devs` : lire et exécuter. Les autres : rien.
> - `Permission denied` : un nouveau fichier n'a pas le droit `x`. Correction : `chmod +x script.sh` (tu es le propriétaire).
> - Dossier sans `w` : impossible de **créer** un fichier ; mais modifier un fichier existant reste possible si **le fichier** a `w` (ce sont les droits du fichier qui comptent).
> - Les fichiers créés par `sudo` appartiennent à `root` (`ls -l` le montre). Réparer : `sudo chown -R $USER:$USER dossier`, puis ne plus utiliser `sudo` pour ses propres scripts.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
