---
type: command
tool: Réseau
level: intermediaire
concepts:
  - "[[Certificat]]"
  - "[[HTTPS et TLS]]"
tags:
  - commande
  - reseau
---
# openssl

> [!info] Réseau
> Boîte à outils de la cryptographie : lire et créer des certificats et des clés, tester une connexion TLS.

## Pourquoi l'utiliser
Comprendre une erreur de certificat, inspecter un certificat.

## Dans quel contexte
Diagnostic HTTPS, certificats d'entreprise, certificat de test.

## Syntaxe
```bash
openssl <sous-commande> [options]
```

## Paramètres
| Élément | Rôle |
| --- | --- |
| `s_client -connect hôte:443` | ouvre une connexion TLS et montre le certificat |
| `x509 -in cert.pem -noout -text` | lit un certificat |
| `req -x509 -newkey …` | crée un certificat auto-signé |
| `rand -hex 32` | génère un secret aléatoire |

## Exemple concret
```bash
openssl s_client -connect gitlab.com:443 -servername gitlab.com </dev/null | openssl x509 -noout -subject -issuer -dates
```

## Résultat attendu
Le sujet (nom), l'émetteur (CA) et les dates `notBefore` / `notAfter`.

## Variantes utiles
- `openssl x509 -in cert.pem -noout -fingerprint -sha256` : empreinte

> [!warning] Erreurs fréquentes
> - Oublier `-servername` : on reçoit parfois le mauvais certificat

## Relier
- **Commandes complémentaires** : [[curl]]
- **Concepts associés** : [[Certificat]] · [[HTTPS et TLS]]
