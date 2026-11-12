---
type: howto
concepts:
  - "[[Exception]]"
  - "[[Variable d'environnement]]"
  - "[[Module et import Python]]"
tags:
  - fiche-pratique
  - erreurs
  - aide-memoire
---
# Fiche - Aide-mémoire des erreurs fréquentes

> [!info] Objectif
> Reconnaître la **famille** d'une erreur à son nom et savoir quel est le **premier réflexe**. La méthode complète est dans [[Fiche - Lire un message d'erreur]].

## Python

| Erreur | Ce que ça veut dire | Premier réflexe |
|---|---|---|
| `ModuleNotFoundError: No module named 'x'` | le paquet n'est pas installé **là où le code tourne** (venv, image Docker) | est-il dans `requirements.txt` ? attention : le nom pip peut différer du nom importé (`python-dotenv` → `import dotenv`) |
| `ImportError: cannot import name 'y' from 'x'` | le module existe, mais pas ce nom dedans | faute de frappe, ou mauvaise version de la bibliothèque |
| `NameError: name 'x' is not defined` | Python ne connaît pas ce mot | faute de frappe, variable pas encore créée, texte collé au mauvais endroit |
| `KeyError: 'x'` | clé absente d'un dictionnaire (`dict["x"]`, `os.environ["x"]`) | afficher les clés présentes ; pour l'environnement : la variable a-t-elle été passée ? |
| `AttributeError: 'NoneType' object has no attribute 'y'` | tu utilises un objet qui vaut `None` | qui a renvoyé `None` ? (fonction sans `return`, recherche sans résultat) |
| `TypeError: … takes 2 positional arguments but 3 were given` | mauvais nombre ou type d'arguments | relire la signature de la fonction |
| `TypeError: unsupported operand type(s) for +: 'int' and 'str'` | mélange de types | convertir (`int()`, `str()`) |
| `ValueError: invalid literal for int()` | le type est bon, la valeur non | afficher la valeur reçue |
| `IndexError: list index out of range` | position qui n'existe pas dans une liste | afficher `len(liste)` |
| `FileNotFoundError: [Errno 2] No such file or directory` | le chemin n'existe pas **depuis l'endroit où tourne le code** | afficher `Path.cwd()` et le chemin absolu |
| `PermissionError: [Errno 13]` | pas le droit de lire ou écrire | propriétaire et droits du fichier (`ls -l`) |
| `IndentationError` / `SyntaxError` | Python n'arrive même pas à lire le fichier | regarder la ligne indiquée **et celle d'avant** (parenthèse ou guillemet non fermé) |
| `Invalid type for variable '…'. Required value type is X and passed type was Y` | message d'une **bibliothèque** (SDK généré) : la réponse reçue n'a pas la forme attendue | comparer la version de la bibliothèque et celle du serveur |

## Bash et terminal

| Erreur | Ce que ça veut dire | Premier réflexe |
|---|---|---|
| `command not found` | le programme n'est pas dans le [[Variable PATH|PATH]] ou pas installé | `which programme` |
| `Permission denied` | pas le droit d'exécuter ou de lire | `ls -l`, `chmod +x` pour un script |
| `No such file or directory` | chemin faux depuis le dossier courant | `pwd`, puis `ls` |
| `not a valid identifier` | un nom de variable invalide (lettres, chiffres et `_` seulement) | as-tu mis une **valeur** à la place du **nom** ? |
| `unexpected EOF` / `syntax error near unexpected token` | guillemet ou parenthèse non fermé | relire les guillemets de la commande |
| code de sortie différent de 0 (`echo $?`) | la commande a échoué, même sans message clair | voir [[Code de sortie]] |

## Docker

| Erreur | Ce que ça veut dire | Premier réflexe |
|---|---|---|
| `port is already allocated` | un autre conteneur ou programme écoute déjà sur ce port | `docker ps` |
| `pull access denied` / `manifest unknown` | l'image ou son tag n'existe pas, ou le registre est bloqué | vérifier le nom ; au travail, passer par le Nexus |
| `Conflict. The container name "/x" is already in use` | un conteneur arrêté porte déjà ce nom | `docker ps -a`, puis `docker rm x` |
| `Cannot connect to the Docker daemon` | le démon Docker ne tourne pas | lancer Docker Desktop ou le service |
| conteneur qui redémarre en boucle | le programme dedans plante au démarrage | `docker logs <conteneur>` : l'erreur Python est là |

## Nuclio (`nuctl`)

| Erreur | Ce que ça veut dire | Premier réflexe |
|---|---|---|
| `Project label not found` | le déploiement ne dit pas à quel projet appartient la fonction | ajouter `--project-name cvat` |
| `Function is being provisioned and cannot be deleted` | la fonction est restée bloquée en `building` | supprimer le conteneur, puis la fiche de la fonction |
| `Caught unhandled exception while initializing` | ton code Python plante **au chargement** | lire le `"err"` et le `"traceback"` juste après |
| `panic: Wrapper process … exited unexpectedly` | conséquence : Python est mort | remonter à l'erreur juste au-dessus |

## HTTP

| Code | Sens | Premier réflexe |
|---|---|---|
| `400` | requête mal formée | relire le corps envoyé |
| `401` | pas identifié (token absent ou faux) | le token est-il bien envoyé ? |
| `403` | identifié mais pas autorisé (ou CSRF) | droits du compte, jeton CSRF |
| `404` | adresse inconnue | relire l'URL, le port, le préfixe |
| `500` | le serveur a planté | lire les logs **du serveur** |
| `502` / `503` | le proxy n'atteint pas le service derrière | le service tourne-t-il ? |

## Liens
[[Fiche - Lire un message d'erreur]] · [[Erreurs et solutions]] · [[Exception]] · [[Gestion des erreurs d'une API]]
