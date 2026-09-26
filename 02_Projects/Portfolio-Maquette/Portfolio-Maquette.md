---
created: 2026-09-26
modified: 2026-09-26
type: project
status: "🔴 Not Started"
tags:
  - projet
  - maquette
  - design
aliases:
  - "Maquette Portfolio"
parent: "[[02_Projects/Portfolio|Portfolio]]"
---

# 🎨 Maquette du Portfolio

> [!abstract] À quoi sert cette note
> La maquette validée du [[02_Projects/Portfolio|Portfolio]] : les 5 pages et **toute la charte graphique** (couleurs, typographie, espacements, rayons, ombres, éléments) pour refaire l'interface à l'identique.

> [!tip] Voir la maquette cliquable
> Ouvre `02_Projects/Portfolio-Maquette/site/index.html` dans un navigateur (depuis l'explorateur de fichiers, pas depuis Obsidian). La charte est aussi visible dans `site/charte.html`, et toutes les valeurs sont dans `site/styles.css`.

---

## Positionnement

- **Accroche** : « Je conçois des applications web sécurisées, performantes et maintenables. »
- **Profil** : développeur full stack TypeScript (Angular, Vue, NestJS, PostgreSQL).
- **Principe** : les projets sont au centre, et chaque projet a son **étude de cas**.
- On ne publie que ce qui est terminé : pas de projets « prévus », pas de parcours d'apprentissage.
- **Ambiance** : sombre, sobre, technique. Une seule couleur forte (émeraude), l'indigo en touche secondaire.

---

## Pages

| Route | Page | Contenu |
|---|---|---|
| `/` | Accueil | Hero + photo, Ce que je fais, Projets à la une, Expérience, Stack, bandeau contact |
| `/projets` | Projets | Filtres par techno, recherche, tri, compteur, grille, message « aucun résultat » |
| `/projets/:slug` | Étude de cas | Contexte, fonctionnalités, architecture, choix techniques, difficultés, sécurité, résultats, ce que j'en retiens, captures |
| `/contact` | Contact | Formulaire validé + moyens de contact + CV |
| `/:pathMatch(.*)*` | 404 | Page introuvable |

### Accueil
![[maquette-index-desktop.png]]

Version mobile :

![[maquette-index-mobile.png|300]]

### Projets
![[maquette-projets-desktop.png]]

### Étude de cas
![[maquette-projet-cinetrack-desktop.png]]

### Contact
![[maquette-contact-desktop.png]]

### 404
![[maquette-404-desktop.png]]

---

## 🎨 Charte graphique

![[maquette-charte-graphique.png]]

### Couleurs — thème sombre (par défaut)

| Rôle | Couleur | Utilisation |
|---|---|---|
| Fond | `#05080F` | Fond de page (presque noir, légèrement bleuté) |
| Surface | `#0C111C` | Cartes, champs, en-tête, boutons secondaires |
| Bordure | `#1A2232` | Contours de 1px des cartes, champs, séparateurs |
| Texte | `#E5E7EB` | Titres et texte principal |
| Texte secondaire | `#8B98AD` | Descriptions, légendes, liens du menu |
| **Primaire** | `#10B981` | Boutons principaux, mots mis en valeur, puces, badges, focus |
| Primaire survol | `#34D399` | Survol du bouton principal |
| Primaire texte | `#6EE7B7` | Texte vert sur fond sombre (pastille, liens « Voir tout ») |
| Primaire léger | `#10B981` à 14 % d'opacité | Fonds des icônes, pastille, menu actif, étiquettes « pro » |
| Texte sur primaire | `#05080F` | Texte des boutons verts (pas de blanc : contraste insuffisant) |
| **Accent** | `#6366F1` | Fin des dégradés, touche indigo |

### Couleurs — thème clair

| Rôle | Couleur |
|---|---|
| Fond | `#F8FAFC` |
| Surface | `#FFFFFF` |
| Bordure | `#E2E8F0` |
| Texte | `#0F172A` |
| Texte secondaire | `#64748B` |
| Primaire léger | `#D1FAE5` |
| Primaire, accent | identiques au thème sombre |

### Couleurs d'état

| État | Couleur | Fond (thème sombre) |
|---|---|---|
| Succès | `#10B981` | `#10B981` à 14 % |
| Attention / en cours | `#FBBF24` | `#F59E0B` à 15 % |
| Erreur | `#F87171` | bordure du champ en `#F87171` |
| Info | `#A5B4FC` | `#6366F1` à 18 % |
| Étiquette des badges | `#334155` | — |

### Dégradés et effets

| Nom | Valeur |
|---|---|
| Dégradé principal (bandeau contact, cadre photo, « 404 ») | `linear-gradient(135deg, #10B981, #6366F1)` |
| Halo de fond de page | `radial-gradient(900px 500px at 80% -10%, rgba(16,185,129,.10), transparent 60%)` + `radial-gradient(700px 400px at 0% 20%, rgba(99,102,241,.08), transparent 60%)` |
| Barre de progression | `linear-gradient(90deg, #F59E0B, #10B981)` |
| En-tête | surface à 85 % d'opacité + `backdrop-filter: blur(8px)`, reste collé en haut |
| Lueur de la photo | `box-shadow: 0 20px 60px rgba(16,185,129,.18)` |
| Point « disponible » | point vert 8px + halo `0 0 0 4px rgba(16,185,129,.2)` |

Fonds des captures de projets (dégradé 135°, thème sombre) : vert `#064E3B → #065F46`, indigo `#1E1B4B → #312E81`, rouge `#450A0A → #7F1D1D`, ambre `#451A03 → #78350F`, cyan `#083344 → #155E75`, violet `#2E1065 → #4C1D95`.

### Contrastes vérifiés (WCAG)

| Texte / fond | Ratio | Niveau |
|---|---|---|
| Texte `#E5E7EB` sur fond | 16,2 | AAA |
| Texte secondaire `#8B98AD` sur surface | 6,5 | AA |
| Primaire `#10B981` sur fond | 7,9 | AAA |
| `#05080F` sur bouton primaire | 7,9 | AAA |
| Erreur `#F87171` sur surface | 6,8 | AA |
| ⚠️ Blanc sur `#10B981` | 2,5 | **refusé** → d'où le texte sombre sur les boutons verts |

### Typographie

- **Police** : **Inter** (`npm i @fontsource-variable/inter`), repli `system-ui, -apple-system, "Segoe UI", sans-serif`.
- **Code** : `ui-monospace, SFMono-Regular, monospace`.

| Style | Taille | Graisse | Interligne | Espacement |
|---|---|---|---|---|
| H1 accueil | `clamp(2.2rem, 5vw, 3.4rem)` (35 → 54px) | 700 | 1.08 | -0.03em |
| H1 pages internes | `clamp(2rem, 4vw, 2.8rem)` | 700 | 1.08 | -0.03em |
| H2 section | 1.6rem (26px) | 700 | 1.3 | -0.02em |
| H3 carte | 1.05rem (17px) | 700 | 1.3 | — |
| Chapô | 1.15rem (18px) | 400, texte secondaire | 1.55 | — |
| Texte | 16px | 400 | 1.55 | — |
| Petit texte | 14.5px | 400 | 1.55 | — |
| Surtitre de carte | 12px | 600, MAJUSCULES | — | 0.06em |
| Étiquettes | 12.5px | 500 | — | — |
| Code | 13px | 400, mono | 1.7 | — |

Le mot clé du titre principal est en **primaire** (`<em>` sans italique).

### Mise en page

| Élément | Valeur |
|---|---|
| Largeur max du contenu | **1100px**, centré |
| Marges latérales | 20px |
| Hauteur de l'en-tête | 64px |
| Espacement vertical des sections | 44px en haut et en bas |
| Hero | 64px en haut, 40px en bas, grille `1.4fr 1fr`, écart 48px |
| Grilles de cartes | 3 colonnes (projets), 4 colonnes (Ce que je fais), écart 16-18px |
| Étude de cas | contenu + colonne latérale de **300px** (collante), écart 40px |
| Contact | formulaire `1.4fr` + infos `1fr`, écart 24px |
| Rythme interne des cartes | padding 20px (18px pour le corps des cartes projet), écart 10px |

**Points de rupture :**
- **≤ 900px** : tout passe sur 1 colonne (hero, projets, étude de cas, contact) ; menu remplacé par un bouton ☰ ; « Ce que je fais » sur 2 colonnes.
- **≤ 520px** : « Ce que je fais » sur 1 colonne.

### Rayons et ombres

| Élément | Rayon |
|---|---|
| Statuts, étiquettes de badge | 6px |
| Liens du menu | 8px |
| Boutons, champs, icônes | 10px |
| Cartes | **14px** |
| Grande capture, bandeau contact | 20px |
| Cadre de la photo | 32px |
| Pastilles, filtres, étiquettes | 999px (pilule) |

| Ombre | Valeur |
|---|---|
| Thème sombre | `0 1px 2px rgba(0,0,0,.5), 0 8px 24px rgba(0,0,0,.35)` |
| Thème clair | `0 1px 2px rgba(15,23,42,.06), 0 4px 16px rgba(15,23,42,.06)` |

### Éléments

| Élément | Style |
|---|---|
| Bouton principal | fond primaire, texte `#05080F`, 600, padding `11px 18px`, rayon 10px ; survol `#34D399` |
| Bouton secondaire | fond surface, bordure 1px, texte principal |
| Bouton icône | 38 × 38px, bordure 1px, rayon 10px |
| Pastille | pilule, fond primaire léger, texte primaire 13px 600, point de 8px |
| Filtre | pilule, bordure 1px ; **actif** : fond = couleur du texte, texte = couleur de la surface (inversé) |
| Étiquette (techno) | pilule, 12.5px, bordure 1px, fond = fond de page |
| Badge qualité | style « shields.io » : libellé `#334155` + valeur sur fond primaire, police mono 11.5px |
| Carte | surface, bordure 1px, rayon 14px, ombre, padding 20px ; au survol, bordure primaire |
| Icône de carte | 42 × 42px, rayon 11px, fond primaire léger, emoji ou icône Lucide 20px |
| Champ | surface, bordure 1px, rayon 10px, padding `10px 12px` ; focus : contour primaire 2px ; erreur : bordure et message `#F87171` 13px |
| Bloc de code | fond `#0F172A`, bordure `#1E293B`, rayon 14px ; mots clés `#A5B4FC`, types `#6EE7B7`, chaînes `#FCD34D`, commentaires `#64748B` |
| Fausse capture | fenêtre avec barre de 3 points, posée sur un dégradé coloré |

### Icônes et images

- **Icônes** : Lucide (`lucide-vue-next`), trait de 2px, taille 18-20px — ou PrimeIcons.
- **Photo** : carrée, au moins 680 × 680px, fond neutre, visage centré ; cadre dégradé de 3px, rayon 32px.
- **Captures de projets** : format 16:10, en thème sombre, exportées en WebP.

### Variables CSS à copier

```css
:root {
  --fond: #f8fafc; --surface: #ffffff; --texte: #0f172a; --texte-doux: #64748b;
  --bord: #e2e8f0; --primaire: #10b981; --primaire-survol: #34d399; --primaire-clair: #d1fae5;
  --sur-primaire: #05080f; --accent: #6366f1;
  --rayon: 14px; --ombre: 0 1px 2px rgba(15,23,42,.06), 0 4px 16px rgba(15,23,42,.06);
}
[data-theme="dark"] {
  --fond: #05080f; --surface: #0c111c; --texte: #e5e7eb; --texte-doux: #8b98ad;
  --bord: #1a2232; --primaire-clair: rgba(16,185,129,.14);
  --ombre: 0 1px 2px rgba(0,0,0,.5), 0 8px 24px rgba(0,0,0,.35);
}
```

### Avec PrimeVue

Thème **Aura** avec la couleur primaire **emerald** (c'est exactement `#10B981` en nuance 500) et le mode sombre piloté par une classe :

```ts
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

const Portfolio = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{emerald.50}', 100: '{emerald.100}', 200: '{emerald.200}', 300: '{emerald.300}', 400: '{emerald.400}',
      500: '{emerald.500}', 600: '{emerald.600}', 700: '{emerald.700}', 800: '{emerald.800}', 900: '{emerald.900}', 950: '{emerald.950}',
    },
  },
});

app.use(PrimeVue, { theme: { preset: Portfolio, options: { darkModeSelector: '[data-theme="dark"]' } } });
```

Voir [[UI-Librairies-Interfaces-Rapides|Librairies UI pour interfaces rapides]].

---

## Tâches

- [ ] #task Installer Inter et poser les variables CSS de la charte (thèmes sombre et clair)
- [ ] #task Configurer PrimeVue (preset Aura emerald, mode sombre sur `[data-theme="dark"]`)
- [ ] #task En-tête (menu, menu mobile, bouton de thème) et pied de page
- [ ] #task Modèle `Projet` typé + fichier de données unique (cartes, page Projets, étude de cas et Stack en dépendent)
- [ ] #task Page Accueil avec ma vraie photo
- [ ] #task Page Projets : filtre + recherche + tri en `computed`, message « aucun résultat »
- [ ] #task Étude de cas : route `/projets/:slug`, projet introuvable → 404
- [ ] #task Contact : VeeValidate + Zod, message de succès, gestion d'erreur d'envoi
- [ ] #task Page 404 + titre de page par route
- [ ] #task Thème clair / sombre persisté (`useDark` de VueUse)
- [ ] #task Vérifier les contrastes et la navigation au clavier (Lighthouse accessibilité ≥ 95)
- [ ] #task Remplacer les contenus d'exemple (voir ci-dessous)

> [!warning] Contenus d'exemple à remplacer
> Nom, photo, e-mail, ville, entreprise et dates, liens GitLab/GitHub/LinkedIn, CV. **Les chiffres des badges et des résultats** (tests, Lighthouse, durée) sont inventés : mettre les vrais une fois chaque projet terminé, et n'afficher un projet qu'une fois son étude de cas rédigée.
