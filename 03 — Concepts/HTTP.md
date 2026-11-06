---
type: concept
domain: web
module: "[[Module 01 - Fondamentaux informatiques]]"
status: a-decouvrir
level: debutant
prerequisites:
  - "[[Client-serveur]]"
parents:
  - "[[Internet]]"
related:
  - "[[JSON]]"
  - "[[API]]"
  - "[[API REST]]"
next_review: 
method: []
tags:
  - concept
  - web
---
# HTTP

> [!info] En une phrase
> Le protocole (les règles de conversation) qu'utilisent un client et un serveur web pour échanger des requêtes et des réponses.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**HTTP** (HyperText Transfer Protocol) définit le format d'une **requête** (méthode, chemin, en-têtes, corps) et d'une **réponse** (code de statut, en-têtes, corps). **HTTPS** est la même chose, chiffrée.

### Pourquoi ça existe
Pour que n'importe quel client (navigateur, application, script) puisse parler à n'importe quel serveur sans accord préalable : tout le monde suit le même format.

### Le problème résolu
Sans protocole commun, chaque site inventerait sa façon de demander une page ou d'envoyer un formulaire. HTTP standardise ce dialogue.

## 2 · Explorer
### Comment ça fonctionne
Une requête contient :

| Élément | Exemple | Rôle |
| --- | --- | --- |
| Méthode | `GET`, `POST`, `PUT`, `DELETE` | L'intention |
| Chemin | `/notes/42` | La ressource visée |
| En-têtes | `Content-Type: application/json` | Les métadonnées |
| Corps | `{"title": "Courses"}` | Les données envoyées (POST, PUT) |

La réponse renvoie un **code de statut** :

| Famille | Sens | Exemples |
| --- | --- | --- |
| 2xx | Succès | `200 OK`, `201 Created` |
| 3xx | Redirection | `301`, `304` |
| 4xx | Erreur du client | `400`, `401`, `404` |
| 5xx | Erreur du serveur | `500`, `503` |

**HTTP est sans état** : le serveur ne se souvient pas des requêtes précédentes. Tout ce dont il a besoin (comme un jeton d'[[Authentification]]) doit être renvoyé à chaque fois.

### Exemple concret
```http
GET /notes/42 HTTP/1.1
Host: api.example.com
Accept: application/json
```
```http
HTTP/1.1 200 OK
Content-Type: application/json

{"id": 42, "title": "Courses"}
```
À tester dans le terminal : `curl -i https://api.github.com`

### Cas d'utilisation
- Afficher une page web
- Appeler une [[API REST]]
- Envoyer un formulaire

> [!warning] À ne pas confondre
> **HTTP** (le protocole de dialogue) et **HTML** (le langage d'une page). HTTP peut transporter du HTML, du [[JSON]], une image…

## 3 · Pratiquer
- [[Exercice - Créer une API REST avec Express]] : tu y verras les méthodes et codes de statut de l'intérieur

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Client-serveur]]
- **Notion parente** : [[Internet]]
- **Complémentaires** : [[JSON]] (le format le plus courant dans le corps), [[Authentification]]
- **Utilisé par** : [[API]], [[API REST]], [[Express]]
- **Cours** : [[Cours - Comment fonctionne le web]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
- [x] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [x] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
