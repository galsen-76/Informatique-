---
type: exercise
status: a-faire
difficulty: moyen
concepts:
  - "[[Artefacts GitLab CI]]"
  - "[[extends GitLab CI]]"
tags:
  - exercice
---
# Exercice — Artefacts et extends

> [!info] Objectif
> Passer des fichiers d'un job à l'autre et factoriser la configuration.
> Notions : [[Artefacts GitLab CI]] · [[extends GitLab CI]]

## Consignes
- [ ] Écris un job qui lance ton script de zip dans `python:3.12-slim` et garde l'archive en artefact une semaine
- [ ] Écris un second job qui liste le contenu de l'archive (`python -m zipfile -l`)
- [ ] Garde le rapport pytest (`--junitxml`) en artefact de type `junit` et regarde l'onglet *Tests* de la pipeline
- [ ] Crée un job caché `.python` (image, `before_script`) et fais-en hériter deux jobs avec `extends`
- [ ] Redéfinis `script:` dans un des jobs et vérifie dans *Full configuration* qu'il a remplacé celui du modèle

> [!question]- Indice
> `artifacts: paths:`, `expire_in:`, `reports: junit:`. Les listes (`script`) sont remplacées par `extends`, pas fusionnées.

> [!question]- Solution
> ```yaml
> .python:
>   image: python:3.12-slim
>   before_script:
>     - pip install -r requirements.txt
>
> zipper:
>   extends: .python
>   stage: build
>   script: python zipper.py donnees --sortie export.zip
>   artifacts:
>     paths: [export.zip]
>     expire_in: 1 week
>
> tests:
>   extends: .python
>   stage: test
>   script: pytest --junitxml=rapport.xml
>   artifacts:
>     when: always
>     reports:
>       junit: rapport.xml
>
> verifier:
>   stage: test
>   image: python:3.12-slim
>   needs: [zipper]
>   script: python -m zipfile -l export.zip
> ```

## Validation
- [ ] Je refais l'exercice de mémoire, sans regarder la solution
- [ ] Je sais expliquer chaque étape
