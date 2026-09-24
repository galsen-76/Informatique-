---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M11
tags:
  - infra/linux-permissions
aliases:
  - "Permissions Processus et Services Linux"
parent: "[[Infrastructure]]"
children: []
related_theory:
  - "[[LNX-01-Linux-Essentiels|Linux Essentiels]]"
  - "[[DK-02-Dockerfile|Dockerfile]]"
related_snippets:
  - "[[04_Snippets/lnx-02-permissions-processus-services]]"
related_projects: []
source: "https://linuxjourney.com/lesson/file-permissions"
---

# Permissions Processus et Services Linux

> [!abstract] Introduction
> Les permissions (lecture/écriture/exécution par propriétaire, groupe, autres), les processus et les services systemd expliquent la majorité des erreurs « Permission denied » et « ça tourne plus après redémarrage ».

> [!warning]- Prérequis
> [[LNX-01-Linux-Essentiels|Linux Essentiels]]

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> ls -l script.sh      # -rwxr-x--- 1 deploy www-data ...
> chmod 750 script.sh  # rwx r-x ---
> chmod +x script.sh
> chown deploy:www-data fichier
> ps aux | grep node
> kill <pid>; kill -9 <pid>
> systemctl status|start|stop|restart|enable nginx
> ```
> Lecture `rwx` : r=4, w=2, x=1 → 7 = rwx, 5 = r-x, 4 = r--.

> [!example]- Analogie
> Chaque fichier a trois serrures : une pour le propriétaire, une pour son équipe (groupe), une pour tous les autres ; chacune autorise lire, modifier ou exécuter.

> [!question]- Pourquoi l'utiliser ?
> Sécurité (moindre privilège), Dockerfiles avec utilisateur non root, scripts de déploiement, services qui redémarrent automatiquement.

> [!question]- Comment ça marche ?
> - Ne jamais faire tourner une application en root → utilisateur dédié (`USER node` dans le Dockerfile)
> - Service systemd : fichier `.service` avec `Restart=always`
> - Signaux : `SIGTERM` (arrêt propre, que Node/Nest doivent gérer), `SIGKILL` (brutal)

> [!question]- Quand l'utiliser ?
> Déploiement sur VM, écriture de Dockerfiles, scripts.

> [!danger]- Quand NE PAS l'utiliser / Limites
> `chmod 777` « pour que ça marche » ouvre tout à tout le monde : à proscrire.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Propriétaire / groupe / autres | Trois catégories d'utilisateurs |
| PID | Identifiant de processus |
| Signal | Message envoyé à un processus |
| Service | Processus géré par systemd |

---

## Points clés

- Jamais root pour une application
- Pas de 777
- Gérer SIGTERM pour un arrêt propre (conteneurs)

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Conteneur Node qui ignore SIGTERM → arrêt lent et requêtes coupées

---

## Exemple minimal

```typescript
// NestJS : fermer proprement BDD et connexions à l'arrêt du conteneur
app.enableShutdownHooks();
```

> [!note] Ce que j'en retiens
> Un arrêt propre = zéro requête perdue lors d'un déploiement.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Durcir un serveur (utilisateurs, sudoers, SELinux/AppArmor)

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Infrastructure]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/lnx-02-permissions-processus-services]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Que signifie `chmod 640` ?

---

## Tâches

- [ ] #task Ajouter un utilisateur non root dans les Dockerfiles de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
