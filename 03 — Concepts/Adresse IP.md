---
type: concept
domain: reseau
module: "[[Module 17 - Réseau]]"
status: a-decouvrir
level: debutant
niveau: 1
schema: false
exercice_visuel: false
fil_rouge: false
prerequisites:
  - "[[Internet]]"
parents: []
related:
  - "[[DNS]]"
  - "[[Port]]"
next_review: 
tags:
  - concept
  - reseau
---
# Adresse IP

> [!info] En une phrase
> Le numéro qui identifie une machine sur un réseau, comme une adresse postale.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
Une **adresse IPv4** s'écrit en 4 nombres de 0 à 255 : `192.168.1.20`. Le **masque** (`/24`) dit quelle partie désigne le réseau et quelle partie la machine : `192.168.1.0/24` = toutes les adresses `192.168.1.x`. **IPv6** (`2001:db8::1`) existe car il n'y a plus assez d'adresses IPv4.

| Adresse | Sens |
| --- | --- |
| `127.0.0.1` / `localhost` | cette machine elle-même |
| `0.0.0.0` | (pour un serveur) écouter sur toutes les interfaces |
| `10.x`, `172.16-31.x`, `192.168.x` | adresses **privées** (réseau local, conteneurs) |
| autres | adresses **publiques**, joignables sur Internet |

### Pourquoi ça existe
Pour que les paquets de données sachent à quelle machine aller.

### Le problème résolu
Sans adresse unique sur un réseau, impossible d'envoyer une donnée à une machine précise.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  P[Ton PC 192.168.1.20] --> B[Box 192.168.1.1]
  B --> I[Internet]
```
- Ta machine a souvent **plusieurs** adresses : une par interface (Wi-Fi, Ethernet, WSL, Docker).
- Chez toi, la box donne les adresses automatiquement (**DHCP**) ; les serveurs ont souvent une adresse fixe.
- Docker crée ses propres réseaux privés (`172.17.0.0/16`) : chaque conteneur y a son IP.

### Exemple concret
```bash
ip addr          # Linux / WSL : tes adresses
hostname -I      # version courte
```
```powershell
ipconfig         # Windows
```

### Cas d'utilisation
- Savoir si un service est joignable seulement en local ou depuis le réseau
- Comprendre pourquoi un serveur dans un conteneur doit écouter sur `0.0.0.0`

> [!warning] À ne pas confondre
> `localhost` dans un conteneur = **le conteneur lui-même**, pas ta machine. Et WSL a sa propre adresse, différente de celle de Windows.

## 3 · Pratiquer

### Exercice visuel

Sur Excalidraw, **sans regarder la fiche**. Puis je compare avec la fiche, je corrige en rouge ce qui était faux, et j'explique mon dessin à voix haute ou à Claude dans le chat.

> [!example] 🧠 Dessine de mémoire
> Dessine ton PC avec ses adresses : celle sur le réseau local, celle de WSL, `127.0.0.1`. Relie qui peut joindre qui.

> [!example] 🔄 Change de contexte
> Redessine-le avec un conteneur Docker. Quelle adresse a-t-il, et comment ton navigateur l'atteint-il ?

### Mon schéma

> [!tip] Mon dessin Excalidraw
> _Je crée le dessin « Schéma - Adresse IP » et je l'intègre ici avec `![[Schéma - Adresse IP.excalidraw]]`, puis je coche `schema`._

### Appliquer dans le fil rouge
- [[MesDépenses 02 - Suivre une requête sur le réseau]]

## 4 · Relier
- **Prérequis** : [[Internet]]
- **Complémentaires** : [[DNS]] · [[Routage et NAT]] · [[Port]]
- **Commandes** : [[ip]] · [[ipconfig]] · [[ping]]

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
