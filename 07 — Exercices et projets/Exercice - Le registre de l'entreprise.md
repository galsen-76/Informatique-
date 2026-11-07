---
type: exercise
status: a-faire
difficulty: facile
concepts:
  - "[[Nexus]]"
tags:
  - exercice
---
# Exercice — Le registre de l'entreprise

> [!info] Avant de commencer
> **Notion travaillée :** [[Nexus]]
> **À voir avant :** [[Registre Docker]]
> **Objectif :** Comprendre le rôle d'un dépôt d'artefacts comme Nexus : miroir des registres publics et stockage des images internes.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 💬 Expliquer
Ton entreprise bloque Docker Hub, mais `docker pull nexus.entreprise.fr/docker-hub/python:3.12-slim` marche. Explique ce que fait Nexus dans ce cas.
- [ ] Fait
### 2. 🔮 Prédire
Deux collègues téléchargent la même image via Nexus, l'un après l'autre. Prédis lequel attend le plus longtemps, et pourquoi.
- [ ] Fait
### 3. 🧩 Résoudre
Ton Dockerfile commence par `FROM python:3.12-slim` et le build échoue en entreprise (délai dépassé). Sans changer d'image, réécris la ligne pour passer par Nexus.
- [ ] Fait
### 4. 🔮 Prédire
Tu pousses ta propre image dans Nexus sans t'être connecté. Prédis l'erreur, puis dis ce qu'il faut faire avant.
- [ ] Fait
### 5. 💬 Expliquer
Nexus ne sert pas qu'aux images Docker. Cite deux autres types de paquets qu'il peut stocker ou relayer.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Nexus joue deux rôles : **miroir** (il récupère une fois une image publique et la garde en cache) et **registre privé** (il stocke les images de l'équipe, avec un accès contrôlé).

> [!question]- Solution et raisonnement
> - Nexus sert d'intermédiaire autorisé : il télécharge l'image depuis Docker Hub pour toi et te la donne.
> - Le premier attend : Nexus la récupère à l'extérieur. Le second l'obtient directement depuis le cache.
> - `FROM nexus.entreprise.fr/docker-hub/python:3.12-slim` (le chemin exact dépend de la configuration de Nexus).
> - `unauthorized` / `authentication required` : il faut `docker login nexus.entreprise.fr` avant.
> - Paquets Python (PyPI), npm, Maven… Nexus peut faire miroir et dépôt privé pour chacun.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
