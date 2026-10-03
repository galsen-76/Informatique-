---
created: 2026-10-02
modified: 2026-10-02
type: guide
tags:
  - accueil/methode
aliases:
  - "Méthode du coach"
---

# 🧠 Méthode du coach

> [!abstract] L'objectif
> Pas « j'ai étudié ce sujet », mais : **« donne-moi un problème nouveau dans ce domaine et laisse-moi le résoudre »**.
>
> Le chemin : **Information → Compréhension → Rappel → Pratique → Résolution de problèmes → Autonomie → Maîtrise.**

Le piège à éviter, c'est l'**illusion de compétence** : regarder un cours, reconnaître une réponse ou suivre un tutoriel, sans être capable de refaire les choses seul.

Cette méthode complète la [[Methode-d-apprentissage|méthode d'apprentissage par projet]] : le projet donne les problèmes à résoudre, cette méthode t'apprend à les résoudre seul.

## Les 7 questions

Pour chaque notion, reviens toujours à ces questions :

1. **À quoi ça sert ?**
2. **Quel problème cela résout-il ?**
3. **Quelles sont les idées fondamentales ?**
4. **Comment cela fonctionne-t-il ?**
5. **Comment puis-je le reproduire sans aide ?**
6. **Comment puis-je vérifier que j'ai compris ?**
7. **Dans quelles situations cela ne fonctionne-t-il pas ?**

## Comment une note est organisée

| Ce que demande la méthode | Où le trouver dans une note |
|---|---|
| À quoi ça sert, l'idée fondamentale | l'encadré **En bref** |
| Comment ça fonctionne, les exemples | les sections du corps de la note |
| Pourquoi ça fonctionne | **Pourquoi ça marche** |
| Un cas où l'intuition est fausse | **Contre-exemple** |
| Les erreurs de débutant | **Pièges** |
| Test de compréhension | **Vérifie sans tes notes** |
| Application | **Exercices**, avec 2 indices avant chaque solution |
| Transfert | **Transfert** : un problème différent |
| Mesurer la maîtrise | **Je maîtrise quand…** |

Chaque dossier a aussi une **carte du domaine** dans sa note principale : fondamentaux, indispensables, intermédiaire, avancé, compétences pratiques, confusions fréquentes, prérequis, ce qu'on peut ignorer au début, et les dépendances.

> [!info] Dossiers déjà au format coach
> [[JavaScript]], [[Docker]], [[Réseaux]], CI/CD (dans [[Infrastructure]]), [[NODE-01-Node-npm|Node.js et npm]] et la note [[TEST-09-Playwright|Playwright de A à Z]]. Les autres suivront.

## Les exercices : ne pas regarder la solution tout de suite

1. **Réfléchis seul.**
2. Bloqué : ouvre l'**indice 1**.
3. Toujours bloqué : ouvre l'**indice 2**, plus précis.
4. Seulement ensuite : la **solution**.
5. Referme tout et **refais l'exercice sans regarder**.

Le but est de développer ta capacité à résoudre, pas d'obtenir la réponse.

## La progression

```
Comprendre -> Reproduire -> Appliquer -> Modifier -> Résoudre -> Créer
```

- Les **exercices** font reproduire et appliquer.
- Le **transfert** fait résoudre un problème différent.
- Le **projet** ([[02_Projects/CinéTrack|CinéTrack]]) fait créer, en combinant plusieurs notions.

Quand une notion est acquise, arrête les exercices faciles : cherche des problèmes qui mélangent plusieurs notions.

## Le rappel actif

Relire ses notes donne l'impression de savoir. **Récupérer l'information de mémoire**, c'est ce qui la fixe.

Les questions à te poser (ou à te faire poser) :
- « Explique-moi ce concept sans regarder tes notes. »
- « Pourquoi cela fonctionne-t-il ? »
- « Quelle est la différence entre X et Y ? »
- « Que se passerait-il si on supprimait X ? »
- « Donne-moi un exemple, puis un contre-exemple. »
- « Résous ce problème sans aide. »

Une mauvaise réponse n'est pas un échec : c'est une **information** qui montre exactement ce qu'il faut retravailler.

## La technique de Feynman

1. Explique la notion **comme à quelqu'un qui n'y connaît rien**, à voix haute ou par écrit.
2. Repère :
   - les **approximations** (« en gros, ça fait un truc… ») ;
   - les **trous** dans ton raisonnement ;
   - les **confusions** entre deux notions ;
   - les **mots** que tu utilises sans vraiment les comprendre.
3. Retourne à la note **seulement pour ces points**.
4. **Reformule**, plus simplement.

## Faire des connexions

Pour construire un modèle mental cohérent, et pas une collection de faits :
- relie chaque notion à celles qu'elle utilise (voir les dépendances de chaque carte du domaine) ;
- cherche une **analogie** ;
- note les notions qui **se ressemblent mais ne sont pas pareilles** (`find` et `filter`, `||` et `??`…).

## La répétition espacée

Après une notion importante, reviens-y **de mémoire**, de plus en plus tard :

```
J+1 -> J+3 -> J+7 -> J+21
```

À chaque retour : refais « Vérifie sans tes notes » et le transfert, **sans relire la note d'abord**. Réutilise aussi les anciennes notions dans tes nouveaux exercices et dans le projet.

## Quand une notion est-elle maîtrisée ?

Pas quand tu as fini de la lire, mais quand tu sais :

1. **l'expliquer** ;
2. **la rappeler** sans aide ;
3. **l'utiliser** ;
4. **résoudre un problème nouveau** avec elle ;
5. **repérer tes propres erreurs** ;
6. **dire quand elle ne doit pas être utilisée**.

C'est la grille « Je maîtrise quand… » en bas de chaque note. Le statut passe à 🟢 seulement quand les 6 cases sont cochées **et** que la notion a servi dans un projet.

## À la fin de chaque session

Utilise le modèle `TPL_Fin-de-session`. Sans regarder tes notes :

1. **Les 3 idées essentielles** de la session.
2. **Une explication personnelle**, avec tes mots.
3. **Un exercice de rappel** : une question qui oblige à récupérer l'information de mémoire.
4. **Un exercice de transfert** : un problème différent de ceux étudiés.
5. **La prochaine étape** : exactement ce que tu apprends ou pratiques ensuite.

## Apprendre par projet

- Le projet t'oblige à utiliser **plusieurs** notions à la fois.
- N'attends pas toutes les étapes : décide par toi-même, avec le contexte.
- Si un choix s'avère mauvais, demande-toi d'abord **pourquoi tu l'as fait** avant de le corriger.

## Utiliser une IA comme coach

Colle ce texte au début d'une conversation avec une IA pour qu'elle t'entraîne au lieu de te donner les réponses.

> [!quote]- Le prompt du coach
> Tu es mon coach d'apprentissage expert en sciences cognitives, pédagogie, résolution de problèmes et acquisition de compétences. Ta mission est de m'aider à apprendre profondément n'importe quel sujet, jusqu'à être capable de l'utiliser de manière autonome dans des situations nouvelles.
>
> 1. **Principe** : transforme progressivement Information → Compréhension → Rappel → Pratique → Résolution de problèmes → Autonomie → Maîtrise. Évite l'illusion de compétence.
> 2. **Commence** par me demander : quel sujet je veux apprendre, mon niveau actuel (aide-moi à l'évaluer si je ne le connais pas), pourquoi je veux l'apprendre, ce que je veux être capable de faire à la fin, le temps dont je dispose, et mon éventuelle échéance.
> 3. **Décompose le sujet** en une carte : connaissances fondamentales, concepts indispensables, intermédiaires, avancés, compétences pratiques, erreurs et confusions fréquentes, prérequis, ce qui peut être ignoré au début. Explique les dépendances entre les concepts.
> 4. **Pour chaque concept** : A. à quoi ça sert ; B. l'idée fondamentale ; C. comment ça fonctionne ; D. pourquoi ça fonctionne ; E. un exemple simple puis réaliste ; F. un contre-exemple ; G. les erreurs fréquentes ; H. un test de compréhension sans notes ; I. un exercice d'application ; J. un exercice de transfert.
> 5. **Ne me donne pas les réponses tout de suite** : laisse-moi réfléchir, puis un indice, puis un indice plus précis, puis la solution, puis demande-moi de refaire le problème sans regarder.
> 6. **Rappel actif** : demande-moi régulièrement d'expliquer sans mes notes, pourquoi ça fonctionne, la différence entre X et Y, ce qui se passerait sans X, un exemple et un contre-exemple, de résoudre un problème sans aide. Augmente la difficulté si je réussis ; si je me trompe, identifie précisément ce que je n'ai pas compris avant de réexpliquer.
> 7. **Difficulté progressive** : comprendre → reproduire → appliquer → modifier → résoudre → créer. Quand je maîtrise, passe à des problèmes qui combinent plusieurs concepts.
> 8. **Technique de Feynman** : fais-moi expliquer comme à quelqu'un qui ne connaît rien, analyse les approximations, les trous, les confusions et les termes mal compris, puis fais-moi reformuler.
> 9. **Connexions** : montre-moi les liens entre concepts, les analogies, les différences importantes, les concepts qui se ressemblent sans être pareils, et ce qui vient d'autres domaines.
> 10. **Répétition espacée** : reviens plus tard sur les notions importantes, de mémoire, et réactive les anciennes notions dans les nouveaux exercices.
> 11. **Maîtrise** : une notion est maîtrisée quand je peux l'expliquer, la rappeler sans aide, l'utiliser, résoudre un problème nouveau, identifier mes erreurs et dire quand elle ne doit pas être utilisée.
> 12. **Projets** : fais-moi construire des projets qui utilisent progressivement les concepts. Ne donne pas toutes les étapes. Si je fais un mauvais choix, demande-moi d'abord pourquoi.
> 13. **Explications** : commence par l'idée essentielle, puis approfondis : intuition → exemple → mécanisme → détails → exceptions → application. Définis chaque terme technique important.
> 14. **Si je ne comprends pas** : change de représentation (analogie, exemple, schéma, problème, contre-exemple, explication intuitive ou technique) et cherche où est mon blocage.
> 15. **Fin de session** : fais-moi produire les 3 idées essentielles, une explication personnelle, un exercice de rappel, un exercice de transfert et la prochaine étape.
> 16. **Ton rôle** : un coach, pas un distributeur de réponses. Pose des questions, fais-moi formuler des hypothèses et justifier, fais-moi chercher mes erreurs.
> 17. **Ramène-moi aux 7 questions** : à quoi ça sert, quel problème ça résout, les idées fondamentales, comment ça fonctionne, comment le reproduire sans aide, comment vérifier que j'ai compris, quand ça ne fonctionne pas.
>
> Commence maintenant en me demandant quel sujet je souhaite apprendre.
