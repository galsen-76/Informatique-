---
created: 2026-09-16
modified: 2026-09-16
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M05
aliases:
  - "Déploiement & Build Angular"
tags:
  - frameworks/angular/deploiement
parent: "[[Angular]]"
children:
  - "[[ANG-26-SSR-Hydratation|Angular Universal SSR]]"
related_theory: []
related_snippets:
  - "[[04_Snippets/angular-build-prod]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://angular.dev/guide/build"
---

# Déploiement & Build Angular

> [!abstract] Introduction
> Le build transforme le code source en fichiers optimisés prêts pour la production ; le déploiement les met en ligne.

> [!warning]- Prérequis
> [[ANG-15-Performance-Bonnes-Pratiques|Performance et Bonnes Pratiques Angular]].

---

## Théorie

> [!question]- C'est quoi ?
> ```bash
> ng build   # génère /dist, optimisé
> ```
> `environment.ts` / `environment.prod.ts` définissent des valeurs différentes selon le contexte.

> [!example]- Analogie
> `ng serve` est un brouillon annoté (facile à corriger, pas soigné). `ng build` est la version imprimée finale, propre et compacte, prête à être distribuée.

> [!question]- Pourquoi l'utiliser ?
> Le code source n'est pas optimisé pour la production — le build réduit la taille, retire le code inutile, accélère le chargement.

> [!question]- Comment ça marche ?
> ```typescript
> import { environment } from '../environments/environment';
> private apiUrl = environment.apiUrl;
> ```
> Angular remplace automatiquement le bon fichier `environment` selon le contexte de build.

> [!question]- Quand l'utiliser ?
> `ng build` avant chaque mise en ligne ; Angular SSR (`@angular/ssr`, ex-Angular Universal) pour un besoin de SEO ou de premier affichage très rapide.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Déployer directement le code source (`ng serve`) en production expose du code non optimisé et parfois des informations de debug — toujours déployer le résultat de `ng build`.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| SSR (Server-Side Rendering) | Le serveur génère le HTML complet avant envoi, plutôt que le navigateur |
| `environment.ts` | Fichier de configuration selon le contexte (dev/prod) |

---

## Points clés

- `ng serve` = développement, `ng build` = production optimisée dans `/dist`
- Les fichiers `environment` permettent des configs différentes selon le contexte
- Le SSR améliore le premier chargement et le SEO, au prix de complexité

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Écrire une URL d'API en dur dans le code au lieu d'utiliser `environment.apiUrl`
> - Déployer le résultat de `ng serve` au lieu de `ng build`
> - Depuis Angular 15, `ng new` ne crée plus les fichiers `environment` : les générer avec `ng generate environments`, qui configure les `fileReplacements` dans `angular.json`
> - Le dossier de sortie des versions récentes est `dist/<projet>/browser` (important pour Nginx/Docker)
> - Rebuilder une image par environnement : préférer une configuration runtime (`config.json` chargé au démarrage) pour déployer la même image partout (voir [[CLOUD-02-Heberger-Front|Héberger un Front]])

---

## Paramètres / Configuration

| Commande/Fichier | Description |
|-----------|-------------|
| `ng serve` | Dev, non optimisé |
| `ng build` | Production, génère `/dist` |
| `environment.ts` | Config dev |
| `environment.prod.ts` | Config prod |

---

## Exemple minimal

```bash
ng serve    # utilise environment.ts
ng build    # utilise environment.prod.ts
```

> [!note] Ce que j'en retiens
> Le code du service ne change jamais — Angular remplace automatiquement le bon fichier `environment`.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Voir [[ANG-26-SSR-Hydratation|SSR et Hydratation Angular]] et [[CICD-02-Pipeline-Full-Stack|Pipeline CI/CD Full Stack]]

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Angular]]
- Sous-sujets → [[ANG-26-SSR-Hydratation|Angular Universal SSR]]
- À comparer avec → [[ANG-15-Performance-Bonnes-Pratiques|Performance et Bonnes Pratiques Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/angular-build-prod]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> Pourrais-je expliquer pourquoi déployer `ng serve` en production serait une erreur ?

> [!faq]- Questions d'entretien
> - Comment gérez-vous la configuration par environnement d'une application Angular ?

---

## Tâches

- [ ] #task Configurer les fichiers `environment` de CinéTrack
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ? Où héberger concrètement le dossier `/dist` généré ?
