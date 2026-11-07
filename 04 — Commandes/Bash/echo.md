---
type: command
tool: Bash
level: debutant
concepts:
  - "[[Système de fichiers]]"
  - "[[Redirection et pipe]]"
tags:
  - commande
  - bash
---
# echo

> [!info] Bash
> Affiche un texte. Avec `>` ou `>>`, écrit ce texte dans un fichier.

## Pourquoi l'utiliser
Écrire une ligne dans un fichier sans ouvrir d'éditeur, afficher une variable, écrire un message dans un script.

## Dans quel contexte
Créer vite un fichier de configuration ou de test, déboguer un script (`echo "$VARIABLE"`).

## Syntaxe
```bash
echo "texte"
echo "texte" > fichier     # remplace le contenu
echo "texte" >> fichier    # ajoute à la fin
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `"texte"` | le texte à afficher ; guillemets conseillés |
| `>` | redirige vers un fichier : le **crée** ou l'**écrase** |
| `>>` | ajoute à la fin, sans effacer |
| `-e` | interprète `\n` (retour à la ligne) et `\t` |
| `-n` | pas de retour à la ligne final |

## Exemple concret
```bash
echo "Bonjour"
echo "# Mes notes Git" > notes/git.md
echo "git status montre l'état" >> notes/git.md
cat notes/git.md
```

## Résultat attendu
`Bonjour` s'affiche, puis `cat` montre les deux lignes du fichier `git.md`.

## Variantes utiles
- Plusieurs lignes d'un coup :
  ```bash
  cat > config.txt <<'EOF'
  ligne 1
  ligne 2
  EOF
  ```
- `printf "a\nb\n" > f` : plus précis que `echo` pour les formats
- PowerShell : `"texte" > fichier` marche aussi, ou [[Set-Content]]

> [!warning] Erreurs fréquentes
> - Utiliser `>` au lieu de `>>` : l'ancien contenu est **perdu** sans avertissement
> - Oublier les guillemets : `echo un  deux` écrase les espaces multiples, et `*` est remplacé par la liste des fichiers
> - Guillemets simples ou doubles : `'$HOME'` affiche le texte tel quel, `"$HOME"` affiche le chemin

## Relier
- **Commandes complémentaires** : [[touch]] · [[cat]] · [[nano]]
- **Concepts associés** : [[Système de fichiers]] · [[Redirection et pipe]]
