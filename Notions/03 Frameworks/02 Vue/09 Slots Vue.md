---
type: notion
statut: a apprendre
resume: "Un slot est un trou laissé dans un composant, que le parent remplit avec le contenu de son choix."
revu:
sources:
  - "https://vuejs.org/guide/components/slots.html"
---
# Slots Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **slot** est un **trou** laissé dans un composant, que le parent remplit avec le contenu de son choix.

## Le problème

**Pourquoi c'est utile ?**
Pour faire des composants « cadres » que le parent remplit avec son contenu.

**Qu'est-ce qui se passait sans ça ?**
Il fallait une prop pour chaque variante de contenu, et le composant devenait ingérable.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Parfait pour les composants « cadres » : une carte, une fenêtre modale, une mise en page. Le composant fournit le cadre, le parent fournit l'intérieur.

### Le slot simple

```vue
<!-- BaseCard.vue : le cadre -->
<template>
  <article class="card">
    <slot />            <!-- ici viendra le contenu du parent -->
  </article>
</template>
```

```vue
<!-- utilisation -->
<BaseCard>
  <h3>Sécurité</h3>
  <p>Authentification JWT, contrôle des accès…</p>
</BaseCard>
```

Image : un **cadre photo**. Le cadre est toujours le même, tu choisis la photo.

### Le slot qui donne des données au parent (scoped slot)

Le composant boucle sur une liste, mais laisse le parent décider **comment afficher chaque élément** :

```vue
<!-- BaseList.vue -->
<script setup lang="ts" generic="T">
defineProps<{ items: T[] }>();
</script>

<template>
  <ul>
    <li v-for="(item, i) in items" :key="i">
      <slot :item="item" />      <!-- on passe l'élément au parent -->
    </li>
  </ul>
</template>
```

```vue
<BaseList :items="projects">
  <template #default="{ item }">
    <strong>{{ item.title }}</strong> — {{ item.techs.join(', ') }}
  </template>
</BaseList>
```

C'est le fonctionnement des colonnes du `DataTable` de PrimeVue.

### Quand utiliser des slots ou des props ?

| Le parent veut passer… | Utilise |
|---|---|
| une **donnée** (un titre, un nombre) | une prop |
| du **HTML** ou d'autres composants | un slot |

## 🧪 Exemple

### Plusieurs trous : les slots nommés

```vue
<!-- BaseModal.vue -->
<template>
  <div class="modal">
    <header><slot name="title" /></header>
    <div class="body"><slot /></div>
    <footer><slot name="actions">
      <button type="button">Fermer</button>   <!-- contenu par défaut -->
    </slot></footer>
  </div>
</template>
```

```vue
<BaseModal>
  <template #title>Supprimer le projet ?</template>
  Cette action est définitive.
  <template #actions>
    <button type="button">Annuler</button>
    <button type="button" class="danger">Supprimer</button>
  </template>
</BaseModal>
```

`#title` est le raccourci de `v-slot:title`.

## ⚠️ Limites et pièges

- **Un composant avec 15 props** pour tout personnaliser (`titleColor`, `showIcon`…) : un slot est souvent plus simple.
- **Oublier `<template #nom>`** pour un slot nommé : le contenu part dans le slot par défaut.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Vue|Fondamentaux Vue]]
- **Voir aussi :** [[03 Composants et SFC Vue|Composants et SFC Vue]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vuejs.org/guide/components/slots.html
