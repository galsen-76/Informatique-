---
type: concept
domain: reseau
module: "[[Module 01 - Fondamentaux informatiques]]"
status: a-decouvrir
level: debutant
niveau: 1
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Variable d'environnement]]"
  - "[[HTTP]]"
parents: []
related:
  - "[[Reverse proxy]]"
  - "[[Certificat]]"
next_review: 
tags:
  - concept
  - reseau
---
# Proxy

> [!info] En une phrase
> Un serveur placé **entre les postes de l'entreprise et Internet**, qui fait les requêtes **à leur place** et peut les filtrer, les journaliser et les mettre en cache.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **proxy** (on dit aussi proxy *sortant* ou *forward proxy*) est un **programme qui tourne sur un serveur** : Squid, ou un service en ligne comme Zscaler. Ton poste ne parle pas directement au site : il envoie sa requête au proxy, et c'est **le proxy qui va chercher la page** sur Internet, puis te la renvoie. Pour le site, c'est le proxy qui l'a appelé, pas toi.

Au passage, le proxy peut :
| Rôle | Exemple |
| --- | --- |
| **Filtrer** | bloquer Docker Hub, les réseaux sociaux, les sites dangereux |
| **Journaliser** | garder la trace de qui a appelé quel site, et quand |
| **Mettre en cache** | garder une copie d'un fichier souvent téléchargé |
| **Authentifier** | exiger ton identité : sinon, erreur `407 Proxy Authentication Required` |

### Comment le poste sait qu'il doit passer par lui
| Méthode | Comment ça marche |
| --- | --- |
| **Réglage manuel** | l'adresse est écrite dans Windows, ou dans `HTTP_PROXY` / `HTTPS_PROXY` pour les outils en ligne de commande |
| **Fichier PAC** | un petit script (souvent `proxy.pac`) que Windows et le navigateur téléchargent ; il dit, pour chaque adresse, quel proxy utiliser ou s'il faut y aller directement |
| **Transparent** | rien n'est réglé sur le poste : le réseau détourne lui-même le trafic vers le proxy |
| **Agent** | un logiciel installé sur le poste (ex. Zscaler Client Connector) envoie le trafic au proxy |

Pour les outils en ligne de commande (pip, curl, apt), on utilise ces variables :
| Variable | Rôle |
| --- | --- |
| `HTTP_PROXY` / `HTTPS_PROXY` | adresse du proxy, ex. `http://proxy.entreprise:3128` |
| `NO_PROXY` | adresses à joindre **sans** proxy (internes) : `localhost,127.0.0.1,.entreprise.local` |

> [!tip] Le navigateur et le terminal ne lisent pas le même réglage
> Le navigateur suit le réglage de Windows (souvent le fichier PAC). pip, curl ou Docker ne lisent pas le PAC : ils ne connaissent que leurs variables ou leur propre réglage. C'est pour ça qu'un site s'ouvre dans le navigateur alors que `pip install` échoue.

### Pourquoi ça existe
L'entreprise veut un **point de passage unique** vers Internet, pour contrôler ce qui sort et ce qui entre.

### Le problème résolu
Sans lui, chaque machine sortirait librement sur Internet, sans filtre ni trace.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  P[Ton poste] --> X[Proxy]
  X -- autorisé --> I[Internet]
  X -- bloqué --> B[Refus]
  P --> N[Miroir interne]
```

### Exemple concret
```bash
export HTTPS_PROXY=http://proxy.entreprise:3128
export NO_PROXY=localhost,127.0.0.1,registre.interne.exemple.com
pip install requests        # pip passe par le proxy
curl -I https://registre.interne.exemple.com:5000/v2/   # interne : sans proxy grâce à NO_PROXY
```
Pour Docker, il y a **trois endroits** différents :
1. le [[Démon Docker]] (pour `docker pull`) : réglage du démon ou de Docker Desktop ;
2. le **build** : `docker build --build-arg HTTPS_PROXY=...` (pour les `RUN pip install`) ;
3. le **conteneur** : `docker run -e HTTPS_PROXY=...`.

Symptômes typiques :
- `407 Proxy Authentication Required` : le proxy veut savoir qui tu es (c'est ce que Docker Hub t'a répondu au travail) ;
- délai dépassé (*timeout*) ou `Could not resolve host` : l'outil ne connaît pas le proxy et essaie de sortir seul ;
- erreur de certificat SSL : le proxy **inspecte le HTTPS** (Zscaler le fait) et présente son propre [[Certificat]], que l'outil ne connaît pas.

### Cas d'utilisation
- pip, apt, npm ou Docker qui doivent télécharger depuis Internet en entreprise

> [!warning] À ne pas confondre
> - **Proxy** (côté clients, vers Internet) et [[Reverse proxy]] (côté serveurs, reçoit les visiteurs et les envoie au bon service).
> - Un proxy **n'est pas une API**. Une API, c'est un programme qui **offre un service** (des données, une action) et décide de la réponse. Le proxy, lui, ne produit rien : il **fait passer** des requêtes destinées à d'autres, en les contrôlant au passage.
> - Oublier `NO_PROXY` fait passer les adresses internes par le proxy, qui les refuse ou ne les connaît pas.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine le trajet de `pip install requests` sur un réseau qui passe par un proxy : ton PC, le proxy, PyPI. Marque où la requête peut être bloquée.

> [!example] 🔄 Change de contexte
> Tu as dessiné le proxy pour pip. Redessine-le pour un `docker pull`, puis pour un job de CI. Qu'est-ce qui change ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Proxy » et je l'intègre ici avec `![[Schéma - Proxy.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : elle sera pratiquée dans le fil rouge de son niveau (voir [[Niveaux]]).

## 4 · Relier
- **Au travail** : [[Proxy au travail]]
- **Prérequis** : [[Variable d'environnement]] · [[HTTP]]
- **Complémentaires** : [[Port]] · [[Certificat]] · [[Reverse proxy]]
- **Utilisé par** : [[Gestionnaire de paquets]] · [[Démon Docker]]
- **Même idée en code** : [[Patron Proxy]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
