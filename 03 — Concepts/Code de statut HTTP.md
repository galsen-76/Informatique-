---
type: concept
domain: backend
module: "[[Module 08 - Backend et API REST]]"
status: a-decouvrir
level: debutant
niveau: 1
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[HTTP]]"
parents:
  - "[[HTTP]]"
related:
  - "[[Méthode HTTP]]"
  - "[[Gestion des erreurs d'une API]]"
next_review: 
method: []
tags:
  - concept
  - backend
---
# Code de statut HTTP

> [!info] En une phrase
> Le nombre à trois chiffres en tête d'une réponse HTTP dit comment ça s'est passé : 2xx succès, 3xx redirection, 4xx erreur du client, 5xx erreur du serveur.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
| Code | Sens | Quand |
| --- | --- | --- |
| **200** OK | succès | GET, PATCH réussis |
| **201** Created | ressource créée | POST réussi |
| **204** No Content | succès, rien à renvoyer | DELETE réussi |
| **301 / 302** | redirection | l'adresse a changé (`Location`) |
| **304** Not Modified | utilise ton cache | |
| **400** Bad Request | requête mal formée ou invalide | JSON cassé, champ manquant |
| **401** Unauthorized | pas (ou mal) authentifié | jeton absent ou expiré |
| **403** Forbidden | authentifié mais pas autorisé | pas le bon rôle |
| **404** Not Found | ressource ou route inconnue | |
| **409** Conflict | conflit avec l'état actuel | doublon |
| **422** Unprocessable | données valides en JSON mais refusées | validation |
| **429** Too Many Requests | trop d'appels | limite de débit |
| **500** Internal Server Error | bug côté serveur | exception non gérée |
| **502 / 503 / 504** | passerelle / indisponible / délai | le [[Reverse proxy]] n'atteint pas l'application |

### Pourquoi ça existe
Le client doit savoir, sans lire le texte, si la requête a marché et qui est en tort.

### Le problème résolu
Réagir automatiquement : réessayer un 503, se reconnecter après un 401, afficher l'erreur d'un 400.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
R[Réponse] --> C{Code}
  C -->|2xx| S[Succès]
  C -->|4xx| Cl[Corrige ta requête]
  C -->|5xx| Se[Problème serveur]
```

### Exemple concret
```bash
curl -i https://api.github.com/repos/inexistant/inexistant
# HTTP/2 404
curl -s -o /dev/null -w "%{http_code}\n" https://example.com
# 200
```
En Python : `rep.raise_for_status()` lève une exception pour 4xx et 5xx. En JS : tester `rep.ok`.

### Cas d'utilisation
- Déboguer une API (onglet Réseau, `curl -i`)
- Écrire des réponses correctes dans Express
- Comprendre une 502 derrière Traefik

> [!warning] À ne pas confondre
> **401** (qui es-tu ? connecte-toi) et **403** (je sais qui tu es, mais c'est non). Et **502** (le proxy n'a pas eu de réponse valide de l'application) n'est pas **500** (l'application a planté en répondant).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine cinq tiroirs 1xx à 5xx et range dedans 200, 201, 204, 400, 404, 422, 500 avec un exemple tiré de ton application.

> [!example] 🔍 Trouve l'erreur
> Ce schéma est faux. Corrige-le en rouge et explique l'erreur.
>
> ```mermaid
> flowchart TD
>   D[Dépense absente] --> R[200 avec null]
>   M[Montant négatif] --> S[500]
> ```

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Code de statut HTTP » et je l'intègre ici avec `![[Schéma - Code de statut HTTP.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses 01 - Prendre l'API en main]]

## 4 · Relier
- **Prérequis** : [[HTTP]]
- **Complémentaires** : [[Méthode HTTP]] · [[Gestion des erreurs d'une API]]

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
