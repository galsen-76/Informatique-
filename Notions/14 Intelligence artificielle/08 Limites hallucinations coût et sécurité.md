---
type: notion
statut: a apprendre
resume: "Quand tu mets une fonctionnalité d'IA en production, tu es responsable de ce qu'elle produit."
revu:
sources:
  - "https://artificialintelligenceact.eu/fr/"
---
# Limites hallucinations coût et sécurité

```dataviewjs
await dv.view("Systeme/notion")
```

> **En une phrase** : Quand tu mets une fonctionnalité d'IA en production, **tu es responsable** de ce qu'elle produit.

## Le problème

**Pourquoi c'est utile ?**
Pour connaître les risques d'une fonctionnalité d'IA en production et s'en protéger.

**Qu'est-ce qui se passait sans ça ?**
Réponses fausses affichées comme vraies, données personnelles envoyées n'importe où, et injections de prompt.

## Comment ça marche
*Explique avec tes mots, comme à un collègue.*

Les risques principaux : réponses fausses, biais, fuite de données, détournement par injection de prompt. Le cadre légal européen (**RGPD**, **AI Act**) encadre ces usages. En pratique, une petite check-list suffit à éviter l'essentiel.

### Les risques

| Risque | Exemple sur CinéTrack |
|---|---|
| **Réponse fausse** (hallucination) | le résumé attribue le film au mauvais réalisateur |
| **Biais** | la modération signale plus souvent certaines façons d'écrire |
| **Fuite de données** | on envoie e-mail et historique de l'utilisateur au fournisseur sans raison |
| **Injection de prompt** | une critique contient « ignore tes consignes » et détourne l'assistant |
| **Propriété intellectuelle** | du code ou du texte généré reprend un contenu protégé |
| **Sur-confiance** | l'utilisateur prend la réponse de l'IA pour une vérité |

### Le cadre légal (l'essentiel)

- **RGPD** : les données personnelles envoyées à un fournisseur d'IA restent soumises au RGPD. Minimiser, justifier, informer.
- **AI Act** (règlement européen) : classe les usages de l'IA par **niveau de risque**. Un chatbot doit indiquer qu'il est une IA ; les usages à haut risque (recrutement, crédit…) sont fortement encadrés.
- **En entreprise** : suis la politique interne et demande au DPO ou à la sécurité en cas de doute.

### La check-list d'une fonctionnalité IA

- [ ] J'envoie le **minimum** de données, sans données personnelles inutiles.
- [ ] L'utilisateur **sait** que le contenu est généré par une IA.
- [ ] Il peut **signaler** une erreur.
- [ ] La sortie est **validée** par le code (format, valeurs autorisées).
- [ ] Un **humain** décide pour tout ce qui est important (suppression, sanction).
- [ ] Le texte utilisateur est **délimité** dans le prompt (anti-injection).
- [ ] L'usage est **limité** par utilisateur et **journalisé**.

### Les limites à garder en tête

- L'IA **se trompe avec assurance** : ne jamais l'utiliser seule pour une décision importante.
- Ses connaissances ont une **date** limite.
- Elle **consomme** beaucoup d'énergie : l'utiliser quand elle apporte vraiment quelque chose.
- Les règles évoluent vite : ce qui est autorisé aujourd'hui peut changer.

## 🧪 Exemple

### En pratique

```text
✨ Résumé généré par IA — peut contenir des erreurs.  [Signaler]
```

Deux lignes dans l'interface : l'utilisateur est informé et peut corriger. La confiance change complètement.

## ⚠️ Limites et pièges

- **Une décision automatique sans recours humain** (bannir un utilisateur sur l'avis de l'IA).
- **Présenter du contenu généré comme écrit par un humain.**
- **Envoyer plus de données que nécessaire** « pour que ce soit plus précis ».

## 🔗 Liens

- **Prérequis :** [[01 Fondamentaux IA et machine learning|Fondamentaux IA et machine learning]]
- **Voir aussi :** [[02 Comment fonctionne un LLM|Comment fonctionne un LLM]], [[10 Gestion des secrets|Gestion des secrets]]
- **Utilisé dans :** 

## 📚 Notes

- Source : https://artificialintelligenceact.eu/fr/
