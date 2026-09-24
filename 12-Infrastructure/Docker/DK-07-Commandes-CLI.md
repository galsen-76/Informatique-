---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
aliases:
  - "Commandes CLI Essentielles Docker"
tags:
  - infrastructure/docker/cli
parent: "[[Docker]]"
children: []
related_theory: []
related_snippets:
  - "[[04_Snippets/docker-cli-cheatsheet]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://docs.docker.com/engine/reference/commandline/cli/"
---

# Commandes CLI Essentielles Docker

> [!abstract] Introduction
> Un ensemble de commandes couvrant le cycle de vie complet d'un conteneur : créer, inspecter, déboguer, nettoyer.

> [!warning]- Prérequis
> [[DK-01-Fondamentaux|Fondamentaux Docker]].

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> docker exec -it nom_conteneur bash
> docker logs -f nom_conteneur
> ```

> [!example]- Analogie
> `docker exec -it` est comme entrer physiquement dans un bâtiment déjà en activité pour voir ce qui s'y passe, plutôt que de deviner de l'extérieur en regardant les fenêtres.

> [!question]- Pourquoi l'utiliser ?
> Déboguer rapidement un comportement inattendu et faire le ménage régulier des ressources inutilisées.

> [!question]- Comment ça marche ?
> `docker exec -it nom bash` ouvre un terminal dans un conteneur déjà lancé. `docker system prune` nettoie tout ce qui est inutilisé.

> [!question]- Quand l'utiliser ?
> `exec` pour déboguer, `logs -f` pour suivre en direct, `prune` régulièrement pour libérer de l'espace disque.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `docker system prune` peut supprimer des images qu'on pensait encore utiles — toujours vérifier ce qui va être supprimé avant de confirmer.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `exec` | Ouvre un terminal dans un conteneur déjà lancé |
| `prune` | Nettoie les ressources Docker inutilisées |

---

## Points clés

- `docker exec -it nom bash` = terminal interactif dans un conteneur actif
- `docker logs -f` suit les logs en direct
- Les commandes `prune` nettoient mais peuvent supprimer plus que prévu
- `docker rm -f` force arrêt + suppression en une commande

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Lancer `docker system prune` sans vérifier ce qui va être supprimé
> - Oublier `-it` avec `exec`, obtenant une session non interactive inutilisable

---

## Paramètres / Configuration

| Commande | Description |
|-----------|-------------|
| `docker exec -it nom bash` | Terminal dans un conteneur |
| `docker logs -f nom` | Logs en direct |
| `docker stats` | Utilisation CPU/mémoire |
| `docker system prune` | Nettoyage global |

---

## Exemple minimal

```bash
docker exec -it mon_backend bash
cat /app/config.json
exit
```

> [!note] Ce que j'en retiens
> Explorer directement le système de fichiers d'un conteneur actif est souvent plus rapide que deviner un bug de configuration depuis l'extérieur.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - `docker system df` affiche l'espace total occupé par images, conteneurs, volumes et cache (réponse à la note brute)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Docker]]
- Sous-sujets → (aucun)
- À comparer avec → [[DK-01-Fondamentaux|Fondamentaux Docker]]

**Pratique :**
- Extrait de code → [[04_Snippets/docker-cli-cheatsheet]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer la différence entre `docker stop` et `docker rm` ?

---

## Tâches

- [ ] #task S'entraîner à ouvrir un terminal dans un conteneur actif
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Commande pour voir l'espace disque total occupé par Docker (images + conteneurs + volumes) ?
