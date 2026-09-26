---
created: 2026-09-26
modified: 2026-09-26
type: project
status: "🔴 Not Started"
tags:
  - projet
  - maquette
aliases:
  - "Maquette Portfolio"
parent: "[[02_Projects/Portfolio|Portfolio]]"
---

# 🎨 Maquette du Portfolio

> [!abstract] À quoi sert cette note
> La maquette validée du [[02_Projects/Portfolio|Portfolio]] : 5 pages en thème sombre, et leur découpage en **vues** et **composants Vue**. On la suit pendant le développement, page par page.

> [!tip] Voir la maquette cliquable
> Ouvre `02_Projects/Portfolio-Maquette/site/index.html` dans un navigateur (depuis l'explorateur de fichiers, pas depuis Obsidian). Filtres, recherche, validation du formulaire, menu mobile et thème fonctionnent. La case **« Afficher les composants Vue »** (en bas à droite) encadre chaque composant avec son nom.

---

## Positionnement

- **Accroche** : « Je conçois des applications web sécurisées, performantes et maintenables. »
- **Profil** : développeur full stack TypeScript (Angular, Vue, NestJS, PostgreSQL).
- **Principe** : les projets sont au centre, et chaque projet a son **étude de cas**.
- Pas de section « parcours d'apprentissage », pas de projets « prévus » affichés : on ne publie que ce qui est terminé.
- Thème **sombre par défaut** (bouton ☀️ pour passer en clair), photo de profil dans le hero.

---

## Pages et routes

| Route | Vue | Contenu |
|---|---|---|
| `/` | `AccueilView.vue` | Hero + photo, Ce que je fais, Projets à la une, Expérience, Stack, bandeau contact |
| `/projets` | `ProjetsView.vue` | Filtres par techno, recherche, tri, compteur, grille, état vide |
| `/projets/:slug` | `ProjetDetailView.vue` | Étude de cas : contexte, fonctionnalités, architecture, choix techniques, difficultés, sécurité, résultats, ce que j'en retiens, captures |
| `/contact` | `ContactView.vue` | Formulaire validé + cartes de contact + CV |
| `/:pathMatch(.*)*` | `NotFoundView.vue` | Page 404 |

---

## Accueil

![[maquette-index-desktop.png]]

**Composants :** `HeroSection` (`LiensSociaux`, `PhotoProfil`) · `ServicesSection` (`ServiceCard` ×4) · `ProjetsMisEnAvant` (`FiltreTechnos`, `ProjetGrid`, `ProjetCard`, `ProjetCapture`, `BadgesQualite`) · `ExperienceSection` (`PosteCard`) · `StackTechnos` · `ContactCta`

Version mobile :

![[maquette-index-mobile.png|300]]

## Projets

![[maquette-projets-desktop.png]]

**Composants :** `FiltreTechnos` · `RechercheProjets` · `ProjetGrid` / `ProjetCard` (réutilisés de l'accueil) · `EtatVide`

## Étude de cas

![[maquette-projet-cinetrack-desktop.png]]

**Composants :** `ProjetEntete` · `ProjetCapture` · `EtudeDeCas` · `SchemaArchitecture` · `Metriques` · `FicheProjet` · `Sommaire` · `NavProjets`

## Contact

![[maquette-contact-desktop.png]]

**Composants :** `ContactForm` (VeeValidate + Zod) · `ContactInfos`

## 404

![[maquette-404-desktop.png]]

---

## Arborescence cible

Suit le [[VUE-22-Template-Architecture-Vue|template d'architecture Vue]].

```text
src/
├── core/
│   └── layout/            AppHeader.vue, AppFooter.vue, useTheme.ts
├── shared/
│   └── ui/                BadgesQualite.vue, EtatVide.vue, LiensSociaux.vue
├── features/
│   ├── projets/
│   │   ├── data-access/   projet.model.ts, projets.data.ts, useProjets.ts (filtre + recherche + tri)
│   │   ├── ui/            ProjetCard, ProjetCapture, ProjetGrid, FiltreTechnos, RechercheProjets,
│   │   │                  ProjetEntete, EtudeDeCas, SchemaArchitecture, Metriques, FicheProjet, Sommaire, NavProjets
│   │   └── views/         ProjetsView.vue, ProjetDetailView.vue
│   ├── accueil/
│   │   ├── ui/            HeroSection, PhotoProfil, ServicesSection, ServiceCard, ExperienceSection,
│   │   │                  PosteCard, StackTechnos, ContactCta
│   │   └── views/         AccueilView.vue
│   └── contact/
│       ├── data-access/   contact.schema.ts (Zod), useEnvoiContact.ts
│       ├── ui/            ContactForm.vue, ContactInfos.vue
│       └── views/         ContactView.vue
└── router/                index.ts (routes ci-dessus, titre de page par route)
```

> [!note] Une seule source de données
> Les projets vivent dans `projets.data.ts` (`Projet[]` typé) : les cartes, la page Projets, l'étude de cas et les compteurs de la Stack sont tous calculés à partir de ce tableau.

---

## Tâches

- [ ] #task Layout : `AppHeader` (menu + menu mobile + thème) et `AppFooter`
- [ ] #task `interface Projet` + `projets.data.ts` (slug, titre, catégorie, problème, technos, badges, liens, étude de cas)
- [ ] #task Accueil : hero avec ma vraie photo, Ce que je fais, Expérience, Stack
- [ ] #task `ProjetCard` + `ProjetGrid` + `FiltreTechnos` (props typées, emit `update:modelValue`)
- [ ] #task Page Projets : composable `useProjets()` (filtre + recherche + tri en `computed`), état vide
- [ ] #task Étude de cas : route `/projets/:slug`, projet introuvable → 404
- [ ] #task Contact : VeeValidate + Zod, message de succès, gestion d'erreur d'envoi
- [ ] #task Page 404 + titre de page par route
- [ ] #task Mode clair / sombre persisté (`useDark` de VueUse)
- [ ] #task Remplacer les contenus d'exemple (voir ci-dessous)

> [!warning] Contenus d'exemple à remplacer
> Nom, photo, e-mail, ville, entreprise et dates, liens GitLab/GitHub/LinkedIn, CV. **Les chiffres des badges et des résultats** (tests, Lighthouse, durée) sont inventés : mettre les vrais une fois chaque projet terminé, et n'afficher un projet qu'une fois son étude de cas rédigée.
