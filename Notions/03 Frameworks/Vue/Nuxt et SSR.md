---
type: notion
statut: a apprendre
resume: "Nuxt est une surcouche de Vue qui ajoute le rendu côté serveur (SSR) : la page arrive déjà remplie dans le navigateur, ce qui est meilleur pour Google et pour la vitesse d'affichage."
revu:
sources:
  - "https://nuxt.com/docs/getting-started/introduction"
---
# Nuxt et SSR

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : **Nuxt** est une surcouche de Vue qui ajoute le rendu **côté serveur** (SSR) : la page arrive déjà remplie dans le navigateur, ce qui est meilleur pour Google et pour la vitesse d'affichage.

## Le problème

**Pourquoi c'est utile ?**
Pour envoyer des pages Vue déjà remplies par le serveur : plus rapides et mieux référencées.

**Qu'est-ce qui se passait sans ça ?**
Avec une application Vue classique, Google et l'utilisateur recevaient d'abord une page vide.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Il ajoute aussi des pages créées automatiquement à partir des fichiers. À connaître, pas à maîtriser tout de suite : ton Portfolio fonctionne très bien sans.

### Rendu côté client ou côté serveur

| | Vue classique (SPA) | Nuxt (SSR / SSG) |
|---|---|---|
| Le serveur envoie | une page vide + du JavaScript | une page **déjà remplie** |
| Premier affichage | après le chargement du JS | immédiat |
| Référencement Google | correct | excellent |
| Hébergement | fichiers statiques (simple) | serveur Node, ou fichiers statiques en SSG |

- **SSR** (*Server-Side Rendering*) : le serveur construit la page à chaque visite.
- **SSG** (*Static Site Generation*) : les pages sont construites **une fois**, au build. Idéal pour un site vitrine.

### Quand choisir Nuxt ?

- **Oui** : site public qui doit être bien référencé (blog, vitrine, e-commerce).
- **Non nécessaire** : application derrière une connexion (tableau de bord, outil interne), ou le Portfolio en version simple.

Pour ton Portfolio, tu peux envisager une version Nuxt **plus tard**, comme exercice, une fois la version Vue terminée.

## 🧪 Exemple

### Ce que Nuxt change

```text
pages/
├── index.vue            → /
├── projects/
│   ├── index.vue        → /projects
│   └── [slug].vue       → /projects/:slug
└── contact.vue          → /contact
```

- **Les routes viennent des fichiers** : plus de `router/index.ts`.
- **Imports automatiques** : `ref`, `computed` et tes composants s'utilisent sans `import`.
- **Chargement de données côté serveur** : `const { data } = await useFetch('/api/projects')`.
- **SEO facile** : `useHead({ title: 'Projets' })`.

## ⚠️ Limites et pièges

- **`window` ou `localStorage` dans le code exécuté côté serveur** : ils n'existent pas. À utiliser seulement dans `onMounted` ou avec `import.meta.client`.
- **L'équivalent Angular** existe aussi : [[SSR et hydratation Angular|Angular SSR]].

## 🔗 Liens

- **Prérequis :** [[Fondamentaux Vue]]
- **Voir aussi :** [[Vue Router]], [[Appels API Vue]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://nuxt.com/docs/getting-started/introduction
