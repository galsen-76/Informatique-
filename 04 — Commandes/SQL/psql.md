---
type: command
tool: SQL
level: debutant
concepts:
  - "[[SQL]]"
  - "[[Base de données relationnelle]]"
tags:
  - commande
  - sql
---
# psql

> [!info] SQL
> Le client en ligne de commande de PostgreSQL.

## Pourquoi l'utiliser
Se connecter à une base et lancer des requêtes ou des commandes d'administration.

## Dans quel contexte
Base locale dans Docker, base d'un serveur, débogage.

## Syntaxe
```bash
psql -h hôte -U utilisateur -d base
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `\l` | liste les bases |
| `\c base` | change de base |
| `\dt` | liste les tables |
| `\d table` | structure d'une table |
| `\x` | affichage vertical |
| `\i fichier.sql` | exécute un fichier |
| `\q` | quitter |

## Exemple concret
```bash
docker exec -it pg-notes psql -U postgres -d notes
psql "postgresql://postgres:dev@localhost:5432/notes" -c "SELECT count(*) FROM tache;"
```

## Résultat attendu
Une invite `notes=#` ; les résultats en tableau.

## Variantes utiles
- `pg_dump base > sauvegarde.sql` : sauvegarde
- `psql base < sauvegarde.sql` : restauration

> [!warning] Erreurs fréquentes
> - Oublier le `;` : la requête attend (`notes-#`)
> - `psql: error: connection refused` : la base ne tourne pas ou le port n'est pas publié

## Relier
- **Commandes complémentaires** : [[SELECT]] · [[docker exec]]
- **Concepts associés** : [[SQL]] · [[Base de données relationnelle]]
