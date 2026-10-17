---
type: notion
statut: a apprendre
resume: "v-model relie un champ de formulaire à une donnée : ce que tape l'utilisateur arrive directement dans ta ref."
revu:
sources:
  - "https://vee-validate.logaretm.com/v4/"
---
# Formulaires et validation Vue

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : `v-model` relie un champ de formulaire à une donnée : ce que tape l'utilisateur arrive directement dans ta `ref`.

## Le problème

**Pourquoi c'est utile ?**
Pour relier les champs aux données et vérifier les saisies.

**Qu'est-ce qui se passait sans ça ?**
On lisait chaque champ à la main et on validait au moment de l'envoi seulement, avec des messages d'erreur incohérents.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Pour vérifier les saisies, un formulaire simple se valide à la main ; un vrai formulaire (le Contact du Portfolio) se valide avec **VeeValidate + Zod**.

### `v-model` : le lien dans les deux sens

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

### Valider avec VeeValidate + Zod (formulaire de contact)

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

**L'avantage :** une seule règle (le schéma Zod) sert à la validation **et** au type TypeScript. Voir [[18 Validation runtime avec Zod|Zod]].

### Les bons réflexes

- Afficher l'erreur **sous le champ**, après que l'utilisateur l'a quitté (pas à la première lettre).
- Désactiver le bouton pendant l'envoi (`isSubmitting`), pour éviter les doubles envois.
- Afficher un message de **succès** et un message si l'envoi **échoue**.
- Garder les bases HTML : `label`, bon `type`, `autocomplete` (voir [[05 Formulaires HTML|Formulaires HTML]]).

## 🧪 Exemple

### Valider à la main (petit formulaire)

```ts
const email = ref('');
const erreur = computed(() =>
  !email.value ? 'Obligatoire' :
  !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value) ? 'E-mail invalide' : null,
);
```

## ⚠️ Limites et pièges

- **Oublier `.prevent`** en écriture manuelle (`@submit.prevent`) : la page se recharge. (`handleSubmit` le gère.)
- **Faire confiance à la validation du front** : le serveur doit revalider.

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux Vue|Fondamentaux Vue]]
- **Voir aussi :** [[04 Directives et templates Vue|Directives et templates Vue]], [[18 Validation runtime avec Zod|Validation runtime avec Zod]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://vee-validate.logaretm.com/v4/
