---
type: bonnes-pratiques
sujet: "Bash et terminal"
concepts:
  - "[[Bash]]"
  - "[[Script shell]]"
  - "[[Code de sortie]]"
  - "[[Permissions Linux]]"
  - "[[WSL]]"
  - "[[Redirection et pipe]]"
tags:
  - bonnes-pratiques
---
# Bonnes pratiques - Bash et terminal

> [!info] À quoi sert cette fiche
> Écrire des scripts shell fiables et utiliser le terminal sans se mettre en danger.
> Chaque règle dit **pourquoi** : c'est la raison qui compte, pour savoir l'adapter quand la situation change.

## À faire

### 1. Commencer chaque script par la bonne ligne et le mode strict
Le script s'arrête à la première erreur au lieu de continuer à moitié. Voir [[Script shell]].

```bash
#!/usr/bin/env bash
set -euo pipefail
```

### 2. Toujours mettre les variables entre guillemets
`"$fichier"` : un nom avec des espaces reste un seul argument.

```bash
cp "$source" "$destination/"
```

### 3. Vérifier ce qu'une commande va toucher avant de la lancer
Lancer d'abord `ls` ou `find` avec les mêmes critères, puis `rm` ou `-delete`.

```bash
find /tmp/exports -name "*.zip" -mtime +7          # d'abord voir
find /tmp/exports -name "*.zip" -mtime +7 -delete  # ensuite agir
```

### 4. Utiliser les codes de sortie
`exit 1` en cas d'erreur, et tester `$?` ou `if commande; then`. C'est ce que lit la CI. Voir [[Code de sortie]].

### 5. Travailler côté Linux dans WSL
Projets dans `~/projets`, pas dans `/mnt/c/...` : plus rapide, pas de problème de fins de ligne ni de droits. Voir [[Fichiers entre Windows et Linux]].

### 6. Lire l'aide avant de chercher ailleurs
`commande --help`, `man commande`, `tldr commande`.

### 7. Passer ses scripts à ShellCheck
Il trouve les guillemets oubliés et les pièges classiques.

```bash
shellcheck deployer.sh
```

## À éviter

### 1. `sudo` par réflexe
**Pourquoi c'est un problème :** une erreur de chemin peut casser le système, et les fichiers créés appartiennent à root.
**À la place :** `sudo` seulement pour l'administration (apt, systemctl), jamais dans ton dossier de projet.

### 2. `rm -rf $DOSSIER/` avec une variable possiblement vide
**Pourquoi c'est un problème :** devient `rm -rf /`.
**À la place :** `set -u`, guillemets, et `${DOSSIER:?}` qui arrête si la variable est vide.

### 3. `chmod 777`
**Pourquoi c'est un problème :** tout le monde peut tout faire, faille de sécurité.
**À la place :** les droits minimaux (`chmod 644` fichiers, `755` dossiers et scripts).

### 4. `curl … | bash` d'une source inconnue
**Pourquoi c'est un problème :** tu exécutes du code que tu n'as pas lu.
**À la place :** télécharger, lire, puis exécuter, et seulement depuis une source officielle.

### 5. Mélanger PowerShell et Bash
**Pourquoi c'est un problème :** syntaxes différentes, chemins différents : les commandes échouent de façon déroutante.
**À la place :** savoir dans quel shell on est (`echo $0`), un projet = un côté.

### 6. Mettre un mot de passe dans une commande
**Pourquoi c'est un problème :** il reste dans l'historique (`~/.bash_history`).
**À la place :** variables d'environnement, fichier `.env`, ou saisie demandée par l'outil.

## Avant de valider mon travail
- [ ] Le script commence par `set -euo pipefail`
- [ ] Toutes les variables sont entre guillemets
- [ ] ShellCheck ne signale rien
- [ ] Le script renvoie un code non nul en cas d'erreur
- [ ] Je l'ai testé sur un dossier de test, pas sur les vraies données

## Notions liées
[[Bash]] · [[Script shell]] · [[Code de sortie]] · [[Permissions Linux]] · [[WSL]] · [[Redirection et pipe]]
