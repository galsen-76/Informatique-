---
type: bonnes-pratiques
sujet: "Sécurité"
concepts:
  - "[[Authentification]]"
  - "[[Autorisation et rôles]]"
  - "[[Hachage de mot de passe]]"
  - "[[Injection SQL]]"
  - "[[XSS]]"
  - "[[CSRF]]"
  - "[[Secret et fichier .env]]"
  - "[[HTTPS et TLS]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - Sécurité

> [!info] À quoi sert cette fiche
> Les réflexes qui évitent la grande majorité des failles, quel que soit le langage.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Ne jamais faire confiance aux données qui viennent de l'extérieur
Formulaires, paramètres d'URL, fichiers, en-têtes, autres API : valider côté serveur. Voir [[Validation des données]].

### 2. Les secrets hors du code et de Git
Variables d'environnement, `.env` ignoré, variables masquées de la CI. Voir [[Secret et fichier .env]].

### 3. Hacher les mots de passe avec argon2 ou bcrypt
Jamais en clair, jamais MD5 ni SHA-256 seul. Voir [[Hachage de mot de passe]].

### 4. Vérifier les droits à chaque requête, côté serveur
Par rôle et par propriété de la ressource. Voir [[Autorisation et rôles]].

### 5. Le moindre privilège partout
Utilisateurs, jetons d'API, comptes de service, conteneurs : le minimum de droits nécessaires.

### 6. HTTPS partout et des cookies sûrs
`HttpOnly`, `Secure`, `SameSite=Lax`. Voir [[Session et cookie]] et [[HTTPS et TLS]].

### 7. Mettre à jour les dépendances
`npm audit`, `pip-audit`, Dependabot ou Renovate : la plupart des attaques utilisent des failles connues et corrigées.

### 8. Journaliser les événements de sécurité, sans données sensibles
Connexions, refus d'accès, erreurs : utile pour enquêter.

## À éviter

### 1. Concaténer des données dans du SQL, du HTML ou une commande shell
**Pourquoi c'est un problème :** injection SQL, XSS, injection de commande.
**À la place :** requêtes paramétrées, échappement (`textContent`), listes d'arguments.

### 2. Cacher un bouton au lieu de vérifier les droits sur le serveur
**Pourquoi c'est un problème :** n'importe qui appelle l'API directement.
**À la place :** contrôle d'accès dans l'API.

### 3. Désactiver la vérification TLS (`verify=False`, `-k`)
**Pourquoi c'est un problème :** n'importe qui peut intercepter la connexion.
**À la place :** installer le bon certificat d'autorité.

### 4. Journaliser des mots de passe, jetons ou données personnelles
**Pourquoi c'est un problème :** les logs sont lus par beaucoup de monde et conservés longtemps.
**À la place :** masquer ces champs.

### 5. Des messages d'erreur trop précis à la connexion
**Pourquoi c'est un problème :** « utilisateur inconnu » révèle qui a un compte.
**À la place :** un seul message : « identifiants invalides ».

### 6. Inventer son propre chiffrement ou système de jetons
**Pourquoi c'est un problème :** presque toujours cassable.
**À la place :** des bibliothèques reconnues et maintenues.

## Avant de valider mon travail
- [ ] Toutes les entrées sont validées côté serveur
- [ ] Aucun secret dans le code, l'historique Git ou l'image
- [ ] Les mots de passe sont hachés avec argon2 ou bcrypt
- [ ] Chaque route vérifie les droits
- [ ] `npm audit` ou `pip-audit` ne signale rien de grave

## Notions liées
[[Authentification]] · [[Autorisation et rôles]] · [[Hachage de mot de passe]] · [[Injection SQL]] · [[XSS]] · [[CSRF]] · [[Secret et fichier .env]] · [[HTTPS et TLS]]
