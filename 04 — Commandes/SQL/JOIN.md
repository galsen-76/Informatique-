---
type: command
tool: SQL
level: debutant
concepts:
  - "[[Jointure SQL]]"
tags:
  - commande
  - sql
---
# JOIN

> [!info] SQL
> Combine les lignes de plusieurs tables selon une condition.

## Pourquoi l'utiliser
Répondre à une question qui concerne plusieurs tables.

## Dans quel contexte
Listes enrichies, statistiques.

## Syntaxe
```bash
SELECT … FROM a JOIN b ON b.a_id = a.id;
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `JOIN` / `INNER JOIN` | seulement les correspondances |
| `LEFT JOIN` | toutes les lignes de gauche |
| `GROUP BY` + `COUNT` | agréger par groupe |
| alias `t`, `p` | raccourcir les noms |

## Exemple concret
```bash
SELECT p.nom, COUNT(t.id)
FROM projet p LEFT JOIN tache t ON t.projet_id = p.id
GROUP BY p.nom;
```

## Résultat attendu
Une ligne par projet avec son nombre de tâches.

## Variantes utiles
- `USING (colonne)` si les colonnes ont le même nom

> [!warning] Erreurs fréquentes
> - Oublier le `ON` : produit cartésien (toutes les combinaisons)

## Relier
- **Commandes complémentaires** : [[SELECT]]
- **Concepts associés** : [[Jointure SQL]]
