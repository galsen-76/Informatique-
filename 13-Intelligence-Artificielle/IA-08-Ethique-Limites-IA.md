---
created: 2026-09-24
modified: 2026-09-24
type: knowledge
status: "🔴 Not Started"
level: Fondamental
month: M12
tags:
  - ia/ethique
aliases:
  - "Éthique et Limites de l'IA"
parent: "[[Intelligence Artificielle]]"
children: []
related_theory:
  - "[[IA-02-LLM-Fondamentaux|Fondamentaux des LLM]]"
  - "[[SEC-10-Gestion-des-Secrets|Gestion des Secrets]]"
related_snippets:
  - "[[04_Snippets/ia-08-ethique-limites-ia]]"
related_projects: []
source: "https://artificialintelligenceact.eu/fr/"
---

# Éthique et Limites de l'IA

> [!abstract] Introduction
> Utiliser l'IA de façon responsable : biais, hallucinations, confidentialité (RGPD), propriété intellectuelle, sécurité (injection de prompt), impact environnemental et cadre légal européen (AI Act).

---

## Théorie

> [!question]- C'est quoi ?
> Enjeux :
> - **Biais** : discrimination reproduite depuis les données
> - **Fiabilité** : hallucinations, sur-confiance des utilisateurs
> - **Confidentialité** : données personnelles ou confidentielles envoyées à un tiers
> - **Propriété intellectuelle** : licences du code généré, contenus protégés
> - **Sécurité** : injection de prompt, fuite de données via les outils d'un agent
> - **Transparence** : informer l'utilisateur qu'il interagit avec une IA
> - **Cadre légal** : AI Act européen (approche par niveaux de risque), RGPD

> [!example]- Analogie
> Comme un médicament puissant : très utile, mais avec une notice, des contre-indications et une prescription encadrée.

> [!question]- Pourquoi l'utiliser ?
> Un développeur est responsable de ce qu'il met en production, y compris des fonctionnalités d'IA ; les entreprises (et leurs clients) encadrent strictement ces usages.

> [!question]- Comment ça marche ?
> Checklist pour une fonctionnalité IA :
> - Données envoyées : minimales, anonymisées si possible, base légale RGPD
> - Sorties : validées, affichées comme générées par IA, possibilité de signaler
> - Humain dans la boucle pour les décisions importantes
> - Journalisation et évaluation continue (biais, qualité)
> - Protection contre l'injection de prompt

> [!question]- Quand l'utiliser ?
> À la conception de toute fonctionnalité utilisant l'IA.

> [!danger]- Quand NE PAS l'utiliser / Limites
> Les règles évoluent vite : suivre la politique de l'entreprise et le juridique.

---

## Vocabulaire

| Terme | Définition en une ligne |
|-------|--------------------------|
| Biais | Distorsion systématique des résultats |
| AI Act | Règlement européen sur l'IA |
| RGPD | Règlement européen sur les données personnelles |
| Transparence | Informer de l'usage de l'IA |

---

## Points clés

- Minimiser les données envoyées
- Informer l'utilisateur
- Valider et surveiller les sorties
- Respecter la politique interne

---

## Pièges courants

> [!bug]- Erreurs fréquentes
> - Décision automatisée importante sans recours humain

---

## Exemple minimal

```text
CinéTrack : « Résumé généré par IA — peut contenir des erreurs. [Signaler] »
```

> [!note] Ce que j'en retiens
> Transparence et possibilité de correction : deux lignes qui changent la confiance.

---

## Pour aller plus loin (niveau senior)

> [!tip]- Ce qui distingue un dev expérimenté
> - Participer à l'évaluation des risques (DPO, sécurité) des projets IA

---

## Connexions

**Arbre théorique :**
- Sujet parent → [[Intelligence Artificielle]]
- Sous-sujets → (aucun pour l'instant)
- À comparer avec → (—)

**Pratique :**
- Extrait de code → [[04_Snippets/ia-08-ethique-limites-ia]]

---

## Auto-vérification

> [!check]- Est-ce que je maîtrise vraiment ?
> - Cite 3 risques d'une fonctionnalité de chatbot sur des données clients.

---

## Tâches

- [ ] #task Lire la charte IA de l'entreprise
- [ ] #task Mettre à jour `status` une fois maîtrisé

---

## Notes brutes

- ?
