---
type: command
tool: Réseau
level: debutant
concepts:
  - "[[HTTP]]"
  - "[[HTTPS et TLS]]"
tags:
  - commande
  - reseau
---
# curl

> [!info] Réseau
> Envoie une requête (HTTP surtout) et affiche la réponse : le couteau suisse pour tester une API ou un site.

## Pourquoi l'utiliser
Tester une API, télécharger un fichier, voir les en-têtes et le certificat.

## Dans quel contexte
Déboguer une API, vérifier qu'un service répond, scripts de CI.

## Syntaxe
```bash
curl [options] URL
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `-i` | affiche les en-têtes de la réponse |
| `-v` | détaille tout (DNS, TLS, requête, réponse) |
| `-X POST` | méthode |
| `-H "Clé: valeur"` | ajoute un en-tête |
| `-d '{...}'` | envoie un corps |
| `-o fichier` / `-O` | enregistre la réponse |
| `-L` | suit les redirections |
| `-u user:mdp` | authentification simple |
| `-k` | **désactive** la vérification du certificat (test seulement) |

## Exemple concret
```bash
curl -i https://api.github.com/repos/python/cpython
curl -X POST -H "Content-Type: application/json" -d '{"nom":"Oumar"}' https://httpbin.org/post
```

## Résultat attendu
Le code de statut, les en-têtes et le corps (souvent du JSON).

## Variantes utiles
- `curl -s URL | python3 -m json.tool` : JSON lisible
- `curl -sS -o /dev/null -w "%{http_code}\n" URL` : seulement le code
- PowerShell 5 : écrire `curl.exe`

> [!warning] Erreurs fréquentes
> - PowerShell 5 : `curl` est un alias d'`Invoke-WebRequest`, utiliser `curl.exe`
> - Utiliser `-k` pour « faire marcher » au lieu de corriger le certificat

## Relier
- **Commandes complémentaires** : [[openssl]] · [[ping]]
- **Concepts associés** : [[HTTP]] · [[HTTPS et TLS]]
