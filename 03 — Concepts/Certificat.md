---
type: concept
domain: reseau
module: "[[Module 17 - Réseau]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[HTTPS et TLS]]"
parents: []
related:
  - "[[Proxy]]"
next_review: 
method: []
tags:
  - concept
  - reseau
---
# Certificat

> [!info] En une phrase
> Une carte d'identité numérique d'un serveur, signée par une autorité de certification, qui lie un nom (gitlab.com) à une clé publique.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Un **certificat** (format X.509, fichiers `.crt`, `.pem`) contient : le **nom** du serveur, sa **clé publique**, une **date d'expiration**, et la **signature** d'une **autorité de certification** (CA : Let's Encrypt, DigiCert…). Le serveur garde secrète la **clé privée** associée.

Ta machine a une liste de CA de confiance (le **magasin de certificats**). Un certificat est valide s'il remonte, par une **chaîne** de signatures, jusqu'à une de ces CA.

### Pourquoi ça existe
Prouver qu'un serveur est bien celui qu'il prétend être, sans l'avoir jamais rencontré.

### Le problème résolu
N'importe qui pourrait se faire passer pour ta banque ou ton GitLab.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  CA[CA racine] --> I[CA intermédiaire]
  I --> S[Certificat serveur]
  S --> N[Nom vérifié]
```

### Exemple concret
Erreurs fréquentes :
| Message | Cause |
| --- | --- |
| `certificate has expired` | date dépassée |
| `hostname mismatch` | le nom demandé n'est pas dans le certificat |
| `self-signed certificate` / `unable to get local issuer certificate` | la CA n'est pas dans ton magasin de confiance |

**En entreprise**, le proxy inspecte souvent le HTTPS avec **sa propre CA**. Il faut alors l'ajouter au magasin de confiance de chaque outil :
```bash
# Ubuntu / WSL / image Debian
sudo cp ca-entreprise.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```
```bash
# Outils qui ont leur propre magasin
export REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt   # Python requests
pip config set global.cert /etc/ssl/certs/ca-certificates.crt  # pip
git config --global http.sslCAInfo /etc/ssl/certs/ca-certificates.crt
```
```bash
openssl x509 -in cert.pem -noout -subject -issuer -dates     # lire un certificat
```

### Cas d'utilisation
- Résoudre `SSL: CERTIFICATE_VERIFY_FAILED` derrière le proxy de l'entreprise
- Faire confiance au Nexus ou au GitLab interne dans Docker et la CI

> [!warning] À ne pas confondre
> **Ajouter la bonne CA** (solution) et **désactiver la vérification** (`verify=False`, `-k`, `sslVerify false`) : cette dernière supprime toute protection, à ne faire que pour un test ponctuel. Et la **clé publique** (dans le certificat, partagée) et la **clé privée** (secrète, jamais dans Git).

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin avec mes mots (section 4).

> [!example] 🛣️ Suis le trajet
> Dessine la vérification d'un certificat quand tu fais `git push` vers vortex-gitlab : le serveur montre son certificat, WSL cherche l'autorité qui l'a signé.

> [!example] ⚖️ Avant / après
> Avant / après : WSL sans le certificat racine Assystem, puis avec. Dessine où se trouve le fichier ajouté et ce qui change.

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Certificat » et je l'intègre ici avec `![[Schéma - Certificat.excalidraw]]`._

### Appliquer dans le fil rouge
- Pas encore d'étape du fil rouge pour cette notion : je l'applique dans mon travail (CVAT, Nuclio) ou je demande une étape à Claude.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _J'explique mon schéma avec mes mots, sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[HTTPS et TLS]]
- **Complémentaires** : [[Proxy]] · [[Clé SSH]]
- **Commandes** : [[openssl]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
La notion est maîtrisée quand je sais :
1. **l'expliquer** de façon fluide, à partir de mon schéma (section 4) ;
2. **l'adapter** à un autre contexte (consigne « Change de contexte », ou Claude m'interroge sur un autre cas) ;
3. **l'appliquer** pour de vrai dans le fil rouge (section 3).

Réussir un exercice ne suffit pas. C'est moi qui passe le statut en `maitrise`.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
