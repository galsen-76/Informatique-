---
type: course
order: 4
module: "[[Module 02 - Terminal et environnement]]"
concepts:
  - "[[Permissions Linux]]"
  - "[[Gestionnaire de paquets]]"
  - "[[Fichiers entre Windows et Linux]]"
tags:
  - cours
---
# Cours - Linux, utilisateurs, permissions et paquets

> [!abstract] Objectifs
> - Lire une ligne `ls -l` et ses droits
> - Rendre un script exécutable
> - Savoir quand utiliser `sudo`, et quand ne pas l'utiliser
> - Installer des outils avec apt

**Prérequis :** [[Cours - Bash, les commandes essentielles]]

## 1. Qui suis-je
Sous Linux, tout se fait **en tant qu'un utilisateur**. Toi (`oumar`) dans ton dossier `~`, et **root**, l'administrateur. `whoami` répond.

## 2. Schéma
```mermaid
flowchart TD
  U[Utilisateur] --> D{Droit ?}
  D -- oui --> OK[Action]
  D -- non --> S[sudo]
```

## 3. Lire les droits
`ls -l` affiche `-rwxr-xr--` : type, puis droits du propriétaire, du groupe, des autres. Voir [[Permissions Linux]].

## 4. Changer les droits
```bash
chmod +x deploy.sh      # exécutable
chmod 644 config.yml    # rw-r--r--
```
Dans un dépôt Git cloné depuis Windows, le droit d'exécution doit être enregistré **dans Git** : voir [[Fichiers entre Windows et Linux]]. Voir [[chmod]].

## 5. sudo
`sudo` donne les droits root **pour une commande** : installer un paquet, modifier `/etc`. Ne l'utilise **pas** pour tes propres fichiers dans `~` : s'il faut `sudo` là, c'est qu'un fichier appartient à root par erreur (`sudo chown -R oumar:oumar dossier` pour réparer). Voir [[sudo]].

## 6. Installer des logiciels
```bash
sudo apt update
sudo apt install zip unzip tree jq
```
Voir [[Gestionnaire de paquets]] et [[apt]]. Ce sont les mêmes commandes que dans les `RUN apt-get` des Dockerfile.

## 7. Les fichiers de configuration
- `~/.bashrc` : lu à chaque nouveau terminal Bash. On y met ses alias, son `PATH`, son proxy. Après modification : `source ~/.bashrc`.
- Les fichiers qui commencent par `.` sont cachés : `ls -a` pour les voir.

## Mise en pratique
- Ajoute à ton `~/.bashrc` un alias `ll='ls -la'`, recharge-le et teste.
- Crée un script, rends-le exécutable, lance-le avec `./`.
- Installe `tree` et `zip` avec apt, puis zippe un dossier de test en ligne de commande.

> [!warning] Erreurs fréquentes
> - Tout lancer avec `sudo` « pour que ça passe »
> - `chmod 777` pour régler un problème de droits
> - Modifier `~/.bashrc` sans le recharger, et croire que ça n'a pas marché

## Résumé
En 3 phrases, avec mes mots.

## Concepts du cours
[[Permissions Linux]] · [[Gestionnaire de paquets]] · [[Fichiers entre Windows et Linux]]
