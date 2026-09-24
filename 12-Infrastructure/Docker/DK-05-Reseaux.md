---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
aliases:
  - "Réseaux Docker"
tags:
  - infrastructure/docker/reseaux
parent: "[[Docker]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/network/"
---

# Réseaux Docker

> [!abstract] Introduction
> Docker crée des réseaux virtuels isolés permettant aux conteneurs de communiquer entre eux et avec l'extérieur, de façon contrôlée.

> [!warning]- Prérequis
> [[DK-01-Fondamentaux|Fondamentaux Docker]], [[NET-01-Fondamentaux-OSI-TCP-IP|notions de base réseau]] utile.

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> docker run -p 8080:80 nginx
> ```
> `8080:80` = le port 80 du conteneur accessible depuis l'hôte sur le port 8080.

> [!example]- Analogie
> Un port mappé est un standard téléphonique : les appels externes arrivent sur un numéro public (8080), redirigés en interne vers le poste réel (80) — l'appelant n'a jamais besoin de connaître le numéro interne.

> [!question]- Pourquoi l'utiliser ?
> Isoler chaque application dans son propre réseau évite les conflits et contrôle précisément qui peut parler à qui.

> [!question]- Comment ça marche ?
> Sur un réseau PERSONNALISÉ, les conteneurs se joignent par leur NOM. Sur le réseau `bridge` par défaut, seule l'adresse IP fonctionne (qui change à chaque redémarrage).

> [!question]- Quand l'utiliser ?
> Mapping de port : dès qu'un conteneur doit être accessible depuis l'hôte. Réseau personnalisé : dès que plusieurs conteneurs communiquent (Docker Compose le fait automatiquement).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Sans mapping de port explicite, un conteneur reste totalement inaccessible de l'extérieur, même s'il fonctionne parfaitement en interne — piège fréquent en débutant.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Mapping de port | Association `hôte:conteneur` rendant un service accessible |
| Réseau `bridge` | Réseau par défaut de Docker, sans résolution par nom |

---

## Points clés

- `-p hôte:conteneur` rend un port accessible depuis l'hôte
- Sans mapping, un conteneur reste inaccessible de l'extérieur
- Réseau personnalisé = résolution par NOM entre conteneurs
- Docker Compose crée automatiquement ce réseau personnalisé

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `-p` et se demander pourquoi le service est "injoignable" alors qu'il tourne bien
> - Essayer de joindre un conteneur par son nom sur le réseau `bridge` par défaut (ne fonctionne pas sans réseau personnalisé)

---

## Paramètres / Configuration

| Commande | Description |
|-----------|-------------|
| `docker run -p 8080:80 image` | Mappe un port |
| `docker network create nom` | Crée un réseau personnalisé |
| `docker network ls` | Liste les réseaux |

---

## Exemple minimal

```bash
docker network create app-network
docker run -d --network app-network --name db postgres:16
docker run -d --network app-network -e DATABASE_HOST=db mon-backend
```

> [!note] Ce que j'en retiens
> Le backend accède à `db` par son NOM, sans jamais connaître d'adresse IP.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Docker embarque un serveur DNS interne pour les réseaux personnalisés : c'est lui qui résout les noms de conteneurs (réponse à la note brute)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Docker]]
- Sous-sujets → (aucun)
- À comparer avec → [[DK-03-Docker-Compose|Docker Compose]]

**Pratique :**
- Extrait de code → (aucun pour l'instant)
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi un conteneur sans `-p` reste injoignable, sans dire "port" deux fois ?

---

## Tâches

- [ ] #task Créer un réseau personnalisé et connecter deux conteneurs par leur nom
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Comment fonctionne la résolution de nom en coulisses sur un réseau personnalisé ?
