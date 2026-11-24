---
type: concept
module: "[[Module 16 - Python]]"
related:
  - "[[Encodage des caractères]]"
  - "[[Envoyer et recevoir un fichier en HTTP]]"
tags:
  - concept
  - python
---
# Base64

> [!info] En une phrase
> Base64 transforme n'importe quels octets (une image, un zip) en texte simple, pour pouvoir les mettre là où seul du texte est accepté, comme dans du JSON.

## 1 · Comprendre
### Définition
Base64 réécrit les octets avec seulement 64 caractères sans danger : `A-Z`, `a-z`, `0-9`, `+` et `/` (plus `=` pour compléter la fin). Ce n'est **ni** une compression **ni** un chiffrement : n'importe qui peut décoder, et le résultat est environ **un tiers plus gros**.

### Pourquoi ça existe
JSON, YAML, une URL ou un e-mail ne transportent que du texte. Des octets d'image au milieu casseraient le format.

### Le problème résolu
Envoyer une image **avec** d'autres informations dans un seul JSON : `{"image": "iVBORw0KGgo...", "seuil": 0.5}`. C'est courant pour les API de reconnaissance d'images : l'image part en base64 dans le corps JSON.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  O[Octets] -->|b64encode| T[Texte]
  T -->|JSON| R[Réseau]
  R -->|b64decode| O2[Octets]
```

### Exemple concret
```python
import base64
import json

with open("plan.png", "rb") as f:
    octets = f.read()

texte = base64.b64encode(octets).decode("ascii")   # bytes → bytes base64 → str
corps = json.dumps({"image": texte})                # maintenant, JSON l'accepte

# De l'autre côté
recu = json.loads(corps)
octets_retrouves = base64.b64decode(recu["image"])
print(octets_retrouves == octets)                   # True
```

### Cas d'utilisation
- Afficher une image directement dans une page : `<img src="data:image/png;base64,...">`
- Écrire un fichier dans une variable de CI ou un secret Kubernetes

> [!warning] À ne pas confondre
> - `base64.b64encode()` renvoie des **bytes** (`b"iVBOR..."`), pas un `str`. `json.dumps` les refuse : `TypeError: Object of type bytes is not JSON serializable`. Il faut `.decode("ascii")`.
> - Base64 ne cache rien : ce n'est pas une protection (une authentification « Basic » ([[Authentification]]) en base64 se lit en une commande).
> - Quand on peut envoyer le fichier tel quel (corps brut ou multipart), c'est plus léger que base64.

## 3 · Relier
- **Au travail** : [Base64 au travail](obsidian://open?vault=Travail&file=Base64%20au%20travail)
- **Prérequis** : [[Binaire et octet]] · [[JSON]]
- **Complémentaires** : [[Encodage des caractères]] · [[Envoyer et recevoir un fichier en HTTP]] · [[Fichier en mémoire (io.BytesIO)]]
- **Utilisé par** : [[Cours - Envoyer et recevoir des fichiers par HTTP]] · [[Serverless et FaaS]]
