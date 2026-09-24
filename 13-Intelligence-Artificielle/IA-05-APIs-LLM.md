---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Intermédiaire
month: M12
tags:
  - ia/api
aliases:
  - "APIs de LLM"
parent: "[[Intelligence Artificielle]]"
children: []
related_theory:
  - "[[IA-03-Prompt-Engineering|Prompt Engineering]]"
  - "[[NET-10-WebSockets-SSE|WebSockets et Server-Sent Events]]"
  - "[[SEC-10-Gestion-des-Secrets|Gestion des Secrets]]"
related_snippets:
  - "[[04_Snippets/ia-05-apis-llm]]"
related_projects:
  - "[[02_Projects/CinéTrack-API]]"
source: "https://docs.anthropic.com/fr/api/messages"
---

# APIs de LLM

> [!abstract] Introduction
> Intégrer un LLM dans une application se fait côté BACKEND via l'API du fournisseur (clé secrète), avec streaming vers le front, gestion des erreurs, des coûts et validation des sorties.

> [!warning]- Prérequis
> [[IA-02-LLM-Fondamentaux|Fondamentaux des LLM]], [[NEST-01-Fondamentaux|Fondamentaux NestJS]]

---

## Théorie

> [!question]- C'est quoi ?
> Exemple avec le SDK officiel d'Anthropic en TypeScript (NestJS). Le nom du modèle évolue : vérifier la documentation au moment de l'implémentation (`claude-opus-5` au moment de la rédaction).
> ```typescript
> import Anthropic from '@anthropic-ai/sdk';
>
> @Injectable()
> export class ResumeService {
>   private client = new Anthropic();          // lit ANTHROPIC_API_KEY depuis l'environnement
>
>   async resumerCritique(texte: string): Promise<string> {
>     const stream = this.client.messages.stream({
>       model: 'claude-opus-5',
>       max_tokens: 1024,
>       system: 'Tu résumes des critiques de films en une phrase neutre, en français.',
>       messages: [{ role: 'user', content: `<critique>${texte}</critique>` }],
>     });
>     const message = await stream.finalMessage();
>     if (message.stop_reason === 'refusal') throw new UnprocessableEntityException('Contenu refusé');
>     return message.content
>       .filter((b): b is Anthropic.TextBlock => b.type === 'text')
>       .map(b => b.text).join('');
>   }
> }
> ```

> [!example]- Analogie
> L'API LLM est un fournisseur externe très compétent mais facturé à la ligne : on passe par un seul guichet (le back), on contrôle ce qu'on lui envoie et on vérifie ce qu'il renvoie.

> [!question]- Pourquoi l'utiliser ?
> La clé d'API ne doit JAMAIS être dans le front ; le back contrôle coûts, droits, journalisation et données envoyées.

> [!question]- Comment ça marche ?
> - **Streaming** vers le front : l'API envoie des événements (SSE) ; le back peut les relayer via un endpoint `@Sse()` NestJS et le front les afficher au fil de l'eau
> - **Erreurs** : rate limit (429), surcharge, timeouts → les SDK officiels réessaient déjà certaines erreurs ; utiliser leurs classes d'erreur typées
> - **Sorties structurées** : demander un JSON conforme à un schéma plutôt que parser du texte libre
> - **Coûts** : compter les tokens, limiter `max_tokens`, mise en cache des prompts (prompt caching), rate limiting par utilisateur
> - Autres fournisseurs (OpenAI, Mistral, Gemini) : même principe, SDK différents

> [!question]- Quand l'utiliser ?
> Fonctionnalités de résumé, classification, assistant, recherche sémantique (avec RAG).

> [!danger]- Quand NE PAS l'utiliser / Limites
> Latence (secondes), coût variable, non-déterminisme, dépendance à un fournisseur, contraintes RGPD sur les données envoyées.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| SDK | Librairie officielle d'accès à l'API |
| `max_tokens` | Limite de longueur de la réponse |
| `stop_reason` | Raison de fin de génération |
| Rate limit | Limite de requêtes/tokens par minute |
| Prompt caching | Réutilisation d'un préfixe de prompt identique pour réduire coût et latence |

---

## Points clés

- Appels uniquement côté serveur
- Streaming pour l'UX
- Vérifier `stop_reason` et valider la sortie
- Surveiller coûts et quotas

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Clé API dans une variable `VITE_…` ou `environment.ts`
> - Envoyer des données personnelles sans analyse RGPD
> - Ne pas limiter l'usage par utilisateur (facture qui explose)

---

## Exemple minimal

```typescript
// NestJS : relayer le streaming au front en SSE
@Sse('critiques/:id/resume')
resume(@Param('id', ParseIntPipe) id: number): Observable<MessageEvent> {
  return new Observable((obs) => {
    const stream = this.client.messages.stream({ model: 'claude-opus-5', max_tokens: 1024, messages: [/* … */] });
    stream.on('text', (t) => obs.next({ data: t } as MessageEvent));
    stream.finalMessage().then(() => obs.complete(), (e) => obs.error(e));
  });
}
```

> [!note] Ce que j'en retiens
> Le front affiche la réponse mot à mot, sans jamais connaître la clé d'API.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Évaluations automatiques de la qualité, observabilité (tokens, coûts, latence), abstraction multi-fournisseurs

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Intelligence Artificielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ia-05-apis-llm]]
- Projet → [[02_Projects/CinéTrack-API]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Pourquoi l'appel au LLM doit-il passer par le backend ?

---

## Tâches

- [ ] #task Ajouter un résumé IA des critiques dans CinéTrack (derrière un feature flag)
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
