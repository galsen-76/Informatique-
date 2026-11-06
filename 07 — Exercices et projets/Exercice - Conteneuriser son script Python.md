---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Dockerfile]]"
  - "[[Python dans Docker]]"
  - "[[Volume Docker]]"
tags:
  - exercice
---
# Exercice — Conteneuriser son script Python

> [!info] Objectif
> Faire tourner ton script de zip dans un conteneur, sur des fichiers de ta machine.
> Notions : [[Dockerfile]] · [[Python dans Docker]] · [[Volume Docker]]

## Consignes
- [ ] Écris le Dockerfile de ton script (`python:3.12-slim`, `requirements.txt` d'abord, puis le script, `ENTRYPOINT`)
- [ ] Ajoute un `.dockerignore` (`.venv`, `__pycache__`, `.git`, données de test)
- [ ] Construis l'image, puis reconstruis après avoir modifié une ligne du script : quelles couches viennent du cache ?
- [ ] Lance-la sur un dossier monté avec `-v`, et récupère l'archive sur ta machine
- [ ] Fais-la échouer (dossier inexistant) et vérifie le code de sortie du conteneur
- [ ] Passe une variable avec `-e` et lis-la dans le script

> [!question]- Indice
> Dans le conteneur, les chemins sont ceux du montage (`/data`), jamais `C:\\...`. Avec `ENTRYPOINT`, tout ce qui suit le nom de l'image devient argument du script.

> [!question]- Solution
> ```dockerfile
> FROM python:3.12-slim
> ENV PYTHONUNBUFFERED=1
> WORKDIR /app
> COPY requirements.txt .
> RUN pip install --no-cache-dir -r requirements.txt
> COPY zipper.py .
> ENTRYPOINT ["python", "zipper.py"]
> ```
> ```bash
> docker build -t mon-zipper .
> docker run --rm -v "$PWD/donnees:/data" -e NIVEAU_LOG=debug mon-zipper /data --sortie /data/export.zip
> docker run --rm mon-zipper /nexistepas ; echo $?   # 1
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
