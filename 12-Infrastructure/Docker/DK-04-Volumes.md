---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M11
aliases:
  - "Volumes & Persistance des Données Docker"
tags:
  - infrastructure/docker/volumes
parent: "[[Docker]]"
children: []
related_theory: []
related_snippets: []
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/storage/volumes/"
---

# Volumes & Persistance des Données Docker

> [!abstract] Introduction
> Un volume est un espace de stockage existant en dehors du conteneur, pour que les données survivent à sa suppression.

> [!warning]- Prérequis
> [[DK-01-Fondamentaux|Fondamentaux Docker]] (notion de conteneur éphémère).

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> docker run -v donnees_db:/var/lib/postgresql/data postgres:16
> ```

> [!example]- Analogie
> Le conteneur est une salle de classe qu'on vide et réinitialise chaque soir. Le volume est un casier externe verrouillé, où les affaires importantes restent en sécurité peu importe ce qui se passe dans la salle.

> [!question]- Pourquoi l'utiliser ?
> Sans volume, redémarrer un conteneur de base de données effacerait TOUTES les données.

> [!question]- Comment ça marche ?
> Un volume nommé est géré entièrement par Docker. Un bind mount relie un dossier PRÉCIS de la machine hôte, utile en développement pour un rechargement de code immédiat.

> [!question]- Quand l'utiliser ?
> Volume nommé : données devant survivre (BDD). Bind mount : code source en développement local.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Oublier un volume sur une base de données de production est catastrophique — toute donnée disparaît à la moindre recréation du conteneur.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Volume nommé | Stockage géré entièrement par Docker |
| Bind mount | Lien direct vers un dossier précis de la machine hôte |

---

## Points clés

- Sans volume, toute donnée écrite dans un conteneur disparaît à sa suppression
- Volume nommé = géré par Docker, bind mount = dossier précis de l'hôte
- Bind mount utile pour le rechargement de code en développement

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Lancer une base de données sans volume "pour tester vite", puis perdre des données importantes accidentellement
> - Confondre volume nommé et bind mount dans la syntaxe

---

## Paramètres / Configuration

| Syntaxe | Type | Usage typique |
|-----------|------|---------|
| `-v nom:/chemin` | Volume nommé | Données persistantes |
| `-v /chemin/local:/chemin` | Bind mount | Code source en dev |

---

## Exemple minimal

```bash
docker run -d -v donnees_db:/var/lib/postgresql/data postgres:16
```

> [!note] Ce que j'en retiens
> Même si ce conteneur est supprimé et recréé avec le même volume, les données restent intactes.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Sauvegarder un volume : `docker run --rm -v pgdata:/data -v $PWD:/backup alpine tar czf /backup/pgdata.tgz /data` (ou `pg_dump` pour une BDD)

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
> Pourrais-je expliquer pourquoi un conteneur SANS volume perd ses données à la suppression ?

---

## Tâches

- [ ] #task Créer un volume pour persister une base PostgreSQL locale
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Où sont physiquement stockés les volumes sur Mac (Docker Desktop via VM) ?
