---
type: notion
statut: a apprendre
resume: "Un test est un petit programme qui vérifie que ton code fait ce qu'il doit, automatiquement, à chaque modification."
revu:
sources:
  - "https://test-utils.vuejs.org/guide/"
---
# Tests Vue avec Vitest

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un test est un petit programme qui vérifie que ton code fait ce qu'il doit, **automatiquement**, à chaque modification.

## Le problème

**Pourquoi c'est utile ?**
Pour vérifier automatiquement les fonctions et composants Vue.

**Qu'est-ce qui se passait sans ça ?**
On cliquait partout à la main après chaque modification.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

En Vue, on utilise **Vitest** (déjà installé par `npm create vue@latest`). On commence par tester les **fonctions** et les **composables**, puis quelques **composants**.

### Lancer les tests

```bash
npm run test:unit          # lance Vitest en mode surveillance
npx vitest run             # une seule fois (pour la CI)
```

Les fichiers de test s'appellent `xxx.spec.ts` et sont posés **à côté** du fichier testé.

### 1. Tester une fonction (le plus simple, le plus utile)

```ts
// project.filters.ts
export const filterProjects = (projects: Project[], tech: Tech | null, search: string) =>
  projects.filter(p =>
    (!tech || p.techs.includes(tech)) &&
    p.title.toLowerCase().includes(search.toLowerCase()),
  );
```

```ts
// project.filters.spec.ts
import { describe, it, expect } from 'vitest';
import { filterProjects } from './project.filters';

const projects = [
  { slug: 'a', title: 'Portfolio', techs: ['vue'] },
  { slug: 'b', title: 'CinéTrack', techs: ['angular'] },
] as Project[];

describe('filterProjects', () => {
  it('garde tout sans filtre', () => {
    expect(filterProjects(projects, null, '')).toHaveLength(2);
  });

  it('filtre par techno', () => {
    expect(filterProjects(projects, 'vue', '')).toEqual([projects[0]]);
  });

  it('cherche sans tenir compte des majuscules', () => {
    expect(filterProjects(projects, null, 'CINÉ')).toHaveLength(1);
  });
});
```

Structure d'un test : **préparer** les données → **agir** (appeler la fonction) → **vérifier** (`expect`).

### 2. Tester un composable

```ts
it('useProjectFilters réagit au changement de techno', () => {
  const list = ref(projects);
  const { tech, filtered } = useProjectFilters(list);
  tech.value = 'angular';
  expect(filtered.value).toHaveLength(1);
});
```

### 3. Tester un composant

```ts
import { mount } from '@vue/test-utils';

it('ProjectCard affiche le titre et émet open', async () => {
  const wrapper = mount(ProjectCard, { props: { project: projects[0] } });

  expect(wrapper.text()).toContain('Portfolio');

  await wrapper.get('button').trigger('click');
  expect(wrapper.emitted('open')?.[0]).toEqual(['a']);
});
```

### Quoi tester en priorité

| Priorité | Quoi |
|---|---|
| ⭐⭐⭐ | fonctions de calcul, filtres, mappers, composables |
| ⭐⭐ | composants avec de la logique (formulaire, filtre) |
| ⭐ | composants qui ne font qu'afficher |
| E2E | le parcours principal (voir Playwright) |

Objectif du Portfolio : **15 tests** qui passent dans le pipeline.

## 🧪 Exemple

### Simuler une API

```ts
import { vi } from 'vitest';

vi.spyOn(githubApi, 'lastRepos').mockResolvedValue([{ name: 'portfolio' } as Repo]);
```

Voir [[03 Mocks et stubs|Mocks]].

## ⚠️ Limites et pièges

- **Tester les détails internes** (le nom d'une variable) : le test casse au moindre refactoring. Teste ce que l'utilisateur voit et ce que la fonction renvoie.
- **Oublier `await`** après `trigger` : la vérification a lieu avant la mise à jour.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Vue|Fondamentaux Vue]]
- **Voir aussi :** [[02 Tests unitaires|Tests unitaires]], [[01 Pyramide des tests|Pyramide des tests]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://test-utils.vuejs.org/guide/
