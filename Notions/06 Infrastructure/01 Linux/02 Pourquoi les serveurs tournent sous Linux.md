---
type: notion
statut: a apprendre
resume: "La plupart des serveurs tournent sous Linux parce qu'il est gratuit, ouvert, léger, stable, entièrement pilotable à distance en ligne de commande, et que Docker et le cloud sont construits dessus."
revu:
sources:
  - "https://www.top500.org/statistics/list/"
  - "https://www.linuxfoundation.org/"
---
# Pourquoi les serveurs tournent sous Linux

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : La grande majorité des serveurs tournent sous Linux parce qu'il est **gratuit**, **ouvert**, **léger**, **stable**, **entièrement pilotable à distance en ligne de commande**, et que **Docker et le cloud sont construits dessus**.

## Le problème

**Pourquoi c'est utile ?**
Pour comprendre pourquoi tout ce que tu déploies (ton API, ta base, tes conteneurs, ta CI) finit sur Linux, alors que ton ordinateur est sous Windows. Et donc pourquoi apprendre Linux n'est pas optionnel pour un développeur full stack.

**Qu'est-ce qui se passait sans ça ?**
Dans les années 1990, les serveurs tournaient sous des Unix propriétaires (Solaris, AIX, HP-UX) vendus avec du matériel très cher, ou sous Windows Server avec une licence par machine. Monter un serveur coûtait cher, et on dépendait d'un seul fournisseur pour les mises à jour et les corrections.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Un serveur, ce n'est pas un ordinateur de bureau : **personne ne s'assoit devant**. Il tourne 24 h/24 dans un datacenter, on l'administre à distance, et on en a souvent des dizaines identiques. Ce qu'on attend de lui est très différent d'un PC, et c'est exactement là que Linux est fort.

### Les 7 raisons

| Raison | Ce que ça veut dire concrètement |
|---|---|
| **1. Gratuit** | pas de licence par machine ni par cœur de processeur : 1 serveur ou 1 000, même prix. Énorme quand on en lance des centaines dans le cloud |
| **2. Ouvert (open source)** | le code du noyau et des outils est public : on peut le lire, le corriger, l'adapter. Des milliers d'entreprises (Google, Red Hat, Microsoft…) l'améliorent ensemble, et une faille est vite vue et corrigée |
| **3. Léger** | pas besoin d'interface graphique : un serveur Linux démarre avec très peu de mémoire, toute la puissance va à l'application. Une image Docker Alpine pèse environ 5 Mo |
| **4. Stable** | un serveur Linux peut tourner des mois sans redémarrer ; on met à jour un service sans arrêter toute la machine |
| **5. Tout en ligne de commande** | tout se fait par des commandes et des fichiers texte : on se connecte en **SSH**, on **scripte** l'installation, on la **versionne** dans Git, et on la rejoue à l'identique sur 100 machines (voir [[04 Infrastructure as Code|Infrastructure as Code]]) |
| **6. Docker et les conteneurs** | les conteneurs utilisent des fonctions **du noyau Linux** : Docker est né sur Linux et y tourne nativement (voir [[06 Conteneurs et noyau Linux|Conteneurs et noyau Linux]]) |
| **7. L'écosystème serveur** | Nginx, PostgreSQL, Redis, Node, les runners GitLab, Kubernetes : tout est d'abord pensé et testé pour Linux |

### Le résultat aujourd'hui

- La **grande majorité des serveurs web et des machines du cloud** (AWS, Google Cloud, Azure) tournent sous Linux.
- Les **500 supercalculateurs** les plus puissants du monde tournent **tous** sous Linux (classement TOP500, depuis 2017).
- Même **Microsoft** propose Linux sur Azure et l'a intégré à Windows (**WSL**).
- **Android** est construit sur le noyau Linux.

### Et Windows Server ?

Il existe et reste utilisé, surtout dans les entreprises très Microsoft :

| Windows Server reste choisi pour… | Pourquoi |
|---|---|
| **Active Directory** | la gestion des comptes et des postes de l'entreprise |
| les anciennes applis **.NET Framework**, IIS, Exchange | elles ne tournent que sous Windows |
| les équipes formées uniquement à Windows | moins de changement |

Mais pour une **application web moderne** (Node, NestJS, PostgreSQL, Docker), Linux est le choix par défaut.

### Ce que ça change pour toi

Ton PC est sous Windows, mais **ton code finira sur Linux** : dans le conteneur Docker, sur le runner GitLab, sur le serveur. C'est pour ça qu'on développe dans **WSL** : tu travailles déjà dans le même système que la production, et les surprises (chemins, majuscules, droits) apparaissent chez toi plutôt qu'en prod.

## 🧪 Exemple

Le même déploiement, vu des deux côtés :

```bash
# Sur un serveur Linux, à distance, sans écran ni souris :
ssh deploy@mon-serveur          # se connecter (voir Linux et réseau)
sudo apt update && sudo apt upgrade -y   # mettre à jour tout le système en une ligne
docker compose pull && docker compose up -d   # déployer la nouvelle version
```

Ces trois lignes peuvent être mises dans un **script** ou un job de CI, et rejouées sur 50 serveurs. Sur un serveur avec interface graphique, il faudrait se connecter à chacun et cliquer.

## ⚠️ Limites et pièges

- **Ce n'est pas « Linux contre Windows » partout** : Windows reste roi sur les postes de travail et dans la gestion des comptes d'entreprise (Active Directory).
- **Gratuit ne veut pas dire sans coût** : il faut des gens qui savent l'administrer, et les entreprises paient souvent un **support** (Red Hat, Canonical).
- **Il y a une courbe d'apprentissage** : pas d'interface graphique sur un serveur, tout passe par le terminal.
- **Linux est sensible à la casse** : `Image.png` et `image.png` sont deux fichiers différents. Un projet qui marche sous Windows peut casser une fois déployé.
- **Les chemins diffèrent** : `/home/moi/projet` sous Linux, `C:\Users\moi\projet` sous Windows. Ne jamais écrire un chemin Windows en dur dans le code.

## 🔗 Liens

- **Prérequis :** [[01 Système d'exploitation et noyau|Système d'exploitation et noyau]], [[01 Client et serveur|Client et serveur]]
- **Voir aussi :** [[03 Distributions Linux|Distributions Linux]], [[06 Conteneurs et noyau Linux|Conteneurs et noyau Linux]], [[04 Linux fichiers et commandes essentielles|Linux fichiers et commandes essentielles]], [[15 Linux et réseau|Linux et réseau]], [[01 Cloud notions de base|Cloud notions de base]]
- **Utilisé dans :** tes conteneurs Docker, les runners GitLab CI, les serveurs de recette et de production

## 📚 Notes

- Source : https://www.top500.org/statistics/list/ (classement des supercalculateurs, onglet « Operating System Family »)
- Source : https://www.linuxfoundation.org/
