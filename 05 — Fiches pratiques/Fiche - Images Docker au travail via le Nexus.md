---
type: howto
concepts:
  - "[[Nexus]]"
  - "[[Registre Docker]]"
  - "[[Image Docker]]"
tags:
  - fiche-pratique
  - docker
  - assystem
---
# Fiche - Images Docker au travail via le Nexus

> [!info] Objectif
> Construire et lancer des images Docker sur le réseau de l'entreprise, où Docker Hub est bloqué.

> [!warning] Pourquoi c'est obligatoire au travail
> Sur le réseau de l'entreprise, tout passe par un proxy qui bloque Docker Hub. Le symptôme :
> `failed to fetch anonymous token ... Proxy authentication required`
> Les images doivent passer par le **Nexus** de l'entreprise, qui les télécharge pour toi et en garde une copie.

## Le registre de l'entreprise
| Élément | Valeur |
| --- | --- |
| Adresse | `vortex-nexus.assystem.com` |
| Port du registre Docker | **5000** (trouvé le 2026-11-07, il répond `401` sur `/v2/`, ce qui est normal pour un registre) |

## Étapes
1. Dans **chaque Dockerfile**, préfixer l'image de base avec l'adresse du Nexus :
   ```dockerfile
   # au lieu de : FROM python:3.12-slim
   FROM vortex-nexus.assystem.com:5000/library/python:3.12-slim
   ```
   `python:3.12-slim` est un raccourci pour `docker.io/library/python:3.12-slim`. On remplace seulement `docker.io` par le Nexus.
2. Faire pareil pour les `image:` des fichiers compose :
   ```yaml
   image: vortex-nexus.assystem.com:5000/library/nginx:1.27-alpine
   ```
3. Si le build répond `unauthorized` : se connecter une fois avec ses identifiants Nexus, à demander à l'équipe :
   ```bash
   docker login vortex-nexus.assystem.com:5000
   ```
4. Si le build répond `not found` ou `manifest unknown` : essayer sans `library/`.

> [!success] Vérifier que ça marche
> `docker build -t script-py:1.0 .` télécharge l'image de base sans erreur de proxy.

## Si rien ne répond
Tester un port depuis **PowerShell** : Docker Desktop se connecte depuis Windows, pas depuis WSL.
```powershell
Test-NetConnection vortex-nexus.assystem.com -Port 5000
```
`TcpTestSucceeded : True` : le port répond. Sinon, vérifier le VPN en télétravail.

| Erreur | Cause |
| --- | --- |
| `Proxy authentication required` | l'image est demandée à Docker Hub : il manque le préfixe Nexus |
| `no such host` | adresse mal écrite |
| `connectex ... n'a pas répondu` | mauvais port, ou pas sur le réseau de l'entreprise |

## À compléter
- [ ] `pip install` dans le Dockerfile : il ira aussi sur Internet (PyPI) et risque d'être bloqué. Demander l'adresse du **proxy PyPI du Nexus**.
- [ ] Après l'étape 02 du fil rouge : remplacer l'adresse écrite en dur par une [[Variable de build Docker (ARG)]], pour qu'un seul Dockerfile marche au travail, chez moi et dans la CI.

## Liens
- [[Nexus]] · [[Registre Docker]] · [[Image Docker]] · [[docker login]] · [[Projet fil rouge - Rapport de dossier]]
