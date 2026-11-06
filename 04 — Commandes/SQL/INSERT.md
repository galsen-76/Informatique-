---
type: command
tool: SQL
level: debutant
concepts:
  - "[[SQL]]"
tags:
  - commande
  - sql
---
# INSERT

> [!info] SQL
> Ajoute des lignes dans une table.

## Pourquoi l'utiliser
Enregistrer de nouvelles données.

## Dans quel contexte
Création d'une ressource, import, données de test.

## Syntaxe
```bash
INSERT INTO table (col1, col2) VALUES (v1, v2) [RETURNING col];
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| plusieurs `VALUES` | plusieurs lignes d'un coup |
| `RETURNING id` | renvoie l'id créé |
| `ON CONFLICT DO NOTHING` | ignore les doublons |
| `INSERT … SELECT` | copie depuis une requête |

## Exemple concret
```bash
INSERT INTO tache (projet_id, nom) VALUES (1, 'Lot 4') RETURNING id;
INSERT INTO label (nom) VALUES ('camion') ON CONFLICT (nom) DO NOTHING;
```

## Résultat attendu
`INSERT 0 1` et l'id renvoyé.

## Variantes utiles
- `COPY table FROM 'fichier.csv' CSV HEADER` : import massif

> [!warning] Erreurs fréquentes
> - Guillemets doubles pour une chaîne : en SQL les chaînes sont entre **apostrophes**
> - Construire la requête par concaténation dans le code (injection SQL)

## Relier
- **Commandes complémentaires** : [[UPDATE]] · [[SELECT]]
- **Concepts associés** : [[SQL]]
