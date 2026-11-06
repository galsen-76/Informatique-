---
type: concept
domain: reseau
module: "[[Module 17 - Réseau]]"
status: a-decouvrir
level: intermediaire
prerequisites:
  - "[[Adresse IP]]"
parents: []
related:
  - "[[Pare-feu]]"
  - "[[Proxy]]"
next_review: 
method: []
tags:
  - concept
  - reseau
---
# Routage et NAT

> [!info] En une phrase
> Le routage fait passer les paquets de réseau en réseau jusqu'à leur destination ; le NAT permet à plusieurs machines privées de partager une adresse publique.

```dataviewjs
await dv.view("10 — Templates/Scripts/learning", { view: "concept" })
```

## 1 · Comprendre
### Définition
- Une **passerelle** (*gateway*, souvent la box) est la sortie par défaut de ton réseau. Chaque **routeur** sur le chemin transmet le paquet un cran plus loin.
- Le **NAT** remplace l'adresse privée de ta machine par l'adresse publique de la box à la sortie, et fait l'inverse au retour. Docker et WSL font aussi du NAT pour leurs réseaux privés.
- Le **VPN** crée un tunnel chiffré vers le réseau de l'entreprise : tu reçois une adresse de ce réseau et ses routes.

### Pourquoi ça existe
Internet est un réseau de réseaux ; et il n'y a pas assez d'IPv4 publiques pour chaque appareil.

### Le problème résolu
Relier des millions de réseaux différents, et faire sortir tout un réseau local avec une seule IP publique.

## 2 · Explorer
### Comment ça fonctionne
```mermaid
flowchart TD
  P[PC privé] --> B[Box NAT]
  B --> R1[Routeur]
  R1 --> S[Serveur]
```

### Exemple concret
```bash
ip route               # Linux : « default via 192.168.1.1 » = la passerelle
traceroute gitlab.com  # chaque routeur traversé
curl ifconfig.me       # ton IP publique vue d'Internet
```
```powershell
route print
tracert gitlab.com
```

### Cas d'utilisation
- Comprendre pourquoi un service sur ton PC n'est pas joignable depuis Internet (NAT)
- Publier un port de conteneur (`-p`) = une règle de NAT faite par Docker
- Un outil interne joignable seulement quand le VPN est actif

> [!warning] À ne pas confondre
> Ton **IP privée** (`192.168.x`, vue par ton réseau local) et ton **IP publique** (celle de la box, vue par Internet).

## 3 · Pratiquer
- Trouve ta passerelle, ton IP privée et ton IP publique, puis trace le chemin vers un site.

## 4 · Expliquer
> [!quote] Mon résumé, avec mes mots
> _À écrire sans regarder la fiche. Si je bloque, je ne l'ai pas encore compris._

## 5 · Relier
- **Prérequis** : [[Adresse IP]]
- **Complémentaires** : [[Pare-feu]] · [[Proxy]]
- **Commandes** : [[traceroute]] · [[ip]]

## 6 · Réviser
> [!question] Me faire interroger
> Je demande à Claude de m'interroger sur cette notion pour vérifier que je l'ai comprise.

### Validation de la maîtrise
- [ ] Je l'explique sans notes, en 3 phrases, à quelqu'un qui ne connaît pas
- [ ] J'ai réussi un exercice qui l'utilise
- [ ] Je l'ai utilisé dans un projet
- [ ] Je sais dire quand ne pas l'utiliser (ou ce qu'il ne faut pas confondre)
