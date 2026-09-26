---
created: 2026-09-24
modified: 2026-09-26
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M03
tags:
  - frameworks/vue/formulaires
aliases:
  - "Formulaires et Validation Vue.js"
parent: "[[Vue]]"
related_theory:
  - "[[VUE-04-Directives-Templates|Directives & Templates Vue.js]]"
  - "[[TS-19-Validation-Runtime-Zod|Validation runtime avec Zod]]"
related_projects:
  - "[[02_Projects/CinéTrack]]"
source: "https://vee-validate.logaretm.com/v4/"
---

# Formulaires et Validation Vue.js

> [!abstract] En bref
> `v-model` relie un champ de formulaire à une donnée : ce que tape l'utilisateur arrive directement dans ta `ref`. Pour vérifier les saisies, un formulaire simple se valide à la main ; un vrai formulaire (le Contact du Portfolio) se valide avec **VeeValidate + Zod**.

## `v-model` : le lien dans les deux sens

```vue
<script setup lang="ts">
const email = ref('');
const sujet = ref('');
const accepte = ref(false);
</script>

<template>
  <input v-model.trim="email" type="email">
  <select v-model="sujet">
    <option value="">Choisir…</option>
    <option value="job">Opportunité</option>
  </select>
  <input v-model="accepte" type="checkbox">
  <p>Tu as tapé : {{ email }}</p>
</template>
```

Modificateurs : `.trim` (retire les espaces), `.number` (convertit en nombre), `.lazy` (met à jour quand on quitte le champ).

## Valider à la main (petit formulaire)

```ts
const email = ref('');
const erreur = computed(() =>
  !email.value ? 'Obligatoire' :
  !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value) ? 'E-mail invalide' : null,
);
```

## Valider avec VeeValidate + Zod (formulaire de contact)

```bash
npm i vee-validate zod @vee-validate/zod
```

```ts
// features/contact/data/contact.schema.ts
import { z } from 'zod';

export const ContactSchema = z.object({
  name: z.string().min(2, 'Au moins 2 caractères'),
  email: z.string().email('E-mail invalide'),
  subject: z.string().min(1, 'Choisis un sujet'),
  message: z.string().min(20, 'Au moins 20 caractères'),
});
export type ContactForm = z.infer<typeof ContactSchema>;
```

```vue
<!-- ContactForm.vue -->
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';

const { defineField, errors, handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: toTypedSchema(ContactSchema),
});

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [message, messageAttrs] = defineField('message');

const sent = ref(false);
const onSubmit = handleSubmit(async (values) => {   // values est typé ContactForm
  await contactApi.send(values);
  sent.value = true;
  resetForm();
});
</script>

<template>
  <form novalidate @submit="onSubmit">
    <label for="name">Nom</label>
    <input id="name" v-model="name" v-bind="nameAttrs">
    <p v-if="errors.name" class="error">{{ errors.name }}</p>

    <label for="email">E-mail</label>
    <input id="email" v-model="email" v-bind="emailAttrs" type="email">
    <p v-if="errors.email" class="error">{{ errors.email }}</p>

    <label for="message">Message</label>
    <textarea id="message" v-model="message" v-bind="messageAttrs" />
    <p v-if="errors.message" class="error">{{ errors.message }}</p>

    <button type="submit" :disabled="isSubmitting">Envoyer</button>
    <p v-if="sent" role="status">Message envoyé, merci !</p>
  </form>
</template>
```

**L'avantage :** une seule règle (le schéma Zod) sert à la validation **et** au type TypeScript. Voir [[TS-19-Validation-Runtime-Zod|Zod]].

## Les bons réflexes

- Afficher l'erreur **sous le champ**, après que l'utilisateur l'a quitté (pas à la première lettre).
- Désactiver le bouton pendant l'envoi (`isSubmitting`), pour éviter les doubles envois.
- Afficher un message de **succès** et un message si l'envoi **échoue**.
- Garder les bases HTML : `label`, bon `type`, `autocomplete` (voir [[HTML-02-Formulaires|Formulaires HTML]]).

## Pièges

- **Oublier `.prevent`** en écriture manuelle (`@submit.prevent`) : la page se recharge. (`handleSubmit` le gère.)
- **Faire confiance à la validation du front** : le serveur doit revalider.
