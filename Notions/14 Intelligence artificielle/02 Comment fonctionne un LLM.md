---
type: notion
statut: a apprendre
resume: "Un LLM (Large Language Model : Claude, GPT, Gemini, Mistral) a lu une quantité gigantesque de texte et a appris à prédire la suite la plus probable."
revu:
sources:
  - "https://docs.anthropic.com/fr/docs/intro-to-claude"
---
# Comment fonctionne un LLM

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Un **LLM** (*Large Language Model* : Claude, GPT, Gemini, Mistral) a lu une quantité gigantesque de texte et a appris à **prédire la suite la plus probable**.

## Le problème

**Pourquoi c'est utile ?**
Pour savoir ce que fait vraiment un LLM, et donc ce qu'il sait faire ou non.

**Qu'est-ce qui se passait sans ça ?**
On le prenait pour un moteur de recherche fiable, et on croyait ses réponses inventées.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

C'est ce qui lui permet de répondre, résumer, traduire ou coder. Mais il **ne vérifie rien** : il peut inventer avec assurance. La règle d'or : **tout ce qu'il doit savoir doit être dans ce que tu lui envoies**.

### Comment il écrit

Il génère sa réponse **morceau par morceau** (*token* par token), chaque morceau choisi selon tout ce qui précède. C'est pour ça que les réponses s'affichent au fil de l'eau (*streaming*).

```text
« Le film Inception est réalisé par » → « Christopher » → « Nolan » → « . »
```

### Les 5 notions à connaître

| Notion | En clair | Pourquoi ça compte pour toi |
|---|---|---|
| **Token** | un morceau de mot (environ 3 à 4 caractères) | tu **paies** au token, et les limites sont en tokens |
| **Fenêtre de contexte** | tout ce que le modèle « voit » en un appel : consignes + historique + documents + réponse | ce qui n'y est pas **n'existe pas** pour lui |
| **Prompt système** | les consignes générales (« tu es l'assistant de CinéTrack… ») | fixe le rôle et les règles |
| **Sans mémoire** | chaque appel est indépendant | pour une conversation, **ton application** renvoie tout l'historique à chaque fois |
| **Hallucination** | une réponse plausible mais fausse | il faut **vérifier** et lui fournir les bonnes sources |

### Comment il a été fabriqué

1. **Pré-entraînement** : prédire le mot suivant sur des milliards de textes → il apprend la langue, les faits, le code.
2. **Affinage** : on lui apprend à suivre des instructions et à être utile, avec des retours humains → il devient un « assistant ».

Conséquence : ses connaissances s'arrêtent à une **date**. Il ne connaît pas les films sortis après, ni ta base de données.

### Ce qu'il fait bien, ce qu'il fait mal

| ✅ Bien | ⚠️ Attention |
|---|---|
| résumer, reformuler, traduire | les faits précis (dates, chiffres, références) |
| extraire des infos d'un texte | les calculs exacts |
| classer (ton d'une critique, catégorie) | l'actualité après sa date de connaissances |
| écrire et expliquer du code | les API récentes (il peut proposer une ancienne syntaxe) |
| répondre à partir de documents fournis | répondre de mémoire sur **tes** données |

## 🧪 Exemple

### Exemple

```text
Consigne : « Résume cette critique en une phrase et donne une note de 1 à 5, en JSON. »
Réponse  : {"resume": "Une fresque visuelle impressionnante au rythme lent.", "note": 4}
```

Une consigne précise + un format de sortie défini = une réponse **exploitable par ton code**.

## ⚠️ Limites et pièges

- **Lui faire confiance sans vérifier** : relis, teste, valide.
- **Lui envoyer des données confidentielles** (code client, données personnelles) sans l'accord de l'entreprise.
- **Croire qu'il se souvient** de la conversation d'hier : c'est l'application qui garde l'historique.

La suite : bien lui parler avec [[03 Prompt engineering|le prompt engineering]].

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux IA et machine learning|Fondamentaux IA et machine learning]]
- **Voir aussi :** 
- **Utilisé dans :** 

## 📚 Notes

- Source : https://docs.anthropic.com/fr/docs/intro-to-claude
