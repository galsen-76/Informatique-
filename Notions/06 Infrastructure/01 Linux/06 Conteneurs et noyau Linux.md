---
type: notion
statut: a apprendre
resume: "Un conteneur n'est pas une petite machine virtuelle : c'est un processus Linux normal, que le noyau isole grâce aux namespaces et limite grâce aux cgroups."
revu:
sources:
  - "https://docs.docker.com/get-started/docker-overview/"
  - "https://man7.org/linux/man-pages/man7/namespaces.7.html"
---
# Conteneurs et noyau Linux

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un conteneur n'est pas une petite machine virtuelle : c'est **un processus Linux normal**, que le noyau **isole** (namespaces) et **limite** (cgroups). C'est pour ça que Docker a besoin d'un noyau Linux.

## Le problème

**Pourquoi c'est utile ?**
Pour comprendre pourquoi Docker démarre en une seconde, pourquoi il tourne nativement sur les serveurs Linux, et pourquoi il faut WSL2 pour l'utiliser sous Windows.

**Qu'est-ce qui se passait sans ça ?**
Pour isoler des applications, on lançait une **machine virtuelle** par application : un système complet à chaque fois, avec son propre noyau, plusieurs Go de disque et des minutes de démarrage.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

### Machine virtuelle ou conteneur

```
   Machine virtuelle                    Conteneurs
┌────────┐ ┌────────┐            ┌────────┐ ┌────────┐
│ appli  │ │ appli  │            │ appli  │ │ appli  │
│ noyau  │ │ noyau  │            └────────┘ └────────┘
└────────┘ └────────┘            ─── UN SEUL noyau Linux ───
  hyperviseur + noyau hôte              machine hôte
```

Une VM embarque **son propre noyau** et émule une machine entière. Un conteneur **partage le noyau** de la machine hôte : il n'y a qu'un processus de plus, qui croit être seul.

### Les deux outils du noyau Linux

| Outil | Rôle | Image |
|---|---|---|
| **namespaces** | **isoler** : le conteneur a sa propre vue des processus (son appli a le PID 1), du réseau (sa propre IP), des fichiers (sa propre racine `/`), du nom de machine | des œillères : il ne voit que sa partie |
| **cgroups** | **limiter** : pas plus de 512 Mo de RAM, pas plus d'un demi-CPU | un compteur : il ne peut pas prendre plus que sa part |

Docker n'invente pas l'isolation : il **assemble** ces fonctions du noyau Linux, avec en plus les images et les couches.

### Et sous Windows ou Mac ?

Le noyau Windows n'a pas ces fonctions Linux. **Docker Desktop** fait donc tourner, en coulisses, **une petite machine Linux** (sous Windows : dans **WSL2**). Tes conteneurs tournent dans ce Linux-là. Sur un serveur Linux, il n'y a pas cette couche : les conteneurs tournent directement.

## 🧪 Exemple

Constater qu'un conteneur est un processus de la machine hôte (sur un Linux ou dans WSL) :

```bash
docker run -d --name test --memory 256m nginx   # cgroup : 256 Mo maximum
docker exec test ps aux    # dans le conteneur : nginx se croit seul, avec le PID 1
ps aux | grep nginx        # sur l'hôte : le même nginx apparaît, avec un autre PID
uname -r                   # sur l'hôte…
docker exec test uname -r  # …et dans le conteneur : LE MÊME noyau
```

## ⚠️ Limites et pièges

- **Un conteneur Linux a besoin d'un noyau Linux** : sur Windows, pas de Docker sans WSL2 (ou une VM).
- **Partager le noyau, c'est moins isolé qu'une VM** : une faille du noyau peut toucher tous les conteneurs. Ne pas lancer les conteneurs en `root` sans raison.
- **Sans limite de cgroups**, un conteneur gourmand peut prendre toute la mémoire de la machine et faire tomber les autres.
- **Les conteneurs Windows existent**, mais ils sont rares et ne tournent que sur Windows : quand on dit « conteneur », on parle presque toujours de Linux.

## 🔗 Liens

- **Prérequis :** [[01 Système d'exploitation et noyau|Système d'exploitation et noyau]], [[01 Docker|Docker]]
- **Voir aussi :** [[02 Pourquoi les serveurs tournent sous Linux|Pourquoi les serveurs tournent sous Linux]], [[05 Linux permissions processus et services|Linux permissions processus et services]], [[05 Kubernetes|Kubernetes]]
- **Utilisé dans :** chaque `docker run`, les jobs GitLab CI avec l'exécuteur Docker, Docker Desktop dans WSL2

## 📚 Notes

- Source : https://docs.docker.com/get-started/docker-overview/
- Source : https://man7.org/linux/man-pages/man7/namespaces.7.html
