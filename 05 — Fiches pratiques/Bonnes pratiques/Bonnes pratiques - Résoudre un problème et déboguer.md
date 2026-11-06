---
type: bonnes-pratiques
sujet: "Résoudre un problème et déboguer"
concepts:
  - "[[Algorithme]]"
  - "[[Décomposer un problème]]"
  - "[[Pseudo-code et trace d'exécution]]"
  - "[[Exception]]"
  - "[[Test automatisé]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - Résoudre un problème et déboguer

> [!info] À quoi sert cette fiche
> Comment raisonner face à un exercice, une fonctionnalité ou un bug, au lieu d'essayer des choses au hasard.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Comprendre avant de coder
Reformuler le problème avec ses mots : entrées, sortie attendue, contraintes. Si tu ne peux pas l'expliquer, tu ne peux pas le coder. Voir [[Décomposer un problème]].

### 2. Faire des exemples à la main, dont les cas limites
Liste vide, un seul élément, doublons, valeurs négatives, nom avec espaces, fichier absent. La moitié des bugs vient de ces cas.

### 3. Découper jusqu'à ce que chaque étape soit évidente
Chaque étape devient une petite fonction qu'on peut tester seule.

### 4. Lire le message d'erreur en entier
Le type d'erreur, le message, puis la **dernière** ligne de **ton** code dans la trace (*stack trace*) : c'est là que commencer.

```text
Traceback (most recent call last):
  File "zipper.py", line 12, in main          <- ton code
    total += f.stat().st_size
FileNotFoundError: [Errno 2] No such file or directory: 'a.png'
```

### 5. Reproduire, puis réduire
Trouver les étapes exactes qui provoquent le bug, puis retirer tout ce qui n'est pas nécessaire jusqu'au plus petit exemple qui échoue. Souvent, la cause apparaît pendant la réduction.

### 6. Formuler une hypothèse et la vérifier
« Je pense que la liste est vide à cette ligne » : vérifie-le (débogueur, `print`, log). Une hypothèse à la fois, sinon on ne sait pas ce qui a réglé le problème.

### 7. Utiliser le débogueur
Point d'arrêt, exécution pas à pas, valeurs des variables : VS Code, `breakpoint()` en Python, onglet *Sources* du navigateur. Voir [[Pseudo-code et trace d'exécution]].

### 8. Expliquer le problème à voix haute
Décrire le code ligne par ligne à quelqu'un (ou à un canard en plastique) fait souvent apparaître l'erreur.

### 9. Écrire le test qui reproduit le bug avant de le corriger
Le test échoue, tu corriges, il passe : le bug ne reviendra pas sans qu'on le voie.

## À éviter

### 1. Changer des choses au hasard jusqu'à ce que ça marche
**Pourquoi c'est un problème :** on ne sait pas pourquoi ça marche, ni ce qu'on a cassé ailleurs.
**À la place :** une hypothèse, une vérification, une modification à la fois.

### 2. Copier une solution trouvée en ligne sans la comprendre
**Pourquoi c'est un problème :** elle peut ne pas correspondre à ton cas, ou introduire une faille.
**À la place :** la lire ligne par ligne, et pouvoir l'expliquer avant de la garder.

### 3. Lire seulement la première ligne de l'erreur
**Pourquoi c'est un problème :** la cause est souvent en bas de la trace, ou dans une erreur précédente.
**À la place :** lire tout, de bas en haut, et chercher ton fichier.

### 4. Rester bloqué des heures sans rien changer
**Pourquoi c'est un problème :** la fatigue empêche de voir l'évidence.
**À la place :** faire une pause, réduire le problème, ou demander de l'aide avec un exemple minimal.

### 5. Corriger le symptôme
**Pourquoi c'est un problème :** ajouter un `if x is None: return` partout cache la vraie cause.
**À la place :** chercher pourquoi la valeur est `None` à l'origine.

## Avant de valider mon travail
- [ ] Je peux énoncer le problème en une phrase
- [ ] J'ai testé les cas limites
- [ ] Je sais pourquoi le bug arrivait, pas seulement qu'il a disparu
- [ ] Un test reproduit le bug et passe maintenant

## Notions liées
[[Algorithme]] · [[Décomposer un problème]] · [[Pseudo-code et trace d'exécution]] · [[Exception]] · [[Test automatisé]]
