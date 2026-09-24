---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M10
aliases:
  - "Cache & Performance Architecturale"
tags:
  - cs/architecture/cache
parent: "[[Architecture Logicielle]]"
children: []
related_theory:
  - "[[ARCH-06-Scalabilite|Scalabilite]]"
related_snippets: []
related_projects:
  - "[[02_Projects/app-planification-sprints]]"
source: "https://en.wikipedia.org/wiki/Cache_(computing)"
---

# Cache & Performance Architecturale

> [!abstract] Introduction
> Un cache stocke temporairement le résultat d'une opération coûteuse (requête base de données, calcul long, appel API externe) pour le réutiliser immédiatement la prochaine fois qu'il est demandé, sans refaire tout le travail.

---

## Théorie

> [!question]- C'est quoi ?
> > [!note] L'idée en une phrase
> > Si calculer ou récupérer une donnée est LENT, mais que cette donnée ne change pas souvent, autant la garder "sous la main" (en cache) pour la fois suivante, plutôt que de tout refaire à chaque demande.

> [!question]- Pourquoi l'utiliser ?
> Beaucoup d'opérations coûteuses (requêtes SQL complexes, appels à une API externe lente, calculs intensifs) donnent souvent le MÊME résultat sur une courte période. Sans cache, chaque demande refait ce travail coûteux depuis zéro — un gaspillage de ressources et de temps.

> [!question]- Comment ça marche ?
> **Niveaux de cache courants, du plus proche au plus loin de l'utilisateur :**
> 1. **Cache navigateur** : le navigateur garde en mémoire des ressources déjà téléchargées (images, scripts)
> 2. **Cache CDN** : des serveurs répartis géographiquement gardent des copies de contenu statique, proches de l'utilisateur
> 3. **Cache applicatif** : l'application garde en mémoire (souvent via Redis) des résultats de calculs ou requêtes coûteuses
> 4. **Cache base de données** : la base de données elle-même garde en mémoire des résultats de requêtes fréquentes
>
> **Cache applicatif avec Redis (exemple conceptuel) :**
> ```python
> def obtenir_films_populaires():
>     resultat_cache = redis.get("films_populaires")
>     if resultat_cache:
>         return resultat_cache  # rapide : pas besoin de refaire le calcul
>
>     resultat = calcul_couteux_films_populaires()  # lent
>     redis.set("films_populaires", resultat, expiration=3600)  # garde 1h
>     return resultat
> ```
> > [!note] Ce que fait ce code
> > La première demande fait le calcul complet (lent) et le SAUVEGARDE en cache. Toutes les demandes suivantes, PENDANT l'heure qui suit, récupèrent directement le résultat déjà calculé (rapide), sans refaire le travail.
>
> **Le vrai défi : l'invalidation du cache**
>
> > [!note] "Il n'y a que deux choses difficiles en informatique : l'invalidation du cache et nommer les variables"
> > Cette phrase, célèbre chez les développeurs, souligne un vrai problème : QUAND faut-il considérer qu'une donnée en cache est PÉRIMÉE et doit être recalculée ? Trop tôt = on perd le bénéfice du cache. Trop tard = on affiche des données obsolètes à l'utilisateur.
>
> **Stratégies d'expiration courantes :**
> - **TTL (Time To Live)** : le cache expire automatiquement après une durée fixe (ex : 1 heure)
> - **Invalidation manuelle** : le code supprime explicitement l'entrée du cache dès que la donnée sous-jacente change
>
> ```python
> def modifier_film(id, nouvelles_donnees):
>     base_de_donnees.update(id, nouvelles_donnees)
>     redis.delete(f"film:{id}")  # invalide le cache pour forcer un recalcul
> ```
>
> **Pertinence pour l'app de planification de sprints :**
> > [!note] Un cas d'usage concret
> > Récupérer les issues GitLab à CHAQUE affichage de la vue Gantt peut être lent (appel API externe) et consommer inutilement le quota de requêtes de l'API GitLab. Mettre en cache les résultats pendant quelques minutes réduirait la charge, au prix d'un léger décalage possible avec l'état réel de GitLab.

> [!question]- Quand l'utiliser ?
> - Données lentes à calculer/récupérer, mais qui ne changent pas à chaque instant
> - Réduire la charge sur une API externe avec des limites de requêtes (rate limiting)
> - Améliorer la réactivité perçue par l'utilisateur sur des pages consultées fréquemment

---

## Points clés

- Un cache stocke un résultat déjà calculé pour éviter de refaire un travail coûteux
- Plusieurs niveaux de cache existent : navigateur, CDN, applicatif (Redis), base de données
- Le TTL (durée de vie automatique) est la stratégie d'expiration la plus simple
- L'invalidation manuelle du cache dès qu'une donnée change évite d'afficher des données périmées
- Un mauvais cache (mal invalidé) peut créer des bugs difficiles à diagnostiquer (données incohérentes)

---

## Paramètres / Configuration

| Niveau de cache | Ce qu'il stocke | Outil typique |
|-----------|-------------|---------|
| Navigateur | Ressources statiques (images, scripts) | Géré par le navigateur lui-même |
| CDN | Contenu statique, géographiquement réparti | Cloudflare, CloudFront |
| Applicatif | Résultats de calculs/requêtes coûteuses | Redis, Memcached |
| Base de données | Résultats de requêtes fréquentes | Cache interne du SGBD |

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Mettre en cache des données personnalisées sous une clé commune
> - Aucune stratégie d'invalidation

---

## Exemple minimal

```python
def obtenir_issues_gitlab(projet_id):
    cle = f"issues:{projet_id}"
    if cache.exists(cle):
        return cache.get(cle)

    issues = appel_api_gitlab(projet_id)  # lent, consomme le quota API
    cache.set(cle, issues, expiration=300)  # garde 5 minutes
    return issues
```

> [!note] Ce que j'en retiens
> Ce cache de 5 minutes réduit drastiquement le nombre d'appels réels à l'API GitLab pour une vue Gantt consultée régulièrement, au prix d'un léger décalage possible (jusqu'à 5 minutes) avec l'état réel des issues — un compromis souvent largement acceptable.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Cache à plusieurs niveaux : navigateur (HTTP), CDN, applicatif (Redis), BDD ; voir [[NET-06-Cookies-Cache-HTTP|Cookies et Cache HTTP]] et [[BDD-07-Redis-Cle-Valeur|Redis Cache Clé-Valeur]]

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Architecture Logicielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ARCH-06-Scalabilite|Scalabilite]], [[API GitLab]]

**Pratique :**
- Extrait de code → (aucun pour l'instant)
- Projet → [[02_Projects/app-planification-sprints]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi l'invalidation de cache est-elle difficile ?

---

## Tâches

- [ ] #task Évaluer si un cache des issues GitLab serait pertinent pour l'app de planification de sprints (fréquence de rafraîchissement acceptable)
- [ ] #task Installer Redis en local et tester un cache basique avec TTL
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Pour l'app de planification de sprints, quelle durée de cache serait un bon compromis entre fraîcheur des données et réduction des appels API GitLab ?
