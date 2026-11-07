---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Python dans Docker]]"
tags:
  - exercice
---
# Exercice — Ton script Python dans une boîte

> [!info] Avant de commencer
> **Notion travaillée :** [[Python dans Docker]]
> **À voir avant :** [[Dockerfile]] · [[Volume Docker]]
> **Objectif :** Comprendre ce qu'il faut pour qu'un script Python tourne dans un conteneur : l'image de base, les dépendances, le code et les fichiers d'entrée et de sortie.

> [!tip] Comment faire cet exercice
> Les consignes donnent un **but**, pas la commande. Quand on te demande de **prédire**, écris ta réponse *avant* de lancer quoi que ce soit : c'est l'écart entre ta prédiction et le résultat qui fait comprendre. Tu peux chercher dans la fiche de la notion, pas dans la solution.

## Étapes
### 1. 🔮 Prédire
Ton script `bonjour.py` affiche un message. Tu écris un Dockerfile `FROM python:3.12-slim` + `CMD ["python", "bonjour.py"]`, **sans** `COPY`. Prédis l'erreur au lancement.
- [ ] Fait
### 2. 🔧 Réparer
Corrige le Dockerfile pour que ça marche, et vérifie.
- [ ] Fait
### 3. 🔮 Prédire
Ton script utilise la bibliothèque `requests`. Tu ne l'installes pas dans l'image. Prédis l'erreur, et pourquoi il ne voit pas celle que tu as peut-être sur ta machine.
- [ ] Fait
### 4. 🧩 Résoudre
Fais en sorte que les dépendances listées dans `requirements.txt` soient installées dans l'image, avec un ordre d'instructions qui garde le cache efficace.
- [ ] Fait
### 5. 🧩 Résoudre
Ton script lit des fichiers d'un dossier et écrit un résultat. Fais-le tourner dans le conteneur sur un dossier **de ta machine**, et récupère le résultat chez toi.
- [ ] Fait

> [!question]- Indice (l'idée, pas la réponse)
> Le conteneur ne voit **rien** de ta machine : ni ton script, ni tes bibliothèques, ni tes fichiers. Le code entre par `COPY`, les dépendances par `RUN pip install`, les données par un volume.

> [!question]- Solution et raisonnement
> - `can't open file '/bonjour.py'` (ou le dossier de travail) : le fichier n'est pas dans l'image.
> - Ajouter `WORKDIR /app` puis `COPY bonjour.py .`.
> - `ModuleNotFoundError: No module named 'requests'` : l'image a son propre Python, sans tes bibliothèques.
> - `COPY requirements.txt .` → `RUN pip install --no-cache-dir -r requirements.txt` → `COPY . .`.
> - `docker run --rm -v "$PWD/donnees":/data monimage python script.py /data`, avec le script qui écrit dans `/data`.

## Validation
- [ ] Mes prédictions : justes, ou je sais maintenant pourquoi elles étaient fausses
- [ ] Je sais expliquer la notion à quelqu'un, sans la fiche
