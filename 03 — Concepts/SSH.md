---
type: concept
domain: reseau
module: "[[Module 17 - Réseau]]"
status: a-decouvrir
level: debutant
niveau: 4
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Terminal]]"
  - "[[TCP et UDP]]"
parents: []
related:
  - "[[Clé SSH]]"
next_review: 
tags:
  - concept
  - reseau
---
# SSH

> [!info] En une phrase
> Le protocole pour ouvrir un terminal sur une machine distante, de façon chiffrée ; il sert aussi à Git et à copier des fichiers.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
**SSH** (*Secure Shell*, port 22) te donne un shell sur un serveur comme si tu étais devant. La connexion est chiffrée ; tu t'identifies par mot de passe ou, mieux, par [[Clé SSH]]. Au premier contact, SSH mémorise l'**empreinte** du serveur dans `~/.ssh/known_hosts` pour détecter un imposteur ensuite.

### Pourquoi ça existe
Administrer des serveurs (souvent sans écran) depuis n'importe où, en sécurité.

### Le problème résolu
Les anciens outils (telnet) envoyaient tout, mot de passe compris, en clair.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  T[Ton terminal] --> S[ssh]
  S --> D[sshd serveur]
  D --> B[Shell distant]
```

### Exemple concret
```bash
ssh oumar@serveur.entreprise.local          # se connecter
ssh -p 2222 oumar@10.0.0.5                  # autre port
scp archive.zip oumar@serveur:/tmp/         # copier un fichier
ssh oumar@serveur "docker ps"               # lancer une commande et revenir
```
Configuration pour ne plus retaper : `~/.ssh/config`
```text
Host cvat
    HostName serveur.entreprise.local
    User oumar
    IdentityFile ~/.ssh/id_ed25519
```
→ `ssh cvat`.

### Cas d'utilisation
- `git clone git@gitlab.com:equipe/projet.git` passe par SSH

> [!warning] À ne pas confondre
> `REMOTE HOST IDENTIFICATION HAS CHANGED` : l'empreinte du serveur a changé (réinstallation… ou attaque). Ne supprime l'ancienne ligne de `known_hosts` qu'après avoir vérifié avec l'équipe.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🛣️ Suis le trajet
> Dessine `ssh oumar@serveur` : ton terminal, la connexion chiffrée, le shell qui s'ouvre sur l'autre machine.

> [!example] 🔄 Change de contexte
> Redessine-le pour `git push` en SSH vers GitLab. Qu'est-ce qui remplace le shell distant ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - SSH » et je l'intègre ici avec `![[Schéma - SSH.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses 11 - Installer l'API sur un serveur]]

## 4 · Relier
- **Au travail** : [[SSH au travail]]
- **Prérequis** : [[Terminal]] · [[TCP et UDP]]
- **Complémentaires** : [[Clé SSH]] · [[Pare-feu]]
- **Commandes** : [[ssh user@hôte]] · [[scp]]

## 5 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation (compris, puis maîtrisé)
Trois cases à cocher dans les propriétés de la fiche :
- `schema` : mon dessin du concept est dans « Mon schéma » ;
- `exercice_visuel` : j'ai fait et corrigé les exercices visuels de la section 3 ;
- `fil_rouge` : je l'ai appliqué dans le fil rouge (coché tout seul quand une étape qui l'utilise est réussie).

Les trois cochées : la notion compte comme **comprise**. **Maîtrisé** : c'est moi qui le mets dans `status`, quand je le sens.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "maitrise" })
```
