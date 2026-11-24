---
type: concept
domain: python
module: "[[Module 16 - Python]]"
status: a-decouvrir
level: debutant
niveau: 1
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[HTTP]]"
  - "[[Exception]]"
  - "[[Binaire et octet]]"
parents: []
related:
  - "[[Appeler une API HTTP (requests)]]"
  - "[[Envoyer et recevoir un fichier en HTTP]]"
  - "[[Proxy]]"
next_review: 
tags:
  - concept
  - python
  - http
---
# Appeler une API sans pip (urllib.request)

> [!warning] Fiche fusionnée le 19/11/2026
> Un concept = une fiche, quel que soit le langage ou le framework : voir [[Appeler une API HTTP]].

> [!info] En une phrase
> `urllib.request` fait des requêtes HTTP avec la bibliothèque standard de Python : rien à installer, donc utilisable même quand pip est bloqué par le proxy de l'entreprise.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
On prépare une requête avec `urllib.request.Request(url, data=..., headers=..., method=...)`, puis on l'envoie avec `urllib.request.urlopen(requete, timeout=...)`. La réponse se lit comme un fichier binaire : `.read()` donne des **octets**.

### Pourquoi ça existe
C'est l'outil HTTP livré avec Python depuis toujours. `requests` a été écrit par-dessus pour être plus agréable, mais il faut l'installer.

### Le problème résolu
Au travail, `pip install requests` passe par Internet et le proxy le bloque (tant que tu n'as pas le PyPI du [[Nexus]]). Avec `urllib.request`, ton script ou ta fonction tourne sans aucune dépendance.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  P[Request] --> U[urlopen]
  U --> R[read en octets]
  U -->|4xx 5xx| E[HTTPError]
```
| Avec requests | Avec urllib.request |
| --- | --- |
| `requests.get(url)` | `urlopen(url)` |
| `r.status_code` | `r.status` |
| `r.content` | `r.read()` |
| `r.json()` | `json.loads(r.read())` |
| `json={...}` | `data=json.dumps(d).encode()` + `Content-Type: application/json` |
| `files={...}` (multipart) | pas d'outil prévu : à fabriquer à la main, on préfère un corps brut |
| 404 = réponse normale | 404 = **exception** `HTTPError` |

### Exemple concret
```python
import json
import urllib.error
import urllib.request

with open("rapport.zip", "rb") as f:
    octets = f.read()

requete = urllib.request.Request(
    "http://localhost:8000/brut",
    data=octets,                                  # des bytes, jamais un str
    headers={"Content-Type": "application/zip"},
    method="POST",
)
try:
    with urllib.request.urlopen(requete, timeout=30) as reponse:
        print(reponse.status, reponse.headers["Content-Type"])
        resultat = json.loads(reponse.read())
except urllib.error.HTTPError as e:              # le serveur a répondu 4xx ou 5xx
    print("Refusé :", e.code, e.read().decode("utf-8"))
except urllib.error.URLError as e:               # pas de réponse du tout
    print("Serveur injoignable :", e.reason)
```

### Cas d'utilisation
- Un appel rapide quand pip n'est pas disponible
- Comprendre ce que `requests` fait pour toi

> [!warning] À ne pas confondre
> - Avec `data=` et sans `Content-Type`, urllib met **tout seul** `application/x-www-form-urlencoded` (le type d'un formulaire texte). Pour un zip ou une image, donne toujours le bon type.
> - `data` doit être des `bytes` : un `str` donne `TypeError`. Pour du JSON : `json.dumps(d).encode("utf-8")`.
> - Une erreur 4xx ou 5xx **lève une exception**, contrairement à requests. Le message du serveur est dans `e.read()`.
> - urllib suit les variables `HTTP_PROXY` / `HTTPS_PROXY`, comme requests. Si elles sont définies, ajoute `NO_PROXY=localhost,127.0.0.1` pour que tes appels locaux ne partent pas vers le [[Proxy]].

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] ⚖️ Avant / après
> Avant / après : le même appel à ton API avec requests, puis avec urllib.request. Dessine les étapes en plus que tu fais toi-même.

> [!example] 🔄 Change de contexte
> Redessine-le dans un conteneur où pip est bloqué par le proxy. Pourquoi urllib passe-t-il quand même ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Appeler une API sans pip (urllib.request) » et je l'intègre ici avec `![[Schéma - Appeler une API sans pip (urllib.request).excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[Envoi 03 - Le même envoi sans pip]]

## 4 · Relier
- **Au travail** : [Appeler une API sans pip (urllib.request) au travail](obsidian://open?vault=Travail&file=Appeler%20une%20API%20sans%20pip%20%28urllib.request%29%20au%20travail)
- **Prérequis** : [[HTTP]] · [[Exception]] · [[Binaire et octet]]
- **Complémentaires** : [[Appeler une API HTTP (requests)]] · [[Envoyer et recevoir un fichier en HTTP]] · [[Proxy]]
- **Utilisé par** : [[Cours - Envoyer et recevoir des fichiers par HTTP]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
