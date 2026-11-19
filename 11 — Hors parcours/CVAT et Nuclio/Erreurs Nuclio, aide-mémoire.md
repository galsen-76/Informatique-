---
type: reference
tags:
  - travail
---
# Erreurs Nuclio, aide-mémoire

Sorti de [[Fiche - Aide-mémoire des erreurs fréquentes]] le 19/11/2026.

## Nuclio (`nuctl`)

| Erreur | Ce que ça veut dire | Premier réflexe |
|---|---|---|
| `Project label not found` | le déploiement ne dit pas à quel projet appartient la fonction | ajouter `--project-name cvat` |
| `Function is being provisioned and cannot be deleted` | la fonction est restée bloquée en `building` | supprimer le conteneur, puis la fiche de la fonction |
| `Caught unhandled exception while initializing` | ton code Python plante **au chargement** | lire le `"err"` et le `"traceback"` juste après |
| `panic: Wrapper process … exited unexpectedly` | conséquence : Python est mort | remonter à l'erreur juste au-dessus |

