---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[pip]]"
  - "[[HTTP]]"
  - "[[JSON]]"
parents: []
related:
  - "[[SDK]]"
  - "[[API REST]]"
next_review: 
method: []
tags:
  - concept
  - python
---
# Appeler une API HTTP (requests)

> [!info] En une phrase
> requests envoie des requêtes HTTP depuis Python (GET, POST…) et récupère la réponse, souvent en JSON.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
`requests` est le paquet externe le plus utilisé de Python. `requests.get(url)` envoie une requête et renvoie un objet réponse : `.status_code` (200, 404…), `.json()` (le corps décodé en dictionnaire), `.text`, `.headers`.

### Pourquoi ça existe
Énormément de scripts parlent à des services web : API d'un outil (CVAT, GitLab), météo, service interne.

### Le problème résolu
La bibliothèque standard (`urllib`) est verbeuse ; `requests` rend un appel lisible en une ligne.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  S[Script] --> R[requests.get]
  R --> A[API]
  A --> J[JSON]
```

### Exemple concret
```python
import requests

r = requests.get("https://api.github.com/repos/python/cpython", timeout=10)
r.raise_for_status()                  # exception si 4xx ou 5xx
depot = r.json()                      # dictionnaire
print(depot["stargazers_count"])

r = requests.post("https://httpbin.org/post",
                  json={"nom": "Oumar"},                    # corps JSON
                  headers={"Authorization": "Bearer XXX"},  # en-tête
                  timeout=10)
print(r.status_code, r.json()["json"])
```
| Élément | Rôle |
| --- | --- |
| `params={"page": 2}` | ajoute `?page=2` à l'URL |
| `json=...` | envoie un corps JSON |
| `headers=...` | en-têtes (authentification) |
| `auth=("user", "mdp")` | authentification simple |
| `timeout=10` | n'attend pas indéfiniment |
| `files={"fichier": (nom, octets, type)}` | envoie un fichier en formulaire multipart (voir [[Envoyer et recevoir un fichier en HTTP]]) |

### Cas d'utilisation
- Récupérer les annotations d'une tâche CVAT (voir aussi [[SDK]])
- Automatiser GitLab via son API
- Vérifier qu'un service répond (code 200)

> [!warning] À ne pas confondre
> Un code 404 ou 500 **ne lève pas** d'exception tout seul : appelle `raise_for_status()` ou teste `status_code`. Et ne mets jamais un jeton en dur dans le code : lis-le dans une [[Variable d'environnement]].

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine `requests.get(url, params=…)` puis `requests.post(url, json=…)` : où vont les données dans chaque requête (adresse ou corps) ?

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   G[GET labels] --> P[json job_id]
>   P --> C[Corps envoyé]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Appeler une API HTTP (requests) » et je l'intègre ici avec `![[Schéma - Appeler une API HTTP (requests).excalidraw]]`._

### Appliquer dans le fil rouge
- [[Réannoter 02 - Envoyer le premier tuyau]]
- [[Réannoter 03 - Chercher les ids des labels]]

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[pip]] · [[HTTP]] · [[JSON]] · [[Liste et dictionnaire]]
- **Complémentaires** : [[SDK]] · [[API REST]] · [[Envoyer et recevoir un fichier en HTTP]] (envoyer un zip ou une image) · [[Appeler une API sans pip (urllib.request)]] (quand pip est bloqué)

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
