---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M06
tags:
  - frameworks/vue/formulaires
aliases:
  - "Formulaires et Validation Vue.js"
parent: "[[Vue]]"
children: []
related_theory:
  - "[[VUE-04-Directives-Templates|Directives & Templates Vue.js]]"
  - "[[TS-19-Validation-Runtime-Zod|Validation runtime avec Zod]]"
related_snippets:
  - "[[04_Snippets/vue-14-formulaires-validation]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vee-validate.logaretm.com/v4/"
---

# Formulaires et Validation Vue.js

> [!abstract] Introduction
> En Vue, les formulaires reposent sur `v-model` ; la validation se fait à la main pour les cas simples ou avec une librairie (VeeValidate + Zod/Yup) pour les formulaires métier.

> [!warning]- Prérequis
> [[VUE-04-Directives-Templates|Directives & Templates Vue.js]], [[HTML-02-Formulaires|Formulaires HTML]]

---

## Théorie

> [!question]- C'est quoi ?
> ```vue
> <script setup lang="ts">
> const form = reactive({ titre: '', annee: 2024 });
> const erreurs = computed(() => ({
>   titre: form.titre.trim().length < 2 ? 'Titre trop court' : null,
> }));
> </script>
> <template>
>   <form @submit.prevent="enregistrer">
>     <input v-model.trim="form.titre" aria-describedby="err-titre">
>     <p id="err-titre" v-if="erreurs.titre">{{ erreurs.titre }}</p>
>     <input v-model.number="form.annee" type="number">
>     <button :disabled="!!erreurs.titre">Enregistrer</button>
>   </form>
> </template>
> ```

> [!example]- Analogie
> `v-model` est un fil tendu entre la case du formulaire et ta variable ; la validation est le contrôleur qui relit la fiche avant de l'envoyer.

> [!question]- Pourquoi l'utiliser ?
> Contrairement à Angular (Reactive Forms intégrés), Vue ne fournit pas de système de validation : il faut choisir une approche d'équipe.

> [!question]- Comment ça marche ?
> Modificateurs : `v-model.trim`, `.number`, `.lazy` (à la sortie du champ). `@submit.prevent` évite le rechargement.
> Avec VeeValidate + Zod :
> ```typescript
> const { handleSubmit, errors, defineField } = useForm({
>   validationSchema: toTypedSchema(z.object({ titre: z.string().min(2), annee: z.number().min(1888) })),
> });
> const [titre, titreAttrs] = defineField('titre');
> const envoyer = handleSubmit(valeurs => api.creer(valeurs));
> ```

> [!question]- Quand l'utiliser ?
> Validation manuelle : 2-3 champs. Librairie : formulaires métier, champs dynamiques, messages d'erreur cohérents.

> [!danger]- Quand NE PAS l'utiliser / Limites
> La validation client est une aide UX : le serveur doit revalider.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| `v-model` | Liaison bidirectionnelle champ ↔ donnée |
| Modificateur | Suffixe qui ajuste le comportement (`.trim`) |
| Touched / dirty | Champ visité / modifié |
| Schéma | Règles de validation déclaratives |

---

## Points clés

- `@submit.prevent` sur le formulaire
- `.number` pour les champs numériques
- Afficher les erreurs après interaction (touched) ou à la soumission
- Partager le schéma Zod avec le back si possible

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Oublier `.number` → la valeur est une chaîne
> - Valider uniquement au clic du bouton sans gérer la touche Entrée (utiliser submit)

---

## Exemple minimal

```vue
<input v-model="titre" v-bind="titreAttrs">
<span v-if="errors.titre">{{ errors.titre }}</span>
<button @click="envoyer">Créer</button>
```

> [!note] Ce que j'en retiens
> VeeValidate gère l'état (erreurs, touched, soumission) et Zod les règles.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Composants de champ réutilisables (`BaseInput`) avec `defineModel` et accessibilité des erreurs

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Vue]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → [[ANG-07-Formulaires|Formulaires Angular]]

**Pratique :**
- Extrait de code → [[04_Snippets/vue-14-formulaires-validation]]
- Projet → [[02_Projects/CinéTrack]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi `v-model.number` est-il nécessaire sur un input numérique ?

---

## Tâches

- [ ] #task Créer le formulaire « ajouter un film » en Vue avec VeeValidate + Zod
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
